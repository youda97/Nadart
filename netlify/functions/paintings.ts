import type { Handler } from "@netlify/functions";
import { supabase } from "./_lib/supabase";

export const handler: Handler = async () => {
  const { data, error } = await supabase
    .from("paintings")
    .select("*")
    .order("created_at", { ascending: false, nullsFirst: false });

  if (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }

  const now = Date.now();

  const paintings = (data || []).map((painting) => {
    const reservedUntil = painting.reserved_until
      ? new Date(painting.reserved_until).getTime()
      : null;

    const isReserved = !!reservedUntil && reservedUntil > now;

    return {
      id: painting.id,
      title: painting.title,
      price: Number(painting.price),
      old_price: painting.old_price ? Number(painting.old_price) : undefined,
      size_width: Number(painting.size_width),
      size_height: Number(painting.size_height),
      image: painting.image,
      category: painting.category ?? "",
      sold: painting.sold ?? false,
      reserved_until: painting.reserved_until
        ? new Date(painting.reserved_until).toISOString()
        : null,
      created_at: painting.created_at,
      isReserved,
    };
  });

  return {
    statusCode: 200,
    body: JSON.stringify(paintings),
  };
};
