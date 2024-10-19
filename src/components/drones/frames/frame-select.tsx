"use client";

import { Combobox } from "@/components/combobox";
import { Frame } from "@/types/supabase-custom";
import { useEffect, useMemo, useState } from "react";
import { fetchFrames } from "./frame-select.actions";
import { PostgrestError } from "@supabase/supabase-js";

interface Props {
  onValueChange?: (frameId: Frame["id"] | null) => void;
  value?: Frame["id"] | null;
}

function getFrameName(frame: Frame) {
  if (!frame.manufacturer) {
    return frame.name;
  }

  return `${frame.manufacturer.name} ${frame.name}`;
}

export function FrameSelect(props: Props) {
  const [frames, setFrames] = useState<Frame[]>([]);
  const [error, setError] = useState<Error | PostgrestError | null>(null);
  const [selectedFrameId, setSelectedFrameId] = useState<Frame["id"] | null>(
    props.value ?? null
  );

  useEffect(() => {
    setSelectedFrameId(props.value ?? null);
  }, [props.value]);

  useEffect(() => {
    fetchFrames().then(({ frames, error }) => {
      setFrames(frames ?? []);
      setError(error ?? null);
    });
  }, []);

  const options = useMemo(() => {
    const items = (frames ?? []).map((f: Frame) => ({
      value: String(f.id),
      label: getFrameName(f),
    }));

    if (error) {
      items.push({
        value: "",
        label: "Could not load frames...",
      });
    }

    return items;
  }, [error, frames]);

  return (
    <Combobox
      label="Select a Frame"
      options={options}
      value={String(selectedFrameId)}
      onValueChange={(rawValue) => {
        let value: Frame["id"] | null;
        if (typeof rawValue === "string" && rawValue.length > 0) {
          value = parseInt(rawValue, 10);
        } else {
          value = null;
        }
        
        setSelectedFrameId(value);
        if (typeof props.onValueChange === "function") {
          props.onValueChange(value);
        }
      }}
      name="frame"
    />
  );
}
