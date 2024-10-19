"use server";

import { FileIcon } from "lucide-react";
import { Card, CardContent } from "../../ui/card";
import { getSupabaseServerClient } from "@/lib/supabase.server";
import { Document } from "@/types/supabase-custom";
import { PilotIdDocumentsUploadButton } from "./pilot-id-documents-upload-button";

async function fetchDocuments() {
  const supabase = getSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error: "NOT_AUTHENTICATED",
    };
  }

  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return {
    documents: (data as Document[]) || undefined,
    error,
  };
}

export async function PilotIdDocumentsCard() {
  const { documents, error } = await fetchDocuments();

  if (error === "NOT_AUTHENTICATED") {
    return null;
  }

  return (
    <Card className="col-span-1 lg:col-span-5">
      <CardContent className="p-4 space-y-6">
        <div className="space-y-1">
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold">Documents</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Legal, Insurance and other Documents.
                <br />
                <small>(These are only visible to yourself)</small>
              </p>
            </div>

            {/* Upload documents button adjusted for responsiveness */}
            <div className="mt-4 sm:mt-0">
              <PilotIdDocumentsUploadButton />
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            {error ? (
              <div>Error: {JSON.stringify(error, null, 4)}</div>
            ) : (
              documents?.map((document) => (
                <div key={document.id} className="flex items-center space-x-4">
                  <FileIcon className="w-5 h-5" />
                  <span>{document.original_file_name}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
