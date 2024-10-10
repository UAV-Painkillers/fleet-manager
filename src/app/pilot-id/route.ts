import { getSupabaseServerClient } from "@/lib/supabase.server";
import { customAlphabet } from "nanoid";
import { redirect } from "next/navigation";
import type { Pilot } from "@/types/supabase-custom";

function randomShareHandle() {
  // use nanoid to generate a random 6 character string from capital letters and numbers
  const idGenerator = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 6);
  return idGenerator();
}

async function createNewProfile(userId: string) {
  console.log('create new profile', userId);
  const newShareHandle = randomShareHandle();

  const supabase = getSupabaseServerClient();
  const { error, data } = await supabase
    .from("pilots")
    .insert({
      user_id: userId,
      share_handle: newShareHandle,
    })
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  if (!data) {
    throw new Error("Could not create new profile");
  }

  return data;
}

async function fetchPilotProfile(userId: string) {
  console.log('fetch profile', userId);
  const supabase = getSupabaseServerClient();

  const { data, error } = await supabase
    .from("pilots")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) {
    if (error?.details === "The result contains 0 rows") {
      return false;
    }

    throw error;
  }

  return data;
}

export async function GET() {
  console.log('GET');
  const supabase = getSupabaseServerClient();

  const {data, error} = await supabase.auth.getUser();
  if (error) {
    console.error(error);
    throw error;
  }

  let pilot = await fetchPilotProfile(data.user.id);

  if (!pilot) {
    pilot = await createNewProfile(data.user.id);
  }

  console.log('done');
  redirect(`/p/${pilot.share_handle}`);
}
