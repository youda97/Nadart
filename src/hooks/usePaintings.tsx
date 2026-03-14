import { useContext } from "react";
import { PaintingsContext } from "../contexts/paintings-context";

export function usePaintings() {
  const context = useContext(PaintingsContext);

  if (!context) {
    throw new Error("usePaintings must be used within a PaintingsProvider");
  }

  return context;
}
