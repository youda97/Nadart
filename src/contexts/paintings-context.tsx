import { createContext } from "react";
import type { Painting } from "../types/painting";

export type PaintingsContextValue = {
  paintings: Painting[];
  paintingsLoading: boolean;
  refetchPaintings: () => Promise<void>;
};

export const PaintingsContext = createContext<
  PaintingsContextValue | undefined
>(undefined);
