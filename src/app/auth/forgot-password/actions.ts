"use server";

import { getSupabaseServerClient } from "@/lib/supabase.server";

export interface PasswordResetData {
  email: string;
  origin: string;
}

export async function requestResetEmail(data: PasswordResetData) {
  const { error } = await getSupabaseServerClient().auth.resetPasswordForEmail(
    data.email
  );

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
  };
}
