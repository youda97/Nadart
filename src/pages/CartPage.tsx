import { useRef, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { formatPrice } from "../lib/format";
import type { Painting } from "../types/painting";
import { createCheckoutSession } from "../api/checkout";
import { trackEvent, paintingToGAItem } from "../lib/ga";

type CartPageProps = {
  cart: Painting[];
  onRemove: (id: string) => void;
  refetchPaintings: () => void;
};

export default function CartPage({
  cart,
  onRemove,
  refetchPaintings,
}: CartPageProps) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const [shippingCountry, setShippingCountry] = useState<"CA" | "US">("CA");
  const [searchParams] = useSearchParams();

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const wasCancelled = searchParams.get("cancelled") === "true";
  const hasUnavailableItems = cart.some((item) => item.sold || item.isReserved);
  const hasReleasedRef = useRef(false);
  const hasTrackedViewCartRef = useRef(false);

  async function handleCheckout() {
    try {
      setIsCheckingOut(true);

      const session = await createCheckoutSession(cart, shippingCountry);

      trackEvent("begin_checkout", {
        currency: "CAD",
        value: total,
        items: cart.map((item) => paintingToGAItem(item)),
      });

      // store session id
      localStorage.setItem("checkout_session_id", session.id);

      window.location.href = session.url;
    } catch (error) {
      setCheckoutError(
        error instanceof Error ? error.message : "Checkout failed",
      );
    } finally {
      setIsCheckingOut(false);
    }
  }

  useEffect(() => {
    refetchPaintings();
  }, [refetchPaintings]);

  useEffect(() => {
    if (hasTrackedViewCartRef.current || cart.length === 0) return;

    trackEvent("view_cart", {
      currency: "CAD",
      value: total,
      items: cart.map((item) => paintingToGAItem(item)),
    });

    hasTrackedViewCartRef.current = true;
  }, [cart, total]);

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        if (data.country === "US") {
          setShippingCountry("US");
        }
      });
  }, []);

  useEffect(() => {
    if (!wasCancelled || hasReleasedRef.current) return;

    const sessionId = localStorage.getItem("checkout_session_id");
    if (!sessionId) return;

    hasReleasedRef.current = true;

    fetch("/api/release-reservation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionId,
      }),
    }).catch((error) => {
      console.error("Failed to release reservation", error);
    });

    localStorage.removeItem("checkout_session_id");
  }, [wasCancelled]);

  return (
    <div className="min-h-screen bg-[#f6f6f4] pt-28">
      <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-stone-900 md:text-4xl">
            Your Cart
          </h1>
          <Link
            to="/collection"
            className="text-sm uppercase tracking-[0.16em] text-stone-700 underline-offset-4 hover:underline"
          >
            Continue shopping
          </Link>
        </div>

        {wasCancelled ? (
          <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Checkout was cancelled. Your cart items have been kept.
          </div>
        ) : null}

        {cart.length === 0 ? (
          <div className="rounded-2xl border border-stone-200 bg-white p-10 text-center text-stone-600 shadow-sm">
            Your cart is empty.
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            <div className="space-y-4">
              {cart.map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  className="flex flex-col gap-4 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:flex-row"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-40 w-full rounded-xl object-cover sm:w-32"
                  />

                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-stone-900">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-stone-500">
                      {item.size_width} x {item.size_height} •{" "}
                      {item.category || "Acrylic on canvas"}
                    </p>

                    {item.sold ? (
                      <p className="mt-2 text-sm font-medium text-red-600">
                        This painting has been sold and is no longer available.
                      </p>
                    ) : null}

                    <p className="mt-3 text-lg font-bold text-stone-900">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  <div className="flex items-start">
                    <button
                      onClick={() => onRemove(item.id)}
                      className="rounded-lg border border-stone-300 px-4 py-2 text-sm text-stone-700 hover:bg-stone-50"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-fit rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-stone-900">
                Order Summary
              </h2>

              <div className="mt-5 flex items-center justify-between text-stone-600">
                <span>Items</span>
                <span>{cart.length}</span>
              </div>

              <div className="mt-3 flex items-center justify-between text-lg font-bold text-stone-900">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>

              {checkoutError ? (
                <p className="mt-4 text-sm text-red-600">{checkoutError}</p>
              ) : null}

              <div className="mt-6">
                <label className="block text-sm font-medium text-stone-700">
                  Shipping Country
                </label>

                <select
                  value={shippingCountry}
                  onChange={(e) =>
                    setShippingCountry(e.target.value as "CA" | "US")
                  }
                  className="mt-2 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"
                >
                  <option value="CA">Canada</option>
                  <option value="US">United States</option>
                </select>

                <p className="mt-2 text-xs text-stone-500">
                  Shipping costs will be calculated during checkout.
                </p>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut || hasUnavailableItems}
                className="mt-6 w-full bg-stone-900 px-5 py-3 font-medium text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
              >
                {hasUnavailableItems
                  ? "Unavailable item in cart"
                  : isCheckingOut
                    ? "Redirecting..."
                    : "Checkout"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
