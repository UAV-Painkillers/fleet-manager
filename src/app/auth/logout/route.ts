import { getSupabaseServerClient } from "@/lib/supabase.server";
import { redirect } from "next/navigation";

export async function GET() {
  const supabase = getSupabaseServerClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    throw error;
  }

  redirect("/");
}
