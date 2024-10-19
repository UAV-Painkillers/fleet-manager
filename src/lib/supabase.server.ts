import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseEnvVariables } from "./supabase.shared-env";
import { Cookie } from "@/types/cookie";

export function getSupabaseServerClient() {
  const cookieStore = cookies();

  const { anonKey, url } = getSupabaseEnvVariables();

  const supabaseServer = createServerClient(url, anonKey, {
    cookies: {
      getAll: () => {
        return cookieStore.getAll();
      },
      setAll: (cookiesToSet: Cookie[]) => {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch (e) {
          console.warn("could not set cookies from supabase", e);
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });

  return supabaseServer!;
}
