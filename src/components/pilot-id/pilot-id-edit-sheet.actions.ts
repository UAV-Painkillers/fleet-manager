"use server";

import { getSupabaseServerClient } from "@/lib/supabase.server";
import { Pilot } from "@/types/supabase-custom";

export interface PilotIdUpdateProps {
  name: Pilot["name"];
  nickname: Pilot["nickname"];
  bio: Pilot["bio"];
  logoHref: Pilot["logoHref"];
  bannerHref: Pilot["bannerHref"];
  tiktok_handle: Pilot["tiktok_handle"];
  youtube_handle: Pilot["youtube_handle"];
  instagram_handle: Pilot["instagram_handle"];
  contact_phone: Pilot["contact_phone"];
  contact_email: Pilot["contact_email"];
  contact_website: Pilot["contact_website"];
  facebook_handle: Pilot["facebook_handle"];
}

export async function updatePilotIdAction(
  changeSet: Partial<PilotIdUpdateProps>
) {
  const supabase = getSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "NOT_AUTHENTICATED" };
  }

  const { error, data } = await supabase
    .from("pilots")
    .update({
      name: changeSet.name,
      nickname: changeSet.nickname,
      bio: changeSet.bio,
      logoHref: changeSet.logoHref,
      bannerHref: changeSet.bannerHref,
      tiktok_handle: changeSet.tiktok_handle,
      youtube_handle: changeSet.youtube_handle,
      instagram_handle: changeSet.instagram_handle,
      contact_phone: changeSet.contact_phone,
      contact_email: changeSet.contact_email,
      contact_website: changeSet.contact_website,
      facebook_handle: changeSet.facebook_handle,
    })
    .eq("user_id", user.id)
    .select("*");

  if (error) {
    return { error };
  }

  if (data.length !== 1) {
    console.error(
      "Expected 1 result from pilot-id update query, got",
      data.length,
      data
    );
    return { error: "UNEXPECTED_RESULT" };
  }

  return { data: data[0] };
}
