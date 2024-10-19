"use server";

import { getSupabaseServerClient } from "@/lib/supabase.server";
import { Frame } from "@/types/supabase-custom";
import { PostgrestError } from "@supabase/supabase-js";

export async function fetchFrames(): Promise<
  Partial<{ frames: Frame[]; error: Error | PostgrestError }>
> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("frames")
    .select("*, manufacturer:manufacturer_id (*)")
    .order("name", { ascending: true })
    .order("name", { ascending: true, referencedTable: "manufacturer" });

  if (error) {
    console.error(error);
    return { error };
  }

  return { frames: data ?? [] };
}
