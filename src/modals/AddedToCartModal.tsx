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
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#bca173]/85 px-4 py-10 backdrop-blur-[1px]">
      <button
        onClick={onClose}
        className="absolute right-6 top-6 flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#b99a64] shadow-md transition hover:scale-105"
      >
        <X className="h-8 w-8" />
      </button>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_320px]">
        <div>
          <div className="mb-8 flex items-center gap-4 text-white">
            <CheckCircle2 className="h-10 w-10" />
            <h3 className="text-2xl font-bold md:text-3xl">
              Added To Your Shopping Cart.
            </h3>
          </div>

          <div className="space-y-8">
            <button
              onClick={onContinue}
              className="w-full bg-black px-8 py-6 text-lg font-medium text-white transition hover:bg-stone-900"
            >
              Continue Shopping
            </button>

            <button
              onClick={onGoCart}
              className="w-full bg-white px-8 py-6 text-lg font-medium text-[#b99a64] transition hover:bg-stone-50"
            >
              Go To Cart
            </button>
          </div>
        </div>

        <div className="justify-self-center bg-[#f0e9e3] p-5 shadow-lg">
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
