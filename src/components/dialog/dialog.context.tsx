import { createContext } from "react";

export type DialogType = "alert" | "confirm" | "prompt";

export type DialogContextType = {
  alert: (message: string) => Promise<void>;
  confirm: (message: string) => Promise<boolean>;
  prompt: (message: string, defaultValue?: string) => Promise<string | null>;
};

export const DialogContext = createContext<DialogContextType | undefined>(
  undefined
);
