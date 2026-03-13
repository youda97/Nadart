import type { Painting } from "../types/painting";

type CheckoutCartItem = {
  productId: string;
  quantity: number;
};

export async function createCheckoutSession(
  cart: Painting[],
  shippingCountry: "CA" | "US",
) {
  const grouped = new Map<string, number>();

  for (const item of cart) {
    grouped.set(item.id, (grouped.get(item.id) || 0) + 1);
  }

  const items: CheckoutCartItem[] = Array.from(grouped.entries()).map(
    ([productId, quantity]) => ({
      productId,
      quantity,
    }),
  );

  const response = await fetch("/api/stripe-create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ items, shippingCountry }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      `Checkout failed: ${error || error.error || "Unknown error"}`,
    );
  }

  return response.json() as Promise<{ url: string; id: string }>;
}
