"use client";

import { useQRCode } from "next-qrcode";

export function QRCode({ text, options }: { text: string; options?: any }) {
  const { SVG: SVGQRCode } = useQRCode();

  return <SVGQRCode text={text} options={options} />;
}
