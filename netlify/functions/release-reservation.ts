import type { Handler } from "@netlify/functions";
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

    const { error } = await supabase
      .from("paintings")
      .update({
        reserved_until: null,
        reserved_session_id: null,
      })
      .eq("reserved_session_id", body.sessionId)
      .eq("sold", false);

    if (error) {
      throw new Error(error.message);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ released: true }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
    };
  }
};
