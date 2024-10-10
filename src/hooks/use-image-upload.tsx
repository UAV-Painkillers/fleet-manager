import { useCallback } from "react";
import { PostgrestError } from "@supabase/supabase-js";
import { toast } from "sonner";
import { uploadFileAction } from "../lib/file-upload.action";

export function useFileUpload(bucketName: string) {
  const toastGenericError = useCallback((error: Error | PostgrestError) => {
    toast.error(
      "Oh no! Something went wrong while uploading your document." +
        " " +
        error.message
    );
  }, []);

  const upload = useCallback(
    async (
      file: File,
      options: { path?: string; upsert?: boolean } = { upsert: false }
    ) => {
      const { path: pathFromOptions, upsert } = options;

      if (!file) {
        return;
      }

      const { error, fullFilePath } = await uploadFileAction({
        bucketName,
        file,
        path: pathFromOptions,
        upsert,
      });

      if (error) {
        toastGenericError(error);
        console.error(error);
        return;
      }

      toast.success("File uploaded successfully");

      return fullFilePath;
    },
    [bucketName, toastGenericError]
  );

  return upload;
}
