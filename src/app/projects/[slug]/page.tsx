import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { CtaSection } from "@/components/site/cta-section";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { projects } from "@/content/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.scopeSummary,
  };
}

export default function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  return (
    <>
      <PageHero
        eyebrow={`${project.market} · ${project.year}`}
        title={project.title}
        lead={project.scopeSummary}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="max-w-prose">
            <div
              className="aspect-[16/9] w-full rounded-lg"
              aria-hidden
              style={{
                backgroundImage:
                  "linear-gradient(135deg, var(--color-concrete-300) 0%, var(--color-concrete-600) 100%)",
              }}
            />
            <h2 className="font-display mt-10 text-2xl font-semibold text-concrete-900">
              Scope of work
            </h2>
            <ul className="mt-4 space-y-2.5">
              {project.scope.map((s) => (
                <li key={s} className="flex items-start gap-3 text-concrete-700">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent-600" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <aside className="h-fit rounded-lg border border-concrete-200 bg-concrete-50 p-6">
            <dl className="space-y-4 text-sm">
              <Detail label="Client" value={project.client} />
              <Detail label="Location" value={project.location} />
              <Detail label="Market" value={project.market} />
              <Detail label="Year" value={project.year.toString()} />
            </dl>
            <div className="mt-6 border-t border-concrete-200 pt-4">
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-600 hover:text-accent-700"
              >
                Back to projects <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
      </Section>

      <CtaSection />
    </>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold tracking-[0.18em] text-concrete-500 uppercase">
        {label}
      </dt>
      <dd className="mt-0.5 text-base text-concrete-800">{value}</dd>
    </div>
  );
}
