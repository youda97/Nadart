import type { Handler } from "@netlify/functions";
import { products } from "./_lib/products";

export const handler: Handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(products),
  };
};