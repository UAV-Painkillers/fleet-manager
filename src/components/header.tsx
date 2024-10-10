"use server";

import { MountainIcon } from "lucide-react";
import { NavDesktop } from "./nav-menu/nav-desktop";
import Link from "next/link";
import { getSupabaseServerClient } from "@/lib/supabase.server";

export async function Header() {
  const {
    data: { user },
  } = await getSupabaseServerClient().auth.getUser();
  const isAuthenticated = !!user;

  return (
    <header className="bg-white px-4 lg:px-6 h-14 flex items-center justify-between border-b dark:bg-gray-950 dark:border-gray-800 sticky top-0 z-10">
      <Link href="#" className="flex items-center" prefetch={false}>
        <MountainIcon className="w-6 h-6 text-gray-900 dark:text-gray-50" />
        <span className="sr-only">Fleet Manager</span>
      </Link>

      <div>
        <NavDesktop isAuthenticated={isAuthenticated} />
      </div>
    </header>
  );
}
