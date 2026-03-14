import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Painting } from "../types/painting";
import {
  PaintingsContext,
  type PaintingsContextValue,
} from "../contexts/paintings-context";

export function PaintingsProvider({ children }: { children: ReactNode }) {
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [paintingsLoading, setPaintingsLoading] = useState(true);

  const refetchPaintings = useCallback(async () => {
    try {
      setPaintingsLoading(true);

      const res = await fetch("/api/paintings");

      if (!res.ok) {
        throw new Error("Failed to fetch paintings");
      }

      const data = (await res.json()) as Painting[];
      setPaintings(data);
    } catch (error) {
      console.error("Failed to fetch paintings:", error);
    } finally {
      setPaintingsLoading(false);
    }
  }, []);

  useEffect(() => {
    refetchPaintings();
  }, [refetchPaintings]);

  const value: PaintingsContextValue = useMemo(
    () => ({
      paintings,
      paintingsLoading,
      refetchPaintings,
    }),
    [paintings, paintingsLoading, refetchPaintings],
  );

  return (
    <PaintingsContext.Provider value={value}>
      {children}
    </PaintingsContext.Provider>
  );
}
