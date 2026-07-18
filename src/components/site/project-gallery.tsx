"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { cn } from "@/lib/cn";
import type { ProjectImage } from "@/content/projects";

export function ProjectGallery({ gallery }: { gallery: ProjectImage[] }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const count = gallery.length;
  const hasMultiple = count > 1;
  const current = gallery[active];

  const openAt = useCallback((i: number, trigger: HTMLElement | null) => {
    setActive(i);
    triggerRef.current = trigger;
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  const next = useCallback(() => setActive((i) => (i + 1) % count), [count]);
  const prev = useCallback(
    () => setActive((i) => (i - 1 + count) % count),
    [count]
  );

  // Lock body scroll and move focus into the dialog while the lightbox is open.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "ArrowRight" && hasMultiple) {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft" && hasMultiple) {
        e.preventDefault();
        prev();
      } else if (e.key === "Tab") {
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          "button, [href], [tabindex]:not([tabindex=\"-1\"])"
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [close, next, prev, hasMultiple]
  );

  return (
    <div>
      {/* Main image — click to enlarge */}
      <button
        type="button"
        onClick={(e) => openAt(active, e.currentTarget)}
        aria-label={`Enlarge photo: ${current.alt}`}
        className="group relative block aspect-[16/9] w-full cursor-zoom-in overflow-hidden rounded-lg bg-concrete-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
      >
        <Image
          src={current.src}
          alt={current.alt}
          fill
          sizes="(min-width: 1024px) 75vw, 100vw"
          priority
          className="object-cover transition duration-300 group-hover:scale-[1.02]"
        />
        <span className="pointer-events-none absolute right-4 bottom-4 inline-flex items-center gap-1.5 rounded-full bg-concrete-900/70 px-3 py-1.5 text-xs font-medium text-white opacity-0 transition group-hover:opacity-100">
          <ZoomIn className="h-4 w-4" /> Expand
        </span>
        {hasMultiple ? (
          <span className="pointer-events-none absolute top-4 right-4 rounded-full bg-concrete-900/70 px-3 py-1 text-xs font-medium text-white tabular-nums">
            {active + 1} / {count}
          </span>
        ) : null}
      </button>

      {/* Thumbnails */}
      {hasMultiple ? (
        <ul className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6">
          {gallery.map((img, i) => (
            <li key={img.src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`View photo ${i + 1}: ${img.alt}`}
                aria-current={i === active ? "true" : undefined}
                className={cn(
                  "relative block aspect-[4/3] w-full overflow-hidden rounded-md bg-concrete-100 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500",
                  i === active
                    ? "ring-2 ring-accent-500 ring-offset-1"
                    : "opacity-75 hover:opacity-100"
                )}
              >
                <Image
                  src={img.src}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 16vw, 25vw"
                  className="object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      {/* Lightbox */}
      {open ? (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Project photo gallery"
          onKeyDown={onKeyDown}
          onClick={close}
          className="fixed inset-0 z-50 flex items-center justify-center bg-concrete-900/90 p-4 backdrop-blur-sm sm:p-8"
        >
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Close gallery"
            className="absolute top-4 right-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <X className="h-6 w-6" />
          </button>

          {hasMultiple ? (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label="Previous photo"
                className="absolute left-2 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:left-4"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label="Next photo"
                className="absolute right-2 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-4"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          ) : null}

          <figure
            onClick={(e) => e.stopPropagation()}
            className="flex w-full max-w-5xl flex-col items-center"
          >
            <div className="relative h-[72vh] w-full">
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
            <figcaption className="mt-4 max-w-2xl text-center text-sm text-concrete-200">
              {current.alt}
              {hasMultiple ? (
                <span className="ml-2 text-concrete-400 tabular-nums">
                  ({active + 1} / {count})
                </span>
              ) : null}
            </figcaption>
          </figure>
        </div>
      ) : null}
    </div>
  );
}
