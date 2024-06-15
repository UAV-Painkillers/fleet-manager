"use client";

import { CopyIcon } from "lucide-react";
import { Button, ButtonProps } from "./button";
import { useCallback } from "react";
import { toast } from "sonner";

export function CopyButton(
  props: Omit<ButtonProps, "onClick"> & {
    text: string;
  }
) {
  const { text, ...rest } = props;

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Text copied to clipboard");
    } catch (error) {
      console.error("Failed to copy text:", error);
      toast.error("Failed to copy text");
    }
  }, [text]);

  return (
    <Button {...rest} onClick={onCopy}>
      <CopyIcon className="w-4 h-4" />
      <span className="sr-only">Copy</span>
    </Button>
  );
}
