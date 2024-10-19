"use server";

import { getSupabaseServerClient } from "@/lib/supabase.server";
import {
  Drone,
  Frame,
  FullDroneSelectStatement,
} from "@/types/supabase-custom";
import { AuthSessionMissingError } from "@supabase/supabase-js";

interface CreateDroneProps {
  imagePath?: string;
  nickname: string;
  frameId: Frame["id"];
}

export async function createDroneAction(droneData: CreateDroneProps) {
  const supabase = getSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: new AuthSessionMissingError() };
  }

  const { data, error } = await supabase
    .from("drones")
    .insert({
      nickname: droneData.nickname,
      user_id: user.id,
      frame_id: droneData.frameId,
      image: droneData.imagePath,
    } as Partial<Drone>)
    .select(FullDroneSelectStatement)
    .single();

  return {
    error,
    drone: data,
  };
}
