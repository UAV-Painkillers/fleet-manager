"use server";

import { getSupabaseServerClient } from "@/lib/supabase.server";
import { nanoid } from "nanoid";

interface UploadImageProps {
  bucketName: string;
  file: File;
  path?: string;
  upsert?: boolean;
}

export async function uploadFileAction({
  bucketName,
  file,
  path,
  upsert,
}: UploadImageProps) {
  const supabase = getSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error: "NOT_AUTHENTICATED",
    };
  }

  if (!path) {
    path = "";
  }

  if (path.endsWith("/")) {
    path = path.substring(0, path.length - 1);
  }

  if (path.startsWith("/")) {
    path = path.substring(1);
  }

  const fullFilePath = `users/${user.id}/${path}/${nanoid()}`;

  const { error } = await supabase.storage
    .from(bucketName)
    .upload(fullFilePath, file, {
      upsert: upsert || false,
    });

  return {
    error,
    fullFilePath,
  };
}
