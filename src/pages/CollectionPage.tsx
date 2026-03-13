import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ShelfRow from "../components/ShelfRow";
import PaintingCard from "../components/PaintingCard";
import type { Painting } from "../types/painting";

type CollectionPageProps = {
  onQuickView: (painting: Painting) => void;
  onAddToCart: (painting: Painting) => void;
  paintings: Painting[];
  paintingsLoading: boolean;
};

export default function CollectionPage({
  onQuickView,
  onAddToCart,
  paintings,
  paintingsLoading,
}: CollectionPageProps) {
  const [page, setPage] = useState(1);

  const perPage = 9;
  const totalPages = Math.ceil(paintings.length / perPage);

  const pageItems = useMemo(() => {
    const start = (page - 1) * perPage;
    return paintings.slice(start, start + perPage);
  }, [page, paintings]);

  const rows = useMemo(() => {
    const grouped: Painting[][] = [];
    for (let i = 0; i < pageItems.length; i += 3) {
      grouped.push(pageItems.slice(i, i + 3));
    }
    return grouped;
  }, [pageItems]);

  const loadingPlaceholders = useMemo(
    () => Array.from({ length: 3 }, (_, index) => `loading-${index}`),
    [],
  );

  return (
    <div className="min-h-screen bg-[#f6f6f4] pt-19">
      <div className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3 text-sm text-stone-500 sm:px-6 lg:px-8">
          <Link to="/" className="hover:text-stone-900">
            Home
          </Link>
          <span className="mx-2">&gt;</span>
          <span className="text-stone-800">Collection</span>
        </div>
      </div>

      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <div className="mb-4 inline-flex items-center gap-4">
              <span className="h-[2px] w-10 bg-[#b99a64]" />
              <h1 className="text-3xl font-bold text-stone-900">Collection</h1>
              <span className="h-[2px] w-10 bg-[#b99a64]" />
            </div>
          </div>

          {paintingsLoading ? (
            <>
              <div className="hidden lg:block">
                <ShelfRow
                  items={[]}
                  onQuickView={onQuickView}
                  onAddToCart={onAddToCart}
                  isLoading
                />
              </div>

              <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:hidden">
                {loadingPlaceholders.map((key) => (
                  <PaintingCard
                    key={key}
                    isLoading
                    onQuickView={onQuickView}
                    onAddToCart={onAddToCart}
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="hidden lg:block">
                {rows.map((row, rowIndex) => (
                  <ShelfRow
                    key={rowIndex}
                    items={row}
                    onQuickView={onQuickView}
                    onAddToCart={onAddToCart}
                    getPriorityForIndex={(itemIndex) =>
                      page === 1 && rowIndex === 0 && itemIndex === 0
                    }
                  />
                ))}
              </div>

              <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:hidden">
                {pageItems.map((painting, index) => (
                  <PaintingCard
                    key={painting.id}
                    painting={painting}
                    onQuickView={onQuickView}
                    onAddToCart={onAddToCart}
                    priority={page === 1 && index === 0}
                  />
                ))}
              </div>

              {totalPages > 1 ? (
                <div className="mt-10 flex items-center justify-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="h-8 w-8 bg-[#b99a64] text-white disabled:opacity-40"
                    disabled={page === 1}
                  >
                    ‹
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`h-8 w-8 border text-sm ${
                          page === pageNum
                            ? "border-[#b99a64] bg-white text-stone-900"
                            : "border-stone-300 bg-white text-stone-500"
                        }`}
                      >
                        {pageNum}
                      </button>
                    ),
                  )}

                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    className="h-8 w-8 bg-[#b99a64] text-white disabled:opacity-40"
                    disabled={page === totalPages}
                  >
                    ›
                  </button>
                </div>
              ) : null}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
