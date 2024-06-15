"use client";

import { useCallback, useState } from "react";
import { Button, ButtonProps } from "./button";
import { MaximizeIcon, MinimizeIcon } from "lucide-react";

export function MaximizeButton(
  props: Omit<ButtonProps, "onClick"> & {
    containerId: string;
  }
) {
  const { containerId, ...rest } = props;

  const [isFullscreen, setIsFullscreen] = useState(false);

  const maximize = useCallback(async () => {
    const container = document.getElementById(containerId);
    if (container) {
      await container.requestFullscreen({
        navigationUI: "show",
      });
      setIsFullscreen(true);
    }
  }, [containerId]);

  const minimize = useCallback(() => {
    document.exitFullscreen();
    setIsFullscreen(false);
  }, []);

  const onButtonClick = useCallback(() => {
    if (isFullscreen) {
      minimize();
    } else {
      maximize();
    }
  }, [isFullscreen, maximize, minimize]);

  return (
    <Button {...rest} onClick={onButtonClick}>
      {!isFullscreen && <MaximizeIcon className="w-4 h-4" />}
      {isFullscreen && <MinimizeIcon className="w-4 h-4" />}
      <span className="sr-only">Shrink</span>
    </Button>
  );
}
