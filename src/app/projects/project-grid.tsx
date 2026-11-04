"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { markets, projects, type ProjectMarket } from "@/content/projects";

// Only offer filters that will return something.
const marketsWithProjects = markets.filter((m) =>
  projects.some((p) => p.market === m),
);

export function ProjectGrid() {
  const [filter, setFilter] = useState<ProjectMarket | "All">("All");

  const visible = useMemo(
    () =>
      filter === "All" ? projects : projects.filter((p) => p.market === filter),
    [filter],
  );

  return (
    <>
      <div
        role="group"
        aria-label="Filter projects by market"
        className="flex flex-wrap gap-2"
      >
        <FilterPill active={filter === "All"} onClick={() => setFilter("All")}>
          All
        </FilterPill>
        {marketsWithProjects.map((m) => (
          <FilterPill
            key={m}
            active={filter === m}
            onClick={() => setFilter(m)}
          >
            {m}
          </FilterPill>
        ))}
      </div>

      <p className="sr-only" role="status">
        {`Showing ${visible.length} ${visible.length === 1 ? "project" : "projects"}${
          filter === "All" ? "" : ` in ${filter}`
        }`}
      </p>

      <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/projects/${p.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-lg border border-concrete-200 bg-white transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-[4/3] bg-concrete-100">
                {p.image ? (
                  <Image
                    src={p.image}
                    alt={p.imageAlt ?? p.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, var(--color-concrete-300) 0%, var(--color-concrete-500) 100%)",
                    }}
                  />
                )}
                <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold tracking-wider text-concrete-800 uppercase">
                  {p.market}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h2 className="font-display text-lg font-semibold text-concrete-900">
                  {p.title}
                </h2>
                <p className="mt-1 text-sm text-concrete-500">
                  {p.location} · {p.year}
                </p>
                <p className="mt-3 flex-1 text-concrete-600">
                  {p.scopeSummary}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-600 group-hover:text-accent-700">
                  View project <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500",
        active
          ? "border-concrete-900 bg-concrete-900 text-white"
          : "border-concrete-200 bg-white text-concrete-700 hover:border-concrete-300",
      )}
    >
      {children}
    </button>
  );
}
