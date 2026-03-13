import type { Handler } from "@netlify/functions";
import Stripe from "stripe";
import { stripe } from "./_lib/stripe";
import { supabase } from "./_lib/supabase";

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const signature =
      event.headers["stripe-signature"] || event.headers["Stripe-Signature"];

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!signature) {
      console.error("Missing Stripe signature header");
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing Stripe signature header" }),
      };
    }

    if (!webhookSecret) {
      console.error("Missing STRIPE_WEBHOOK_SECRET");
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing STRIPE_WEBHOOK_SECRET" }),
      };
    }

    if (!event.body) {
      console.error("Missing webhook body");
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing webhook body" }),
      };
    }

    // IMPORTANT: Stripe needs the raw body string exactly as sent
    const stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      signature,
      webhookSecret,
    );

    console.log("Received Stripe event:", stripeEvent.type);

    switch (stripeEvent.type) {
      case "checkout.session.completed": {
        const session = stripeEvent.data.object as Stripe.Checkout.Session;

        const customerEmail =
          session.customer_details?.email || session.customer_email || null;

        const paintingIds = session.metadata?.paintingIds
          ? JSON.parse(session.metadata.paintingIds)
          : [];

        console.log("checkout.session.completed", {
          sessionId: session.id,
          customerEmail,
          paintingIds,
          amountTotal: session.amount_total,
        });

        const { data: order, error: orderError } = await supabase
          .from("orders")
          .insert({
            stripe_session_id: session.id,
            customer_email: customerEmail,
            total: session.amount_total,
          })
          .select()
          .single();

        if (orderError) {
          console.error("Order insert failed:", orderError);
          throw new Error(orderError.message);
        }

        for (const paintingId of paintingIds) {
          const { error: orderItemError } = await supabase
            .from("order_items")
            .insert({
              order_id: order.id,
              painting_id: paintingId,
            });

          if (orderItemError) {
            console.error("Order item insert failed:", orderItemError);
            throw new Error(orderItemError.message);
          }

          const { error: updatePaintingError } = await supabase
            .from("paintings")
            .update({
              sold: true,
              sold_to_email: customerEmail,
              sold_at: new Date().toISOString(),
              reserved_until: null,
              reserved_session_id: null,
            })
            .eq("id", paintingId);

          if (updatePaintingError) {
            console.error("Painting update failed:", updatePaintingError);
            throw new Error(updatePaintingError.message);
          }
        }

        break;
      }

      case "checkout.session.expired": {
        const session = stripeEvent.data.object as Stripe.Checkout.Session;

        const paintingIds = session.metadata?.paintingIds
          ? JSON.parse(session.metadata.paintingIds)
          : [];

        console.log("checkout.session.expired", {
          sessionId: session.id,
          paintingIds,
        });

        if (paintingIds.length > 0) {
          const { data: releasedRows, error: releaseError } = await supabase
            .from("paintings")
            .update({
              reserved_until: null,
              reserved_session_id: null,
            })
            .in("id", paintingIds)
            .eq("reserved_session_id", session.id)
            .select("id, reserved_session_id, reserved_until");

          console.log("Expired checkout release result", {
            sessionId: session.id,
            paintingIds,
            releasedRows,
            releaseError,
          });

          if (releaseError) {
            console.error("Reservation release failed:", releaseError);
            throw new Error(releaseError.message);
          }

          if (!releasedRows || releasedRows.length === 0) {
            console.warn("No paintings were released for expired session", {
              sessionId: session.id,
              paintingIds,
            });
          }
        }

        break;
      }

      default:
        console.log(`Unhandled event type: ${stripeEvent.type}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    };
  } catch (error) {
    console.error("Stripe webhook error:", error);

    return {
      statusCode: 400,
      body: JSON.stringify({
        error: error instanceof Error ? error.message : "Webhook failed",
      }),
    };
  }
};
