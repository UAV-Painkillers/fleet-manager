import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest } from "next/server";

import { getSupabaseServerClient } from "@/lib/supabase.server";
import { redirect } from "next/navigation";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";

  const redirectToErrorPage = (error: { name: string; message: string }) => {
    const errorUrl = new URL(request.url);
    errorUrl.pathname = "/error";
    errorUrl.searchParams.forEach((_value, key) => {
      errorUrl.searchParams.delete(key);
    });
    errorUrl.searchParams.set("name", error.name);
    errorUrl.searchParams.set("message", error.message);
    redirect(errorUrl.href);
  };

  if (!token_hash || !type) {
    return redirectToErrorPage({
      name: "MISSING_TOKEN_HASH",
      message: "Missing token hash or type",
    });
  }

  const supabase = getSupabaseServerClient();

  const { error } = await supabase.auth.verifyOtp({
    type,
    token_hash,
  });

  if (error) {
    console.error(error);
    return redirectToErrorPage(error);
  }

  redirect(next);
}
