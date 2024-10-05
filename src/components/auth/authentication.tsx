"use client";

import { useEffect, useState } from "react";
import { Registration } from "./registration";
import { Login } from "./login";
import { getSupabase } from "@/lib/supabase";
import { useAuth } from "@/store/auth";
import { FakeProgress } from "../ui/fake-progress";

type AuthenticationProviderProps = React.PropsWithChildren & {
  childrenNeedsToBeAuthenticated?: boolean;
  childrenRequireAuthentication?: boolean;
};
export function AuthenticationProvider(props: AuthenticationProviderProps) {
  const [wantsToLogin, setWantsToLogin] = useState(true);
  const [supabase] = useState(getSupabase());

  const { setSession, session } = useAuth((state) => ({
    setSession: state.setSession,
    session: state.session,
  }));

  const [isFetchingSession, setIsFetchingSession] = useState(true);

  useEffect(() => {
    setIsFetchingSession(true);
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsFetchingSession(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsFetchingSession(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase, setSession]);

  if (session) {
    return props.children;
  }

  if (props.childrenRequireAuthentication === false) {
    return props.children;
  }

  if (isFetchingSession) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <FakeProgress />
        <p className="mt-4 text-sm text-muted-foreground">
          Loading your session...
        </p>
      </div>
    );
  }

  if (wantsToLogin) {
    return <Login onWantsToRegister={() => setWantsToLogin(false)} />;
  }

  return <Registration onWantsToLogin={() => setWantsToLogin(true)} />;
}
