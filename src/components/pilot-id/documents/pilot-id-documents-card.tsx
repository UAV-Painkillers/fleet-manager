"use client";

import { FileIcon, UploadIcon } from "lucide-react";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";
import { useAuth } from "@/store/auth";
import { useCallback, useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";
import { nanoid } from "nanoid";
import { Document } from "@/types/supabase-custom";
import { PilotIdDocumentsUploadButton } from "./pilot-id-documents-upload-button";

export function PilotIdDocumentsCard() {
  const { session } = useAuth();

  const [documents, setDocuments] = useState<Document[]>([]);
  const [openedDocument, setOpenedDocument] = useState<Document | null>(null);

  const onDocumentCreated = useCallback((document: Document) => {
    setDocuments((currentDocuments) => [...currentDocuments, document]);
    setOpenedDocument(document);
  }, []);

  const fetchDocuments = useCallback(async () => {
    if (!session) {
      return;
    }

    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setDocuments(data ?? []);
  }, [session]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  if (!session) {
    return null;
  }

  return (
    <Card className="col-span-1 lg:col-span-5">
      <CardContent className="p-4 space-y-6">
        <div className="space-y-1">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Documents</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Legal, Insurance and other Documents.
              <br />
              <small>(These are only visible to yourself)</small>
            </p>
          </div>

          <div className="flex flex-col space-y-4">
            {documents.map((document) => (
              <div key={document.id} className="flex items-center space-x-4">
                <FileIcon className="w-5 h-5" />
                <span>{document.original_file_name}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-4 pt-4">
            <PilotIdDocumentsUploadButton
              onDocumentCreated={onDocumentCreated}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
