"use client";

import { usePathname } from "next/navigation";
import { useCallback } from "react";

export function usePathnameIsActive() {
  const actualPathname = usePathname();

  const pathnameIsActive = useCallback(
    (givenPathname: string, exact = false) => {
      if (exact) {
        return actualPathname === givenPathname;
      }

      return actualPathname.startsWith(givenPathname);
    },
    [actualPathname]
  );

  return pathnameIsActive;
}
