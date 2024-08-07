"use client";

import { useEffect, useState } from "react";
import { Registration } from "./registration";
import { Login } from "./login";
import { getSupabase } from "@/lib/supabase";
import { useAuth } from "@/store/auth";

type AuthenticationProviderProps = React.PropsWithChildren & {
  childrenNeedsToBeAuthenticated?: boolean;
  childrenRequireAuthentication?: boolean;
}
export function AuthenticationProvider(props: AuthenticationProviderProps) {
  const [wantsToLogin, setWantsToLogin] = useState(true);
  const [supabase] = useState(getSupabase());

  const { setSession, session } = useAuth((state) => ({
    setSession: state.setSession,
    session: state.session,
  }));

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [supabase, setSession]);

  if (session) {
    return props.children;
  }

  if (props.childrenRequireAuthentication === false) {
    return props.children;
  }

  if (wantsToLogin) {
    return <Login onWantsToRegister={() => setWantsToLogin(false)} />;
  }

  return <Registration onWantsToLogin={() => setWantsToLogin(true)} />;
}
