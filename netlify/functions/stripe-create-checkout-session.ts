import type { Handler } from '@netlify/functions';
import { stripe } from './_lib/stripe';
import { getProductById } from './_lib/products';
import { json, noContent } from './_lib/cors';

type CartItem = {
  productId: string;
  quantity: number;
};

type RequestBody = {
  items: CartItem[];
};

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return noContent();
  }

  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed' });
  }

  try {
    const siteUrl = process.env.SITE_URL;

    if (!siteUrl) {
      throw new Error('Missing SITE_URL');
    }

    const body = JSON.parse(event.body || '{}') as RequestBody;

    if (!Array.isArray(body.items) || body.items.length === 0) {
      return json(400, { error: 'Cart is empty' });
    }

    const line_items = body.items.map((item) => {
      const product = getProductById(item.productId);

      if (!product) {
        throw new Error(`Product not found: ${item.productId}`);
      }

      if (!product.inStock || product.sold) {
        throw new Error(`Product out of stock: ${item.productId}`);
      }

      return {
        quantity: item.quantity,
        price_data: {
          currency: 'cad',
          unit_amount: Math.round(product.price * 100),
          product_data: {
            name: product.title,
            images: [`${siteUrl}${product.image}`],
            metadata: {
              productId: product.id,
              size: product.size,
              category: product.category ?? '',
            },
          },
        },
      };
    });

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/cart?cancelled=true`,
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['CA', 'US'],
      },
      invoice_creation: {
        enabled: true,
      },
      customer_creation: 'always',
      metadata: {
        source: 'nadart-site',
      },
    });

    return json(200, {
      url: session.url,
      id: session.id,
    });
  } catch (error) {
    return json(500, {
      error: error instanceof Error ? error.message : 'Unknown Stripe error',
    });
  }
};