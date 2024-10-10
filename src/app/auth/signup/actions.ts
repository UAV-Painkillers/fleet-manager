"use server";

import { getSupabaseServerClient } from "@/lib/supabase.server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signup(formData: FormData) {
  const supabase = getSupabaseServerClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/auth/signup/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function redirectToLogin() {
  redirect("/auth/login");
}