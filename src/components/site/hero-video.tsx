"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type NavigatorWithConnection = Navigator & {
  connection?: { saveData?: boolean };
};

/**
 * Chosen in JS rather than with <source media>, which Safari ignores for
 * video. Phones only ever see a center slice of the frame, so they get a
 * pre-cropped 9:16 file: same framing, sharper, smaller.
 */
function pickSource(video: HTMLVideoElement) {
  if (window.matchMedia("(max-width: 767px)").matches) {
    return "/hero/canal-hero-mobile.mp4";
  }
  return video.canPlayType('video/webm; codecs="vp9"')
    ? "/hero/canal-hero-1080.webm"
    : "/hero/canal-hero-1080.mp4";
}

/**
 * Muted, looping background video for the home hero (the new-canal water
 * flow cut, built by scripts/build-hero-video.sh).
 *
 * It sits on top of the poster <Image> and only fades in once frames are
 * actually playing, so first paint / LCP is always the still. Visitors with
 * prefers-reduced-motion or Save-Data never download it and just keep the
 * poster. Playback pauses while the hero is scrolled out of view.
 */
export function HeroVideo({ className }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if ((navigator as NavigatorWithConnection).connection?.saveData) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = true;

    const sync = () => {
      if (reduceMotion.matches || !inView) {
        video.pause();
        return;
      }
      // Set lazily so nothing downloads until we actually intend to play.
      if (!video.getAttribute("src")) video.src = pickSource(video);
      // React doesn't reliably emit the `muted` attribute, and autoplay
      // policies require it, so set the property before playing.
      video.muted = true;
      video.play().catch(() => {
        // Autoplay refused (e.g. low-power mode): the poster stays up.
      });
    };

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    observer.observe(video);
    reduceMotion.addEventListener("change", sync);
    sync();

    return () => {
      observer.disconnect();
      reduceMotion.removeEventListener("change", sync);
      video.pause();
    };
  }, []);

  return (
    <video
      ref={ref}
      aria-hidden="true"
      tabIndex={-1}
      muted
      loop
      playsInline
      preload="none"
      disablePictureInPicture
      onPlaying={() => setPlaying(true)}
      className={cn(
        "pointer-events-none transition-opacity duration-700",
        playing ? "opacity-100" : "opacity-0",
        className
      )}
    />
  );
}
