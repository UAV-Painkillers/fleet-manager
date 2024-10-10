import { AuthWrapper } from "@/components/auth/auth-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signup, redirectToLogin } from "./actions";

export default function SignupPage() {
  return (
    <AuthWrapper title="Create an account">
      <form className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
          />
        </div>

        <Button
          className="w-full"
          type="submit"
          formAction={signup}
        >
          Create account
        </Button>
      </form>

      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          className="text-sm font-medium text-gray-900 hover:underline dark:text-gray-50"
          formAction={redirectToLogin}
        >
          Already have an account?
        </Button>
      </div>
    </AuthWrapper>
  );
}
