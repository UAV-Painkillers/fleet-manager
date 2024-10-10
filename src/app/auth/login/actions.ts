"use server";

import { getSupabaseServerClient } from "@/lib/supabase.server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const supabase = getSupabaseServerClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.log("login error");
    redirect("/auth/login/error");
  }

  console.log("login success");
  revalidatePath("/", "layout");
  console.log("redirecting to /");
  redirect("/");
}

export async function redirectToPasswordReset() {
  redirect("/auth/password-reset");
}

export async function redirectToRegister() {
  redirect("/auth/register");
}