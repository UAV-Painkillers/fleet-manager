"use client";

import { useEffect, useMemo, useState } from "react";

export function usePilotShareURL(shareHandle: string) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return useMemo(() => {
    if (!isClient) {
      return null;
    }

    // current host + /p/[shareHandle]
    return `${window.location.origin}/p/${shareHandle}`;
  }, [isClient, shareHandle]);
}
