import PaintingCard from "./PaintingCard";
import type { Painting } from "../types/painting";

type ShelfRowProps = {
  items: Painting[];
  onQuickView: (painting: Painting) => void;
  onAddToCart: (painting: Painting) => void;
  shelfClassName?: string;
  isLoading?: boolean;
  getPriorityForIndex?: (index: number) => boolean;
};

export default function ShelfRow({
  items,
  onQuickView,
  onAddToCart,
  shelfClassName = "",
  isLoading = false,
  getPriorityForIndex,
}: ShelfRowProps) {
  const loadingItems = Array.from({ length: 3 }, (_, index) => index);

  return (
    <div className={`relative mb-10 ${shelfClassName}`}>
      <div className="relative z-10 mx-auto grid max-w-[1120px] grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        {isLoading
          ? loadingItems.map((index) => (
              <PaintingCard
                key={`loading-shelf-${index}`}
                isLoading
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
              />
            ))
          : items.map((painting, index) => (
              <PaintingCard
                key={painting.id}
                painting={painting}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
                priority={getPriorityForIndex?.(index) ?? false}
              />
            ))}
      </div>

      <div className="pointer-events-none relative mx-auto -mt-10 hidden h-28 w-full max-w-[1300px] lg:block">
        <img
          src="/decor/wood-plank.webp"
          alt="wood shelf"
          className="h-full w-full object-fill"
        />
      </div>
    </div>
  );
}
