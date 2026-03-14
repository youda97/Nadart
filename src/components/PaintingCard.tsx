import { useState } from "react";
import { ShoppingCart, Search } from "lucide-react";
import { formatPrice } from "../lib/format";
import ReservedCountdown from "./ReservedCountdown";
import type { Painting } from "../types/painting";

type PaintingCardProps = {
  onQuickView: (painting: Painting) => void;
  onAddToCart: (painting: Painting) => void;
  painting?: Painting;
  isLoading?: boolean;
  priority?: boolean;
};

export default function PaintingCard({
  onQuickView,
  onAddToCart,
  painting,
  isLoading = false,
  priority = false,
}: PaintingCardProps) {
  const [imageLoaded, setImageLoaded] = useState(() => !painting?.image);

  if (isLoading || !painting) {
    return (
      <div className="group relative mx-auto w-full max-w-[340px] animate-pulse">
        <div className="relative z-10 overflow-visible border-[18px] border-black bg-[#f0e9e3] shadow-[0_12px_28px_rgba(0,0,0,0.18)]">
          <div className="aspect-[4/5] bg-[#f4efea] p-6 sm:p-8">
            <div className="h-full w-full bg-stone-200" />
          </div>
        </div>

        <div className="bg-transparent px-2 pb-2 pt-6 text-center lg:hidden">
          <div className="mx-auto h-7 w-40 bg-stone-200" />
          <div className="mx-auto mt-4 h-8 w-28 bg-stone-200" />

          <div className="mt-7 flex items-center justify-center gap-4">
            <div className="h-16 w-16 bg-stone-200" />
            <div className="h-16 w-16 bg-stone-200" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative mx-auto w-full max-w-[340px]">
      {/* Frame */}
      <div className="relative z-10 overflow-visible border-[18px] border-black bg-[#f0e9e3] shadow-[0_12px_28px_rgba(0,0,0,0.18)]">
        {painting.sold ? (
          <div className="absolute -right-8 -top-8 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#ccb183] text-[11px] font-semibold uppercase tracking-[0.16em] text-white shadow-lg">
            Sold
          </div>
        ) : painting.isReserved ? (
          <div className="absolute -left-6 -bottom-6 z-20 bg-amber-500 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow-md">
            <div>Reserved</div>
            <ReservedCountdown
              reservedUntil={painting.reserved_until ?? null}
            />
          </div>
        ) : null}

        <div className="relative aspect-[4/5] bg-[#f4efea] p-6 sm:p-8">
          {!imageLoaded ? (
            <div className="absolute inset-6 animate-pulse bg-stone-200 sm:inset-8" />
          ) : null}

          <img
            src={painting.image}
            alt={painting.title}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            onLoad={() => setImageLoaded(true)}
            className={`h-full w-full object-cover transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      </div>

      {/* Slanted overlay for desktop */}
      <div className="pointer-events-none absolute inset-0 z-20 hidden items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100 lg:flex">
        <div className="relative flex h-[112%] w-[112%] -rotate-[6deg] items-center justify-center bg-[#ccb183]/82 px-6 shadow-[0_20px_35px_rgba(0,0,0,0.18)]">
          <div className="pointer-events-auto rotate-[6deg] text-center">
            <h3 className="text-xl font-semibold text-black">
              {painting.title}
            </h3>

            <div className="mt-4 flex items-center justify-center gap-3 text-2xl font-bold text-white">
              {painting.old_price ? (
                <span className="text-white/80 line-through">
                  {formatPrice(painting.old_price)}
                </span>
              ) : null}
              <span>{formatPrice(painting.price)}</span>
            </div>

            <div className="mt-7 flex items-center justify-center gap-4">
              <div
                className={
                  painting.sold || painting.isReserved
                    ? "cursor-not-allowed"
                    : ""
                }
              >
                <button
                  onClick={() => onAddToCart(painting)}
                  disabled={painting.sold || painting.isReserved}
                  className="flex h-12 w-12 items-center justify-center bg-black text-white transition enabled:cursor-pointer enabled:hover:scale-105 disabled:pointer-events-none disabled:opacity-50"
                >
                  <ShoppingCart className="pointer-events-none h-6 w-6" />
                </button>
              </div>

              <button
                onClick={() => onQuickView(painting)}
                className="flex h-12 w-12 items-center justify-center border border-[#c6a468] bg-white text-[#b99a64] transition hover:scale-105"
              >
                <Search className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / tablet details under card */}
      <div className="bg-transparent px-2 pb-2 pt-6 text-center lg:hidden">
        <h3 className="text-2xl font-semibold text-stone-900">
          {painting.title}
        </h3>

        <div className="mt-4 flex items-center justify-center gap-3 text-3xl font-bold text-black">
          {painting.old_price ? (
            <span className="text-black/80 line-through">
              {formatPrice(painting.old_price)}
            </span>
          ) : null}
          <span>{formatPrice(painting.price)}</span>
        </div>

        <div className="mt-7 flex items-center justify-center gap-4">
          <button
            onClick={() => onAddToCart(painting)}
            disabled={painting.sold || painting.isReserved}
            className="flex h-16 w-16 items-center justify-center bg-black text-white transition disabled:opacity-50"
          >
            <ShoppingCart className="h-6 w-6" />
          </button>

          <button
            onClick={() => onQuickView(painting)}
            className="flex h-16 w-16 items-center justify-center border border-[#c6a468] bg-white text-[#b99a64]"
          >
            <Search className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
