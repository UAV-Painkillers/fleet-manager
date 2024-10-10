"use server";

import { getSupabaseServerClient } from "@/lib/supabase.server";
import { redirect } from "next/navigation";

export async function redirectToLogin() {
  redirect("/auth/login");
}

export async function submit(formData: FormData) {
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
  };

  const { error } = await getSupabaseServerClient().auth.resetPasswordForEmail(data);

  if (error) {
    redirect("/auth/forgot-password/error");
  }

  redirect("/auth/forgot-password/success");
}