"use server";

import { uploadFileAction } from "@/lib/file-upload.action";
import { getSupabaseServerClient } from "@/lib/supabase.server";
import { Document } from "@/types/supabase-custom";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function createFileMetaData(file: File, fileId: string) {
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
    original_file_name: file.name,
    path: fileId,
    name: file.name,
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

async function uploadDocument(file: File) {
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

  const { error: shareHandleError, shareHandle } =
    await getShareHandleOfCurrentUser();

  if (shareHandleError) {
    return { error: shareHandleError };
  }

  const { error: uploadError, meta } = await uploadDocument(file);

  if (uploadError) {
    return { error: uploadError };
  }

  revalidatePath(`/p/${shareHandle}`);

  return { document: meta };
}
