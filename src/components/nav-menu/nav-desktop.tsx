"use client";

import Link from "next/link";
import { useNavTabs } from "../../hooks/use-nav-tabs";
import { cn } from "@/lib/utils";
import { NavProps } from "./nav-props";

export function NavDesktop(props: NavProps) {
  const { tabs } = useNavTabs(props.isAuthenticated);

  const linkClassName =
    "text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 px-3 py-2 rounded-md";

  const activeClassname =
    "text-gray-900 dark:text-gray-50 bg-gray-100 dark:bg-gray-800/30";
  const inActiveClassname =
    "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50";

  return (
    <nav className="hidden lg:flex gap-4 sm:gap-6">
      {props.isAuthenticated &&
        tabs.map((tab) => (
          <Link
            key={tab.pathname}
            href={tab.pathname}
            className={cn(
              linkClassName,
              tab.isActive ? activeClassname : inActiveClassname
            )}
            prefetch={false}
          >
            {tab.label}
          </Link>
        ))}

      <Link
        className={cn(
          linkClassName,
          props.isAuthenticated ? inActiveClassname : activeClassname
        )}
        href={props.isAuthenticated ? "/auth/logout" : "/auth/login"}
      >
        {props.isAuthenticated && "Log out"}
        {!props.isAuthenticated && "Log in"}
      </Link>
    </nav>
  );
}
