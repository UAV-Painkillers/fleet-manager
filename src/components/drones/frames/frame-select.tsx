"use server";

import { Combobox } from "@/components/combobox";
import { getSupabaseServerClient } from "@/lib/supabase.server";
import { Frame } from "@/types/supabase-custom";
import {toast} from 'sonner'
interface Props {
  onValueChange?: (frameId: Frame["id"]) => void;
  value?: Frame["id"] | null;
}

async function fetchFrames(): Promise<Partial<{frames: Frame[], error: Error}>> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("frames")
    .select("*, manufacturer:manufacturer_id (*)")
    .order("name", { ascending: true })
    .order("name", { ascending: true, referencedTable: "manufacturer" });

  if (error) {
    // TODO: handle error
    console.error(error);
    return {error};
  }

  return {frames: data ?? []};
};

function getFrameName(frame: Frame) {
  if (!frame.manufacturer) {
    return frame.name;
  }

  return `${frame.manufacturer.name} ${frame.name}`;
}

export async function FrameSelect(props: Props) {
  const {error, frames} = await fetchFrames();

  const options = (frames ?? []).map((f) => ({
    value: String(f.id),
    label: getFrameName(f),
  }));

  if (error) {
    options.push({
      value: '',
      label: 'Could not load frames...',
    });

    toast.error('Error loading frames: ' + error.message);
  }

  return (
    <Combobox
      label="Frame"
      options={options}
      value={String(props.value)}
      name="frame"
    />
  );
}
