import { Button } from "@/components/ui/button";
import { getSupabase } from "@/lib/supabase";
import { useAuth } from "@/store/auth";
import { Document } from "@/types/supabase-custom";
import { PostgrestError } from "@supabase/supabase-js";
import { UploadIcon } from "lucide-react";
import { nanoid } from "nanoid";
import { useCallback } from "react";
import { toast } from "sonner";

interface Props {
  onDocumentCreated?: (document: Document) => void;
}
export function PilotIdDocumentsUploadButton(props: Props) {
  const { session } = useAuth();

  const toastGenericError = useCallback((error: Error | PostgrestError) => {
    toast.error(
      "Oh no! Something went wrong while uploading your document." +
        " " +
        error.message
    );
  }, []);

  const createFileMetaData = useCallback(
    async (file: File, fileId: string) => {
      if (!session) {
        return;
      }

      const meta: Omit<Document, "id" | "created_at"> = {
        original_file_name: file.name,
        path: fileId,
        name: file.name,
        user_id: session.user.id,
        category: "miscellaneous",
      };

      const supabase = getSupabase();

      const { data, error } = await supabase
        .from("documents")
        .insert(meta)
        .select("*")
        .single();

      if (error) {
        toastGenericError(error);
        console.error(error);
        return;
      }

      toast.success("Document uploaded successfully");

      if (typeof props.onDocumentCreated === "function") {
        props.onDocumentCreated(data);
      }
    },
    [props, session, toastGenericError]
  );

  const uploadFile = useCallback(
    async (file: File) => {
      if (!session) {
        return;
      }

      const fileId = `users/${session.user.id}/documents/${nanoid()}`;

      const supabase = getSupabase();
      const { error } = await supabase.storage
        .from("documents")
        .upload(fileId, file, {
          upsert: false,
        });

      if (error) {
        toastGenericError(error);
        console.error(error);
        return;
      }

      await createFileMetaData(file, fileId);
    },
    [createFileMetaData, session, toastGenericError]
  );

  const openFilePicker = useCallback(async () => {
    const input = document.createElement("input") as HTMLInputElement;
    input.type = "file";
    input.addEventListener("change", async () => {
      const file = input.files?.[0];
      if (!file) {
        return;
      }

      await uploadFile(file);
    });

    input.click();
  }, [uploadFile]);

  const onUploadButtonClick = useCallback(async () => {
    openFilePicker();
  }, [openFilePicker]);

  return (
    <Button variant="outline" onClick={onUploadButtonClick}>
      <UploadIcon className="w-5 h-5 mr-2" />
      Upload Document
    </Button>
  );
}
