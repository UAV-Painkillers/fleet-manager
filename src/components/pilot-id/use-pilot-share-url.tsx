'use client';

import { useMemo } from "react";

export function usePilotShareURL(shareHandle: string) {
  return useMemo(() => {
    // current host + /p/[shareHandle]
    return `${window.location.origin}/p/${shareHandle}`;
  }, [shareHandle]);
}