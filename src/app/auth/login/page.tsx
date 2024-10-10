import { AuthWrapper } from "@/components/auth/auth-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login, redirectToPasswordReset, redirectToRegister } from "./actions";

export default function LoginPage() {
  return (
    <AuthWrapper title="Sign in to your account">
      <form className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" name="email" required />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" name="password" required />
        </div>
        <Button className="w-full" formAction={login}>
          Sign in
        </Button>
      </form>

      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          className="text-sm font-medium text-gray-900 hover:underline dark:text-gray-50"
          formAction={redirectToPasswordReset}
        >
          Forgot password?
        </Button>
        <Button
          variant="ghost"
          className="text-sm font-medium text-gray-900 hover:underline dark:text-gray-50"
          formAction={redirectToRegister}
        >
          Create an account
        </Button>
      </div>
    </AuthWrapper>
  );
}
