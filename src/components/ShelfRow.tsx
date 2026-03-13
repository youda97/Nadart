import PaintingCard from "./PaintingCard";
import type { Painting } from "../types/painting";

type ShelfRowProps = {
  items: Painting[];
  onQuickView: (painting: Painting) => void;
  onAddToCart: (painting: Painting) => void;
  shelfClassName?: string;
  isLoading?: boolean;
};

export default function ShelfRow({
  items,
  onQuickView,
  onAddToCart,
  shelfClassName = "",
  isLoading = false,
}: ShelfRowProps) {
  const loadingItems = Array.from({ length: 3 }, (_, index) => ({
    id: `loading-shelf-${index}`,
  }));

  return (
    <div className={`relative mb-10 ${shelfClassName}`}>
      <div className="relative z-10 mx-auto grid max-w-[1120px] grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        {isLoading
          ? loadingItems.map((item) => (
              <PaintingCard
                key={item.id}
                isLoading
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
              />
            ))
          : items.map((painting) => (
              <PaintingCard
                key={painting.id}
                painting={painting}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
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
