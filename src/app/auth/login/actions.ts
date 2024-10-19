"use server";

import { getSupabaseServerClient } from "@/lib/supabase.server";
import { revalidatePath } from "next/cache";

interface LoginData {
  email: string;
  password: string;
}

export async function login(data: LoginData) {
  const supabase = getSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return {
      error: {
        name: error.name,
        message: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
    };
  }

  revalidatePath("/", "layout");

  return { success: true };
}
