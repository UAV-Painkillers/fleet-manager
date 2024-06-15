import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseEnvVariables } from "./supabase-shared";

let supabaseServer: ReturnType<typeof createServerClient> | undefined =
  undefined;

export function getSupabaseServer() {
  if (!supabaseServer) {
    const cookieStore = cookies();

    const { anonKey, url } = getSupabaseEnvVariables();
    console.log({
      anonKey,
      url,
    });

    supabaseServer = createServerClient(url, anonKey, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    });
  }

  return supabaseServer!;
}
