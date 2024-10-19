"use client";

import { AuthWrapper } from "@/components/auth/auth-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "./actions";
import Link from "next/link";
import { toast } from "sonner";
import { useCallback, useEffect, useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [redirect, setRedirect] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const redirectParam = searchParams.get("redirect");

    if (redirectParam) {
      setRedirect(redirectParam);
    }
  }, []);

  const doLogin = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const { error, success } = await login({
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
    [email, password, redirect]
  );

  return (
    <AuthWrapper title="Sign in to your account">
      <form className="space-y-4" onSubmit={doLogin}>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button className="w-full" type="submit">
          Sign in
        </Button>
      </form>

      <div className="flex items-center justify-between">
        <Link href={`/auth/forgot-password?redirect=${redirect}`}>
          <Button
            variant="ghost"
            className="text-sm font-medium text-gray-900 hover:underline dark:text-gray-50"
          >
            Forgot password?
          </Button>
        </Link>
        <Link href={`/auth/signup?redirect=${redirect}`}>
          <Button
            variant="ghost"
            className="text-sm font-medium text-gray-900 hover:underline dark:text-gray-50"
          >
            Create an account
          </Button>
        </Link>
      </div>
    </AuthWrapper>
  );
}
