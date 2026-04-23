import Image from "next/image";
import Link from "next/link";
import { ArrowRight, HardHat, ShieldCheck, Truck } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { CtaSection } from "@/components/site/cta-section";
import { Section, SectionHeader } from "@/components/site/section";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { site } from "@/lib/site";

export default function HomePage() {
  const featured = projects.filter((p) => p.featured);
  return (
    <>
      <Hero />
      <ClientStrip />
      <ServicesPreview />
      <StatsBand />
      <FeaturedProjects featured={featured} />
      <SafetyPreview />
      <CtaSection />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-concrete-900 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(1200px 500px at 80% -10%, rgba(242,230,7,0.18), transparent), radial-gradient(800px 400px at 10% 120%, rgba(45,49,155,0.35), transparent)",
        }}
      />
      <div className="container-page relative grid gap-10 py-16 md:py-28 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:py-32">
        <div>
          <p className="mb-4 text-xs font-semibold tracking-[0.24em] text-accent-400 uppercase">
            Beaumont, TX · Serving TX & LA since {site.founded}
          </p>
          <h1 className="font-display max-w-3xl text-4xl leading-[1.02] font-semibold sm:text-5xl md:text-6xl lg:text-7xl">
            Heavy civil and concrete, self-performed.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-concrete-200 md:text-xl">
            From refinery foundations to institutional builds and stormwater
            infrastructure — we pour {site.concreteYardsPerYear.toLocaleString()} yards
            of concrete and move over a million yards of dirt every year.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/request-a-quote" variant="cta" size="lg">
              Request a quote
            </ButtonLink>
            <ButtonLink
              href="/projects"
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10"
            >
              See our work
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </div>
        <dl className="grid grid-cols-2 gap-6 border-t border-white/20 pt-10 text-sm lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
          <Stat label="Employees" value={`${site.headcount}+`} />
          <Stat label="Year founded" value={site.founded.toString()} />
          <Stat
            label="Concrete / yr"
            value={`${(site.concreteYardsPerYear / 1000).toFixed(0)}k yd³`}
          />
          <Stat
            label="Earthwork / yr"
            value={`${(site.dirtYardsPerYear / 1_000_000).toFixed(1)}M yd³`}
          />
        </dl>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-medium tracking-[0.18em] text-concrete-300 uppercase">
        {label}
      </dt>
      <dd className="font-display mt-1 text-3xl font-semibold text-white tabular-nums md:text-4xl">
        {value}
      </dd>
    </div>
  );
}

function ClientStrip() {
  return (
    <section className="border-b border-concrete-100 bg-white py-10">
      <div className="container-page">
        <p className="text-center text-xs font-semibold tracking-[0.2em] text-concrete-500 uppercase">
          Trusted by industrial, commercial, and institutional clients
        </p>
        <ul className="mt-8 grid grid-cols-2 items-center gap-x-8 gap-y-10 md:grid-cols-3 lg:grid-cols-6">
          {site.majorClients.map((client) => (
            <li
              key={client.name}
              className="flex items-center justify-center"
            >
              <div className="relative h-12 w-[110px] sm:h-14 sm:w-[140px]">
                <Image
                  src={client.logo}
                  alt={`${client.name} logo`}
                  fill
                  sizes="140px"
                  className="object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ServicesPreview() {
  return (
    <Section>
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <SectionHeader
          eyebrow="What we do"
          title="Self-performed concrete and civil scopes"
          lead="We keep the schedule in-house. Our crews run everything from drilled shafts to elevated structural concrete, storm drainage, and mass earthwork."
        />
        <ButtonLink href="/services" variant="outline" size="md">
          All services
          <ArrowRight className="h-4 w-4" />
        </ButtonLink>
      </div>
      <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <li key={s.slug}>
            <Link
              href={`/services/${s.slug}`}
              className="group flex h-full flex-col rounded-lg border border-concrete-200 bg-white p-6 transition-shadow hover:shadow-md"
            >
              <p className="font-display text-xl font-semibold text-concrete-900">
                {s.title}
              </p>
              <p className="mt-2 flex-1 text-concrete-500">{s.summary}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-600 group-hover:text-accent-700">
                Learn more <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function StatsBand() {
  const items = [
    {
      icon: HardHat,
      title: "Self-perform crews",
      body: `${site.headcount} employees, scaling to ${site.capacity} depending on workload — no subcontracting the critical path.`,
    },
    {
      icon: Truck,
      title: "Fleet and equipment",
      body: "Owned heavy equipment for earthwork, concrete placement, and drilled foundations keeps us nimble on schedule.",
    },
    {
      icon: ShieldCheck,
      title: "Safety programs",
      body: `Enrolled in ${site.safetyPrograms.join(", ")} — prequalified for industrial and petrochem work.`,
    },
  ];
  return (
    <Section tone="subtle">
      <ul className="grid gap-8 md:grid-cols-3">
        {items.map(({ icon: Icon, title, body }) => (
          <li key={title} className="flex flex-col">
            <Icon className="h-8 w-8 text-accent-600" />
            <p className="font-display mt-4 text-xl font-semibold text-concrete-900">
              {title}
            </p>
            <p className="mt-2 text-concrete-500">{body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function FeaturedProjects({ featured }: { featured: typeof projects }) {
  return (
    <Section>
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <SectionHeader
          eyebrow="Recent work"
          title="Select projects"
          lead="A snapshot of recent concrete and civil packages across the Gulf Coast."
        />
        <ButtonLink href="/projects" variant="outline" size="md">
          All projects
          <ArrowRight className="h-4 w-4" />
        </ButtonLink>
      </div>
      <ul className="mt-12 grid gap-6 md:grid-cols-2">
        {featured.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/projects/${p.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-lg border border-concrete-200 bg-white transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-[16/9] bg-concrete-100">
                {p.image ? (
                  <Image
                    src={p.image}
                    alt={p.imageAlt ?? p.title}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
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
    </Section>
  );
}

function SafetyPreview() {
  return (
    <Section tone="subtle">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div>
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-accent-600 uppercase">
            Safety
          </p>
          <h2 className="font-display text-3xl font-semibold text-concrete-900 md:text-5xl">
            Built to work inside a plant fence.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-concrete-600">
            Our safety program is built around the prequalification standards
            of the petrochemical and industrial clients we serve — regularly
            audited, constantly improved, and owned by every crew member.
          </p>
          <div className="mt-8">
            <ButtonLink href="/safety" size="lg">
              Safety program <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </div>
        <div className="rounded-lg border border-concrete-200 bg-white p-6">
          <p className="text-xs font-semibold tracking-[0.2em] text-concrete-500 uppercase">
            Prequalification
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-2">
            {site.safetyPrograms.map((p) => (
              <li
                key={p}
                className="flex items-center gap-2 rounded-md border border-concrete-200 bg-white px-3 py-2 text-sm font-medium text-concrete-800"
              >
                <ShieldCheck className="h-4 w-4 shrink-0 text-accent-600" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
