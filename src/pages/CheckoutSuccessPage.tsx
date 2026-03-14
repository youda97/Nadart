import { useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

type CheckoutSuccessPageProps = {
  clearCart: () => void;
  refetchPaintings: () => void;
};

export default function CheckoutSuccessPage({
  clearCart,
  refetchPaintings,
}: CheckoutSuccessPageProps) {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const hasClearedRef = useRef(false);

  useEffect(() => {
    refetchPaintings();
  }, [refetchPaintings]);

  useEffect(() => {
    if (hasClearedRef.current) return;
    clearCart();
    hasClearedRef.current = true;
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-[#f8f3eb] pt-28">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-stone-200 bg-white p-8 text-center shadow-sm sm:p-12">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-stone-900">
            Payment successful
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-stone-600 sm:text-lg">
            Thank you for your order. Your payment has been received and your
            artwork purchase is being processed.
          </p>

          {sessionId ? (
            <p className="mt-4 text-sm text-stone-500">
              Order reference: <span className="font-medium">{sessionId}</span>
            </p>
          ) : null}

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/collection"
              className="inline-flex items-center justify-center bg-stone-900 px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-black"
            >
              Continue shopping
            </Link>

            <a
              href="https://instagram.com/nadart_815"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center border border-stone-300 bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-stone-800 transition hover:bg-stone-50"
            >
              Follow on Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
