import type { Handler } from "@netlify/functions";
import { supabase } from "./_lib/supabase";

export const handler: Handler = async () => {
  const nowIso = new Date().toISOString();

  console.log("Running reservation cleanup", nowIso);

  const { data, error } = await supabase
    .from("paintings")
    .update({
      reserved_until: null,
      reserved_session_id: null,
    })
    .not("reserved_until", "is", null)
    .lte("reserved_until", nowIso)
    .eq("sold", false)
    .select("id, title");

  if (error) {
    console.error("Cleanup failed", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }

  console.log("Expired reservations cleared:", data?.length ?? 0);

  return {
    statusCode: 200,
    body: JSON.stringify({
      cleared: data?.length ?? 0,
      paintings: data ?? [],
    }),
  };
};
