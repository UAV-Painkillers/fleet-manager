"use client";

import { PartialPilot } from "@/components/pilot-id/pilot-id-card";
import { getSupabase } from "@/lib/supabase";
import { useAuth } from "@/store/auth";
import { customAlphabet } from "nanoid";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import useSWR from "swr";

async function pilotProfileFetcher(userId: string): Promise<PartialPilot> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("pilots")
    .select("*")
    .eq("user_id", userId)
    .returns<PartialPilot>()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

function randomShareHandle() {
  // use nanoid to generate a random 6 character string from capital letters and numbers
  const idGenerator = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 6);
  return idGenerator();
}

export default function PilotIdPage() {
  const { session } = useAuth();
  const router = useRouter();

  const {
    data: pilot,
    error: pilotFetchError,
    isLoading,
  } = useSWR(session?.user.id, pilotProfileFetcher);

  const fetchState = useMemo(() => {
    if (isLoading) {
      return "loading";
    }

    if (pilotFetchError?.details === "The result contains 0 rows") {
      return "no_profile";
    }

    if (pilotFetchError) {
      return "error";
    }

    return "success";
  }, [isLoading, pilotFetchError]);

  useEffect(() => {
    if (fetchState !== "success") {
      return;
    }

    router.push(`/p/${pilot!.share_handle}`);
  }, [fetchState, pilot, router, session]);

  useEffect(() => {
    if (fetchState !== "no_profile") {
      return;
    }

    const newShareHandle = randomShareHandle();
    const supabase = getSupabase();
    supabase
      .from("pilots")
      .insert({
        user_id: session?.user.id,
        share_handle: newShareHandle,
      })
      .then(({ error }) => {
        if (error) {
          throw error;
        }

        router.push(`/p/${newShareHandle}`);
      });
  }, [fetchState, router, session?.user.id]);

  if (!session) {
    return <div>Please log in to see your profile</div>;
  }

  if (fetchState === "error") {
    return (
      <div>
        Oh no! We failed to load your pilot profile.
        <b>{pilotFetchError.message}</b>
      </div>
    );
  }

  if (fetchState === "no_profile") {
    // TODO: create empty profile
    return <div>No profile</div>;
  }

  return <div>Please wait... you will be redirected to your profile</div>;
}
