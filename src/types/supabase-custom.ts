import { Database } from "./supabase";

export type Pilot = Database["public"]["Tables"]["pilots"]["Row"];
export type Document = Database["public"]["Tables"]["documents"]["Row"];
export type DocumentCategory = Database["public"]["Enums"]["document_category"];