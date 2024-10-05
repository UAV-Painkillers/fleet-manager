"use client";

import { useEffect, useState, useCallback } from "react";
import { Progress } from "@/components/ui/progress";

interface Props {
  minDuration?: number;
}

const FALLBACK_MIN_DURATION = 2000;

export function FakeProgress(props: Props) {
  const [progress, setProgress] = useState(0);

  const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);
  const minDuration = (props.minDuration ?? FALLBACK_MIN_DURATION);

  const updateProgress = useCallback((elapsedTime: number) => {
    if (elapsedTime <= minDuration) {
      // First 2 seconds: Harsh changes up to 90%
      const baseProgress = (elapsedTime / minDuration) * 90;
      const noise = Math.sin(elapsedTime * 0.02) * 5; // Add noise for harsh changes
      const adjustedProgress = Math.max(0, Math.min(90, baseProgress + noise));
      return easeOutCubic(adjustedProgress / 90) * 90;
    } else {
      // After 2 seconds: Slow progress from 90% to 100%
      const extraTime = elapsedTime - minDuration;
      const extraProgress = Math.min(10, (extraTime / 8000) * 10); // Takes about 8 more seconds to reach 100%
      return 90 + extraProgress;
    }
  }, [minDuration]);

  useEffect(() => {
    const startTime = Date.now();
    let animationFrameId: number;

    const animate = () => {
      const elapsedTime = Date.now() - startTime;
      const currentProgress = updateProgress(elapsedTime);
      setProgress(currentProgress);

      if (currentProgress < 100) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [updateProgress]);

  return <Progress value={progress} className="w-[60%] max-w-md" />;
}
