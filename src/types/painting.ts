export type Painting = {
  id: string;
  title: string;
  price: number;
  old_price?: number;
  image: string;
  size_width: number;
  size_height: number;
  category?: string;
  sold: boolean;
  reserved_until?: string | null;
  isReserved: boolean;
  created_at: string;
};
