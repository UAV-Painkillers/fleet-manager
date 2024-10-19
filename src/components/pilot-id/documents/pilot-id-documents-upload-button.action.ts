"use server";

import { uploadFileAction } from "@/lib/file-upload.action";
import { getSupabaseServerClient } from "@/lib/supabase.server";
import { Document } from "@/types/supabase-custom";
import { revalidatePath } from "next/cache";

async function createFileMetaData(
  file: File,
  fileNameUTF8: string,
  fileId: string
) {
  const supabase = getSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error: "NOT_AUTHENTICATED",
    };
  }

  const meta: Omit<Document, "id" | "created_at"> = {
    original_file_name: fileNameUTF8,
    path: fileId,
    name: fileNameUTF8,
    user_id: user.id,
    category: "miscellaneous",
  };

  const { data, error } = await supabase
    .from("documents")
    .insert(meta)
    .select("*")
    .single();

  if (error) {
    alert(error);
    console.error(error);
    return { error };
  }

  return { data };
}

async function uploadDocument(file: File, fileNameUTF8: string) {
  const { error: uploadError, fullFilePath } = await uploadFileAction({
    bucketName: "documents",
    file,
    upsert: false,
    path: "pilot-id-documents",
  });

  if (uploadError) {
    return { error: uploadError };
  }

  const { error: metaError, data } = await createFileMetaData(
    file,
    fileNameUTF8,
    fullFilePath!
  );

  if (metaError) {
    return { error: metaError };
  }

  return {
    fullFilePath,
    meta: data,
  };
}

async function getShareHandleOfCurrentUser() {
  const supabase = getSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "NOT_AUTHENTICATED" };
  }

  const { data, error } = await supabase
    .from("pilots")
    .select("share_handle")
    .eq("user_id", user.id)
    .single();

  if (error) {
    return { error };
  }

  if (!data?.share_handle) {
    return { error: "NO_SHARE_HANDLE" };
  }

  return { shareHandle: data?.share_handle };
}

export async function uploadDocumentFormAction(formData: FormData) {
  const file = formData.get("file") as File;
  const fileNameUTF8 = formData.get("fileNameUTF8") as string;

  const { error: shareHandleError, shareHandle } =
    await getShareHandleOfCurrentUser();

  if (shareHandleError) {
    return { error: shareHandleError };
  }

  const { error: uploadError, meta } = await uploadDocument(file, fileNameUTF8);

  if (uploadError) {
    return { error: uploadError };
  }

  revalidatePath(`/p/${shareHandle}`);

  return { document: meta };
}
