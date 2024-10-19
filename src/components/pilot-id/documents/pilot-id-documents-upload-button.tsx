"use client";

import { Button } from "@/components/ui/button.extended";
import { Document } from "@/types/supabase-custom";
import { UploadIcon } from "lucide-react";
import { useCallback, useRef, useState, useTransition } from "react";
import { uploadDocumentFormAction } from "./pilot-id-documents-upload-button.action";
import { toast } from "sonner";

interface Props {
  onDocumentCreated?: (document: Document) => void;
}
export function PilotIdDocumentsUploadButton(props: Props) {
  const fileInput = useRef<HTMLInputElement>(null);
  const submitButton = useRef<HTMLButtonElement>(null);

  const [isUploading, startUploadTransition] = useTransition();

  const submitForm = useCallback(() => {
    if ((fileInput.current?.files?.length ?? 0) === 0) {
      return;
    }

    submitButton.current?.click();
  }, []);

  const onUploadButtonClick = useCallback(async () => {
    fileInput.current?.click();
  }, []);

  const onSubmit = useCallback(async (formData: FormData) => {
    startUploadTransition(async () => {
      const file = formData.get("file") as any;
      formData.set("fileNameUTF8", file.name);
      const { error, document } = await uploadDocumentFormAction(formData);

      if (error) {
        toast.error(
          `Oh no! Something went wrong while uploading your document. ${error}`
        );
        return;
      }

      let shortenedName = document.name.substring(0, 30);
      if (shortenedName.length < document.name.length) {
        shortenedName += "...";
      }

      toast.success(`Document "${shortenedName}" uploaded successfully`);

      if (fileInput.current) {
        fileInput.current.value = "";
      }
    });
  }, []);

  return (
    <form action={onSubmit}>
      <input
        type="file"
        name="file"
        className="hidden"
        ref={fileInput}
        onChange={submitForm}
      />
      <Button
        variant="outline"
        onClick={onUploadButtonClick}
        type="button"
        loading={isUploading}
      >
        <UploadIcon className="w-5 h-5 mr-2" />
        Upload Document
      </Button>
      <button type="submit" className="hidden" ref={submitButton} />
    </form>
  );
}
