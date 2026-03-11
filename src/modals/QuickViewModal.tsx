import { X } from "lucide-react";
import { formatPrice } from "../lib/format";
import type { Painting } from "../types/painting";
import { useEffect } from "react";

type QuickViewModalProps = {
  painting: Painting;
  onClose: () => void;
  onAddToCart: (painting: Painting) => void;
};

export default function QuickViewModal({
  painting,
  onClose,
  onAddToCart,
}: QuickViewModalProps) {
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#bca173]/85 px-4 lg:pl-20 py-6 backdrop-blur-[1px] sm:py-8 lg:py-10">
      <button
        onClick={onClose}
        className="fixed right-4 top-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#b99a64] shadow-md transition hover:scale-105 sm:right-6 sm:top-6 sm:h-16 sm:w-16"
      >
        <X className="h-6 w-6 sm:h-8 sm:w-8" />
      </button>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 pt-16 sm:pt-20 lg:grid-cols-[minmax(0,620px)_1fr] lg:items-center lg:gap-12">
        {/* Left side */}
        <div className="relative flex justify-center pb-10 lg:pb-24">
          {/* Shelf behind frame */}
          <div className="pointer-events-none absolute bottom-[20px] left-1/2 z-0 hidden w-[120%] -translate-x-1/2 lg:block">
            <img
              src="/decor/wood-plank.webp"
              alt="wood shelf"
              className="h-24 w-full object-fill"
            />
          </div>

          {/* Frame */}
          <div className="relative z-10 inline-block border-[10px] border-black bg-[#f4efea] shadow-[0_18px_32px_rgba(0,0,0,0.22)] sm:border-[16px]">
            <div className="flex items-center justify-center bg-[#f1ece7] p-4 sm:p-6 md:p-10">
              <img
                src={painting.image}
                alt={painting.title}
                className="block max-h-[52vh] w-auto max-w-full object-contain sm:max-h-[58vh] lg:max-h-[62vh] lg:max-w-[520px]"
              />
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex h-full items-start lg:items-center">
          <div className="text-white">
            <h3 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {painting.title}
            </h3>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-2xl font-bold sm:text-3xl">
              {painting.oldPrice ? (
                <span className="text-white/80 line-through">
                  {formatPrice(painting.oldPrice)}
                </span>
              ) : null}
              <span>{formatPrice(painting.price)}</span>
            </div>

            <div className="mt-8 flex items-center gap-3 text-lg sm:text-xl">
              <span className="font-semibold">Size:</span>
              <span className="text-white/95">{painting.size}</span>
            </div>

            {painting.sold ? (
              <div className="mt-8 inline-flex bg-stone-900 px-8 py-4 text-xl font-medium text-white">
                Sold
              </div>
            ) : (
              <button
                onClick={() => onAddToCart(painting)}
                className="mt-8 bg-black px-6 py-3 text-lg font-medium text-white transition hover:bg-stone-900 sm:px-8 sm:py-4 sm:text-xl"
              >
                Add To Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
