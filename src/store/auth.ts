import { Session } from "@supabase/supabase-js";
import { create } from "zustand";

export interface AuthState {
  session: null | Session;
  setSession: (session: Session | null) => void;
}
export const useAuth = create<AuthState>((set) => ({
  session: null,
  setSession: (session: Session | null) => set({ session }),
}));
