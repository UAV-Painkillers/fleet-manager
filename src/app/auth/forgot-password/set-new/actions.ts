"use server";

import { getSupabaseServerClient } from "@/lib/supabase.server";

export interface ChangePasswordData {
  password: string;
}

export async function changePassword(data: ChangePasswordData) {
  const { error } = await getSupabaseServerClient().auth.updateUser({
    password: data.password,
  });

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
