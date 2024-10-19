"use client";

import { AuthWrapper } from "@/components/auth/auth-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { changePassword } from "./actions";
import { useCallback, useEffect } from "react";
import { toast } from "sonner";

export default function ChangePasswordPage() {
  const doChangePassword = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const data = new FormData(e.target as HTMLFormElement);
      const password = data.get("password") as string;

      if (!password) {
        toast.error("Please fill in all fields");
        return;
      }

      const { error } = await changePassword({
        password,
      });

      if (error) {
        toast.error(error.message);
        console.error(error);
        return;
      }

      toast.success(
        "We have sent you an email with a link to reset your password"
      );
      window.location.href = "/";
    },
    []
  );

  return (
    <AuthWrapper title="Reset your password">
      <form className="space-y-4" onSubmit={doChangePassword}>
        <div>
          <Label htmlFor="password">New Password</Label>
          <Input id="password" name="password" required type="password" />
        </div>
        <Button className="w-full" type="submit">
          Change Password
        </Button>
      </form>
    </AuthWrapper>
  );
}
