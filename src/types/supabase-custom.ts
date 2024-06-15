import { Database } from "./supabase";

export type Pilot = Database["public"]["Tables"]["pilots"]["Row"];
