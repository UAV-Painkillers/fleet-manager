"use client";

import { ShareButton, ShareButtonProps } from "@/components/share-button";
import { usePilotShareURL } from "./use-pilot-share-url";

interface Props {
  shareHandle: string;
}

export type PilotShareButtonProps = Props & Omit<ShareButtonProps, "text">;

export function PilotShareButton(props: PilotShareButtonProps) {
  const { shareHandle, ...rest } = props;

  const pilotShareURL = usePilotShareURL(shareHandle);

  return <ShareButton {...rest} text={pilotShareURL} />;
}
