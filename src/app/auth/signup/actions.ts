"use server";

import { getSupabaseServerClient } from "@/lib/supabase.server";
import { redirect } from "next/navigation";

interface SignupData {
  email: string;
  password: string;
}

export async function signup(data: SignupData) {
  const supabase = getSupabaseServerClient();

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return {
      error: {
        name: error.name,
        message: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
    };
  }

  return {
    success: true,
  }
}

export async function redirectToLogin() {
  redirect("/auth/login");
}
