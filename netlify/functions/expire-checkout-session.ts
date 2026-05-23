import type { Handler } from "@netlify/functions";
import { stripe } from "./_lib/stripe";
import { supabase } from "./_lib/supabase";
import { noContent } from "./_lib/cors";

type RequestBody = {
  sessionId: string;
};

export const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return noContent();
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const body = JSON.parse(event.body || "{}") as RequestBody;

    if (!body.sessionId || !body.sessionId.startsWith("cs_")) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing or invalid sessionId" }),
      };
    }

    try {
      await stripe.checkout.sessions.expire(body.sessionId);
    } catch (error) {
      console.warn("Stripe session could not be expired", {
        sessionId: body.sessionId,
        error,
      });
    }

    const { data, error } = await supabase
      .from("paintings")
      .update({
        reserved_until: null,
        reserved_session_id: null,
      })
      .eq("reserved_session_id", body.sessionId)
      .eq("sold", false)
      .select("id,title");

    if (error) {
      throw new Error(error.message);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        expired: true,
        released: data ?? [],
      }),
    };
  } catch (error) {
    console.error("Failed to expire checkout session", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
    };
  }
};
