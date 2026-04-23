import * as React from "react";
import { cn } from "@/lib/cn";

type Tone = "default" | "subtle" | "dark";

const tones: Record<Tone, string> = {
  default: "bg-white text-concrete-800",
  subtle: "bg-concrete-50 text-concrete-800",
  dark: "bg-concrete-900 text-white",
};

export function Section({
  tone = "default",
  className,
  children,
  id,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn("py-16 md:py-24", tones[tone], className)}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "light",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center"
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "mb-3 text-xs font-semibold tracking-[0.2em] uppercase",
            dark ? "text-accent-400" : "text-accent-600"
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "font-display text-3xl leading-[1.1] font-semibold md:text-5xl",
          dark ? "text-white" : "text-concrete-900"
        )}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={cn(
            "mt-4 text-lg md:text-xl",
            dark ? "text-concrete-200" : "text-concrete-500"
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
