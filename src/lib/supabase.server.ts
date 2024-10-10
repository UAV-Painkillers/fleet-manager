import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseEnvVariables } from "./supabase.shared-env";

let supabaseServer: ReturnType<typeof createServerClient> | undefined =
  undefined;

export function getSupabaseServerClient() {
  if (!supabaseServer) {
    const cookieStore = cookies();

    const { anonKey, url } = getSupabaseEnvVariables();

    supabaseServer = createServerClient(url, anonKey, {
      cookies: {
        getAll: () => {
          return cookieStore.getAll();
        }
      },
    });
  }

  return supabaseServer!;
}
