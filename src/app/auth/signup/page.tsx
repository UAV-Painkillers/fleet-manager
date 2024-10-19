"use client";

import { AuthWrapper } from "@/components/auth/auth-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signup, redirectToLogin } from "./actions";
import Link from "next/link";
import { useCallback } from "react";
import { toast } from "sonner";

interface Props {
  searchParams: {
    redirect?: string;
  };
}

export default function SignupPage(props: Props) {
  const redirect = props.searchParams.redirect;

  const doSignUp = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const data = new FormData(e.target as HTMLFormElement);
      const email = data.get("email") as string;
      const password = data.get("password") as string;

      if (!email || !password) {
        toast.error("Please fill in all fields");
        return;
      }

      const { error, success } = await signup({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        console.error(error);
        return;
      }

      if (!success) {
        toast.error("Could not log in");
        return;
      }

      toast.success("You are now logged in");
      const newUrl = new URL(window.location.href);
      newUrl.pathname = redirect ?? "/"; 
      newUrl.searchParams.delete("redirect");
      window.location.href = newUrl.toString();
    },
    [redirect]
  );

  return (
    <AuthWrapper title="Create an account">
      <form className="space-y-4" onSubmit={doSignUp}>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required />
        </div>

        <Button className="w-full" type="submit">
          Create account
        </Button>
      </form>

      <div className="flex items-center justify-between">
        <Link href={`/auth/login?redirect=${redirect}`}>
          <Button
            variant="ghost"
            className="text-sm font-medium text-gray-900 hover:underline dark:text-gray-50"
          >
            Already have an account?
          </Button>
        </Link>
      </div>
    </AuthWrapper>
  );
}
