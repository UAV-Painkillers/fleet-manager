"use client";

import Link from "next/link";
import { useNavTabs } from "../../hooks/use-nav-tabs";
import { cn } from "@/lib/utils";
import { useAuth } from "@/store/auth";

export function NavDesktop() {
  const { tabs } = useNavTabs();

  const { session } = useAuth();

  const linkClassName =
    "text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 px-3 py-2 rounded-md";

  return (
    <nav className="hidden lg:flex gap-4 sm:gap-6">
      {tabs.map((tab) => (
        <Link
          key={tab.pathname}
          href={tab.pathname}
          className={cn(
            linkClassName,
            tab.isActive
              ? "text-gray-900 dark:text-gray-50 bg-gray-100 dark:bg-gray-800/30"
              : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          )}
          prefetch={false}
        >
          {tab.label}
        </Link>
      ))}
      {/* Login Button */}
      {!session && (
        <Link href="/" className={linkClassName} prefetch={false}>
          Log in
        </Link>
      )}
    </nav>
  );
}
