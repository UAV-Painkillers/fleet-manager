"use server";

import { Combobox } from "@/components/combobox";
import { getSupabaseServerClient } from "@/lib/supabase.server";
import { Frame } from "@/types/supabase-custom";

interface Props {
  onValueChange: (frameId: Frame["id"]) => void;
  value: Frame["id"] | null;
}

async function fetchFrames() {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("frames")
    .select("*, manufacturer:manufacturer_id (*)")
    .order("name", { ascending: true })
    .order("name", { ascending: true, referencedTable: "manufacturer" });

  if (error) {
    // TODO: handle error
    console.error(error);
    return;
  }

  return data ?? [];
};

function getFrameName(frame: Frame) {
  if (!frame.manufacturer) {
    return frame.name;
  }

  return `${frame.manufacturer.name} ${frame.name}`;
}

export async function FrameSelect(props: Props) {
  const frames = await fetchFrames();

  return (
    <Combobox
      label="Frame"
      options={frames.map((f) => ({
        value: String(f.id),
        label: getFrameName(f),
      }))}
      value={String(props.value)}
      name="frame"
    />
  );
}
