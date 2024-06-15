"use client";

import {
  CircleAlertIcon,
  LoaderIcon,
  ShareIcon,
  ThumbsUpIcon,
} from "lucide-react";
import { Button, ButtonProps } from "./ui/button";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Props {
  text: string;
}

export type ShareButtonProps = Props & Omit<ButtonProps, "onClick">;

export function ShareButton(props: ShareButtonProps) {
  const { text, ...buttonProps } = props;

  // determine if the device supports the share API
  const [supportsShare, setSupportsShare] = useState(false);
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  useEffect(() => {
    setSupportsShare(typeof navigator.share === "function");
  }, []);

  const share = useCallback(async () => {
    if (!supportsShare) {
      setState("error");
      return;
    }

    try {
      setState("loading");
      await navigator.share({
        text,
      });
      setState("success");
      toast.success("🤞🏽 let's hope your're going viral!");
    } catch (error) {
      if ((error as Error)?.name === "AbortError") {
        return;
      }

      setState("error");

      toast.error("Oh no! Something went wrong while sharing your profile.");
      console.error("Error sharing:", error);
    } finally {
      if (state !== "error") {
        setState("idle");
      }
    }
  }, [text, supportsShare, setState, state]);

  if (!supportsShare) {
    return null;
  }

  return (
    <Button
      {...buttonProps}
      variant="ghost"
      size="icon"
      className={cn(
        buttonProps.className,
        "rounded-full bg-white dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 border-2 border-white dark:border-gray-900",
        state === "loading" && "animate-spin",
        state === "error" && "border-red-500",
        state === "success" && "border-green-500"
      )}
      onClick={share}
    >
      {state === "idle" && <ShareIcon className="w-6 h-6" />}
      {state === "loading" && <LoaderIcon className="w-6 h-6" />}
      {state === "error" && <CircleAlertIcon className="w-6 h-6" />}
      {state === "success" && <ThumbsUpIcon className="w-6 h-6" />}
      <span className="sr-only">Share</span>
    </Button>
  );
}
