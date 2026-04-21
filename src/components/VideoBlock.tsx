"use client";

import { useEffect, useRef } from "react";

type VideoBlockProps = {
  src: string;
  poster?: string;
  className?: string;
};

// Fills its parent (which must be `relative` with an aspect class). Autoplays
// muted/looped; respects prefers-reduced-motion by pausing.
export function VideoBlock({ src, poster, className = "" }: VideoBlockProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) v.pause();
  }, []);

  return (
    <video
      ref={ref}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={poster}
    >
      <source src={src} />
    </video>
  );
}
