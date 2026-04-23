import * as React from "react";
import { cn } from "@/lib/cn";

export function PageHero({
  eyebrow,
  title,
  lead,
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "border-b border-concrete-100 bg-concrete-50 py-12 md:py-24",
        className
      )}
    >
      <div className="container-page">
        {eyebrow ? (
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-accent-600 uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-display max-w-4xl text-4xl leading-[1.05] font-semibold text-concrete-900 sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {lead ? (
          <p className="mt-5 max-w-2xl text-lg text-concrete-500 md:text-xl">
            {lead}
          </p>
        ) : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}
