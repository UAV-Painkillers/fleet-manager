import { Database } from "@/types/supabase";
import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { getSupabaseEnvVariables } from "./supabase-shared";

let supabase: SupabaseClient | null = null;

export function getSupabase() {
  if (!supabase) {
    const { anonKey, url } = getSupabaseEnvVariables();

    supabase = createClient<Database>(url, anonKey);
  }

  return supabase!;
}
