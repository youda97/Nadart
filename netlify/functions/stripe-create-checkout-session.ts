import crypto from "node:crypto";
import type { Handler } from "@netlify/functions";
import { stripe } from "./_lib/stripe";
import { noContent } from "./_lib/cors";
import { supabase } from "./_lib/supabase";
import { getShippingOptions } from "./_lib/shipping";

type CartItem = {
  productId: string;
  quantity: number;
};

type RequestBody = {
  items: CartItem[];
  shippingCountry: "CA" | "US";
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
    const siteUrl = process.env.SITE_URL;

    if (!siteUrl) {
      throw new Error("Missing SITE_URL");
    }

    const body = JSON.parse(event.body || "{}") as RequestBody;

    if (!Array.isArray(body.items) || body.items.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Cart is empty" }),
      };
    }

    const ids = body.items.map((item) => item.productId);

    const now = new Date();
    const nowIso = now.toISOString();

    const reserveUntil = new Date(now.getTime() + 30 * 60 * 1000).toISOString();

    const reservationToken = crypto.randomUUID();

    const { data: paintings, error: paintingsError } = await supabase
      .from("paintings")
      .select("*")
      .in("id", ids);

    if (paintingsError || !paintings) {
      throw new Error(paintingsError?.message || "Failed to fetch paintings");
    }

    if (paintings.length !== ids.length) {
      throw new Error("One or more paintings could not be found.");
    }

    const unavailable = paintings.find(
      (p) =>
        p.sold ||
        (p.reserved_until &&
          new Date(p.reserved_until).getTime() > now.getTime()),
    );

    if (unavailable) {
      throw new Error(`${unavailable.title} is no longer available.`);
    }

    console.log("Attempting reservation lock", {
      ids,
      reservationToken,
      reserveUntil,
    });

    /**
     * Atomic reservation lock
     * Only reserve paintings that are:
     * - not sold
     * - not actively reserved
     */
    const { data: reservedRows, error: reserveError } = await supabase
      .from("paintings")
      .update({
        reserved_until: reserveUntil,
        reserved_session_id: reservationToken,
      })
      .in("id", ids)
      .eq("sold", false)
      .or(`reserved_until.is.null,reserved_until.lte.${nowIso}`)
      .select("id,title,reserved_session_id,reserved_until");

    if (reserveError) {
      console.error("Reservation lock failed", reserveError);
      throw new Error(reserveError.message);
    }

    console.log("Reservation lock result", {
      reservedRows,
      reservedCount: reservedRows?.length ?? 0,
      expectedCount: ids.length,
    });

    if (!reservedRows || reservedRows.length !== ids.length) {
      throw new Error("One or more paintings are no longer available.");
    }

    const line_items = body.items.map((item) => {
      const painting = paintings.find((p) => p.id === item.productId);

      if (!painting) {
        throw new Error(`Painting not found: ${item.productId}`);
      }

      return {
        quantity: item.quantity,
        price_data: {
          currency: "cad",
          unit_amount: Math.round(Number(painting.price) * 100),
          product_data: {
            name: painting.title,
            images: [`${siteUrl}${painting.image}`],
            metadata: {
              productId: painting.id,
              size: `${painting.size_width}" x ${painting.size_height}"`,
              category: painting.category ?? "",
            },
          },
        },
      };
    });

    const shipping_options = getShippingOptions(
      body.shippingCountry,
      paintings.map((p) => ({
        size_width: Number(p.size_width),
        size_height: Number(p.size_height),
      })),
    );

    let session;

    try {
      session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items,

        success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${siteUrl}/cart?cancelled=true`,

        customer_creation: "always",
        billing_address_collection: "required",

        shipping_address_collection: {
          allowed_countries: ["CA", "US"],
        },

        shipping_options,

        automatic_tax: {
          enabled: true,
        },

        invoice_creation: {
          enabled: true,
        },

        expires_at: Math.floor(new Date(reserveUntil).getTime() / 1000),

        metadata: {
          source: "nadart-site",
          paintingIds: JSON.stringify(ids),
          shippingCountry: body.shippingCountry,
        },
      });
    } catch (stripeError) {
      console.error("Stripe checkout session creation failed", stripeError);

      /**
       * Release reservation if Stripe fails
       */
      const { data: releasedRows, error: releaseError } = await supabase
        .from("paintings")
        .update({
          reserved_until: null,
          reserved_session_id: null,
        })
        .in("id", ids)
        .eq("reserved_session_id", reservationToken)
        .select("id");

      console.log("Released reservation after Stripe failure", {
        reservationToken,
        releasedRows,
        releaseError,
      });

      throw stripeError;
    }

    /**
     * Replace reservation token with actual Stripe session id
     */
    const { data: swappedRows, error: swapError } = await supabase
      .from("paintings")
      .update({
        reserved_session_id: session.id,
      })
      .in("id", ids)
      .eq("reserved_session_id", reservationToken)
      .select("id,reserved_session_id");

    console.log("Reservation token swap result", {
      reservationToken,
      stripeSessionId: session.id,
      swappedRows,
      swapError,
    });

    if (swapError) {
      throw new Error(swapError.message);
    }

    if (!swappedRows || swappedRows.length !== ids.length) {
      throw new Error("Failed to attach Stripe session to reserved paintings.");
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        url: session.url,
        id: session.id,
      }),
    };
  } catch (error) {
    console.error("Create checkout session failed:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
    };
  }
};
