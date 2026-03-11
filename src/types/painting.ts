export type Painting = {
  id: string;
  title: string;
  price: number;
  oldPrice?: number;
  size: string;
  image: string;
  featured?: boolean;
  inStock: boolean;
  category?: string;
  sold: boolean;
};