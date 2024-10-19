"use client";

import { AuthWrapper } from "@/components/auth/auth-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { requestResetEmail } from "./actions";
import Link from "next/link";
import { useCallback, useEffect } from "react";
import { toast } from "sonner";

interface Props {
  searchParams: {
    redirect?: string;
  };
}

export default function ForgotPasswordPage(props: Props) {
  const redirect = props.searchParams.redirect;

  const doSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const data = new FormData(e.target as HTMLFormElement);
      const email = data.get("email") as string;

      if (!email) {
        toast.error("Please fill in all fields");
        return;
      }

      const { error } = await requestResetEmail({
        email,
        origin: window.location.origin,
      });

      if (error) {
        toast.error(error.message);
        console.error(error);
        return;
      }

      toast.success("We have sent you an email with a link to reset your password");
    },
    []
  );

  return (
    <AuthWrapper title="Reset your password">
      <form className="space-y-4" onSubmit={doSubmit}>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" required type="email" />
        </div>
        <Button className="w-full" type="submit">
          Reset Password
        </Button>
      </form>

      <div className="flex items-center justify-between">
        <Link href={`/auth/login?redirect=${redirect}`}>
          <Button
            variant="ghost"
            className="text-sm font-medium text-gray-900 hover:underline dark:text-gray-50"
          >
            Back to Login
          </Button>
        </Link>
      </div>
    </AuthWrapper>
  );
}
