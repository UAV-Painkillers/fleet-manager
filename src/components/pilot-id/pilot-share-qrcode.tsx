"use client";

import { QRCode } from "@/components/qr-code";
import { usePilotShareURL } from "./use-pilot-share-url";

interface Props {
  shareHandle: string;
  width: number;
}

export function PilotShareQRCode(props: Props) {
  const pilotShareURL = usePilotShareURL(props.shareHandle);

  return pilotShareURL && <QRCode text={pilotShareURL} options={{ width: props.width }} />;
}
