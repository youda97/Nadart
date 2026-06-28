import { CheckCircle2, X } from "lucide-react";
import type { Painting } from "../types/painting";
import { useEffect } from "react";

type AddedToCartModalProps = {
  painting: Painting;
  onClose: () => void;
  onContinue: () => void;
  onGoCart: () => void;
};

export default function AddedToCartModal({
  painting,
  onClose,
  onContinue,
  onGoCart,
}: AddedToCartModalProps) {
  useEffect(() => {
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollBarWidth}px`;

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[60] lg:flex lg:items-center lg:justify-center lg:overflow-y-hidden overflow-y-auto bg-[#bca173]/85 px-4 py-6 backdrop-blur-[1px] sm:py-10">
      <button
        onClick={onClose}
        aria-label="Close added to cart modal"
        className="fixed right-4 top-[calc(env(safe-area-inset-top)+1rem)] z-[70] flex h-13 w-13 items-center justify-center rounded-full bg-white text-[#b99a64] shadow-md transition hover:scale-105 sm:absolute sm:right-6 sm:top-6 sm:h-16 sm:w-16"
      >
        <X className="h-6 w-6 sm:h-8 sm:w-8" />
      </button>

      <div className="mx-auto grid min-h-dvh w-full max-w-6xl grid-cols-1 items-start gap-8 pt-18 pb-8 sm:min-h-screen sm:items-center sm:pt-0 lg:grid-cols-[1fr_320px]">
        <div>
          <div className="mb-8 md:mt-6 flex items-center gap-4 text-white">
            <CheckCircle2 className="h-10 w-10" />
            <h3 className="text-2xl font-bold md:text-3xl">
              Added To Your Shopping Cart.
            </h3>
          </div>

          <div className="space-y-4 sm:space-y-8">
            <button
              onClick={onContinue}
              className="w-full bg-black px-8 py-5 text-base font-medium text-white transition hover:bg-stone-900 sm:py-6 sm:text-lg"
            >
              Continue Shopping
            </button>

            <button
              onClick={onGoCart}
              className="w-full bg-white px-8 py-5 text-base font-medium text-[#b99a64] transition hover:bg-stone-50 sm:py-6 sm:text-lg"
            >
              Go To Cart
            </button>
          </div>
        </div>

        <div className="justify-self-center bg-[#f0e9e3] p-4 shadow-lg sm:p-5">
          <img
            src={painting.image}
            alt={painting.title}
            className="h-[360px] w-[260px] object-cover"
          />
        </div>
      </div>
    </div>
  );
}
