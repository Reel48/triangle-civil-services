import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { CtaSection } from "@/components/site/cta-section";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { services } from "@/content/services";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.summary,
  };
}

export default function ServicePage({
  params,
}: {
  params: { slug: string };
}) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) notFound();
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <PageHero eyebrow="Services" title={service.title} lead={service.summary}>
        <ButtonLink href="/request-a-quote" size="lg">
          Request a quote for this scope
        </ButtonLink>
      </PageHero>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="max-w-prose">
            <p className="text-lg text-concrete-700">{service.description}</p>
            <h2 className="font-display mt-10 text-xl font-semibold text-concrete-900">
              Scope highlights
            </h2>
            <ul className="mt-4 space-y-2.5">
              {service.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-concrete-700">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent-600" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <aside className="h-fit rounded-lg border border-concrete-200 bg-concrete-50 p-6">
            <p className="font-display text-lg font-semibold text-concrete-900">
              Other services
            </p>
            <ul className="mt-4 space-y-2.5">
              {others.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="inline-flex items-center gap-1.5 text-concrete-700 hover:text-accent-600"
                  >
                    {s.title}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t border-concrete-200 pt-4">
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-600 hover:text-accent-700"
              >
                All services <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
      </Section>

      <CtaSection />
    </>
  );
}
