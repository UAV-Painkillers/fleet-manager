import { AuthWrapper } from "@/components/auth/auth-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { redirectToLogin, submit } from "./actions";

export default function ForgotPasswordPage() {
  return (
    <AuthWrapper title="Reset your password">
      <form className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" />
        </div>
        <Button className="w-full" formAction={submit}>
          Reset Password
        </Button>
      </form>
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          className="text-sm font-medium text-gray-900 hover:underline dark:text-gray-50"
          formAction={redirectToLogin}
        >
          Back to Login
        </Button>
      </div>
    </AuthWrapper>
  );
}
