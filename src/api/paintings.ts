import type { Painting } from "../types/painting";

export async function getPaintings(): Promise<Painting[]> {
  const res = await fetch("/api/paintings");

  if (!res.ok) {
    throw new Error("Failed to fetch paintings");
  }

  return res.json();
}