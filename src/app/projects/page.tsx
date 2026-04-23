"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { CtaSection } from "@/components/site/cta-section";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { cn } from "@/lib/cn";
import { markets, projects, type ProjectMarket } from "@/content/projects";

export default function ProjectsPage() {
  const [filter, setFilter] = useState<ProjectMarket | "All">("All");

  const visible = useMemo(
    () =>
      filter === "All" ? projects : projects.filter((p) => p.market === filter),
    [filter]
  );

  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Selected work."
        lead="A sample of concrete, civil, and stormwater projects across Texas and Louisiana."
      />

      <Section>
        <div className="flex flex-wrap gap-2">
          <FilterPill
            active={filter === "All"}
            onClick={() => setFilter("All")}
          >
            All
          </FilterPill>
          {markets.map((m) => (
            <FilterPill
              key={m}
              active={filter === m}
              onClick={() => setFilter(m)}
            >
              {m}
            </FilterPill>
          ))}
        </div>

        {visible.length === 0 ? (
          <p className="mt-12 text-concrete-500">
            No projects in this category yet.
          </p>
        ) : (
          <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/projects/${p.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-lg border border-concrete-200 bg-white transition-shadow hover:shadow-md"
                >
                  <div className="relative aspect-[4/3] bg-concrete-100">
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          "linear-gradient(135deg, var(--color-concrete-300) 0%, var(--color-concrete-500) 100%)",
                      }}
                    />
                    <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold tracking-wider text-concrete-800 uppercase">
                      {p.market}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="font-display text-lg font-semibold text-concrete-900">
                      {p.title}
                    </p>
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
        )}
      </Section>

      <CtaSection />
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
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
        active
          ? "border-concrete-900 bg-concrete-900 text-white"
          : "border-concrete-200 bg-white text-concrete-700 hover:border-concrete-300"
      )}
    >
      {children}
    </button>
  );
}
