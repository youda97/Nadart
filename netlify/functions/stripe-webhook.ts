import type { Handler } from '@netlify/functions';
import Stripe from 'stripe';
import { stripe } from './_lib/stripe';
import { json } from './_lib/cors';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed' });
  }

  try {
    const signature = event.headers['stripe-signature'] || event.headers['Stripe-Signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!signature || !webhookSecret || !event.body) {
      return json(400, { error: 'Missing webhook signature or secret' });
    }

    const stripeEvent = stripe.webhooks.constructEvent(event.body, signature, webhookSecret);

    switch (stripeEvent.type) {
      case 'checkout.session.completed': {
        const session = stripeEvent.data.object as Stripe.Checkout.Session;

        console.log('Checkout completed', {
          sessionId: session.id,
          customerEmail: session.customer_details?.email,
          amountTotal: session.amount_total,
        });

        // TODO: save order to DB and mark one-of-one paintings sold.
        break;
      }

      case 'checkout.session.expired': {
        const session = stripeEvent.data.object as Stripe.Checkout.Session;
        console.log('Checkout expired', { sessionId: session.id });
        break;
      }

      default:
        console.log(`Unhandled event type: ${stripeEvent.type}`);
    }

    return json(200, { received: true });
  } catch (error) {
    return json(400, {
      error: error instanceof Error ? error.message : 'Webhook verification failed',
    });
  }
};