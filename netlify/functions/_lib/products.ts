export type Product = {
  id: string;
  title: string;
  price: number; // in CAD dollars
  oldPrice?: number;
  image: string;
  featured?: boolean;
  size: string;
  inStock: boolean;
  category?: string;
  sold: boolean;
};

export const products: Product[] = [
{
    id: 'the-blessed-olive-land',
    title: 'The Blessed Olive Land',
    price: 450,
    size: '30" x 40"',
    image: '/paintings/painting-1.jpeg',
    featured: true,
    inStock: true,
    category: 'Islamic Nature & Spiritual Landscapes',
    sold: true,
  },
  {
    id: 'light-of-al-aqsa',
    title: 'Light of Al-Aqsa',
    price: 5000,
    size: '36" x 48"',
    image: '/paintings/painting-2.jpeg',
    featured: true,
    inStock: true,
    category: 'Sacred Places',
    sold: true,

  },
  {
    id: 'the-oneness-of-allah',
    title: 'The Oneness of Allah',
    price: 175,
    oldPrice: 350,
    size: '36" x 48"',
    image: '/paintings/painting-3.jpeg',
    featured: true,
    inStock: true,
    category: 'Islamic Calligraphy',
    sold: true,

  },
  {
    id: 'echoes-of-jannah',
    title: 'Echoes of Jannah',
    price: 200,
    size: '20" x 15"',
    image: '/paintings/painting-4.jpeg',
    inStock: true,
    category: 'Quranic Reflection Landscapes',
    sold: true,
  },
  {
    id: 'tawakkul-at-sunset',
    title: 'Tawakkul at Sunset',
    price: 200,
    size: '20" x 15"',
    image: '/paintings/painting-5.jpeg',
    inStock: true,
    category: 'Quranic Reflection Landscapes',
    sold: true,
  },
];

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}