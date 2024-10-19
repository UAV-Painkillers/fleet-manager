"use client";

import Link from "next/link";
import { useNavTabs } from "../../hooks/use-nav-tabs";
import { cn } from "@/lib/utils";
import { NavProps } from "./nav-props";
import { Button } from "../ui/button.extended";
import { LogInIcon, LogOutIcon } from "lucide-react";

export function NavMobile(props: NavProps) {
  const { tabs } = useNavTabs(props.isAuthenticated);

  const linkClassName =
    "flex-1 flex flex-col items-center gap-1 text-sm font-medium transition-colors bg-gray-100 dark:bg-gray-800 py-2";
  const activeClassName =
    "bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-50";
  const inActiveClassname =
    "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50";

  return (
    <nav className="bg-white border-t dark:bg-gray-950 dark:border-gray-800 lg:hidden sticky bottom-0 z-10">
      <div className="flex justify-between items-center h-14 flex-1">
        {props.isAuthenticated &&
          tabs.map((tab) => (
            <Link
              key={tab.pathname}
              href={tab.pathname}
              className={cn(
                linkClassName,
                tab.isActive ? activeClassName : inActiveClassname
              )}
              prefetch={false}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </Link>
          ))}
        <Link
          className={cn(
            linkClassName,
            props.isAuthenticated ? inActiveClassname : activeClassName
          )}
          href={props.isAuthenticated ? "/auth/logout" : "/auth/login"}
        >
          {props.isAuthenticated && (
            <>
              <LogOutIcon className="w-5 h-5" /> Log out
            </>
          )}
          {!props.isAuthenticated && (
            <>
              <LogInIcon className="w-5 h-5" /> Log in
            </>
          )}
        </Link>
      </div>
    </nav>
  );
}
