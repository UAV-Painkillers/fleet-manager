import { type CookieOptions } from "@supabase/ssr";

export interface Cookie {
  name: string;
  value: string;
  options: CookieOptions;
}
