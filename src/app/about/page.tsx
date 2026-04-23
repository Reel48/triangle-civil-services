import { CtaSection } from "@/components/site/cta-section";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { site } from "@/lib/site";

export const metadata = {
  title: "About",
  description:
    "Founded in 2006, Triangle Concrete Services is a self-performing concrete and civil construction firm based in Beaumont, Texas.",
};

const timeline = [
  {
    year: "2006",
    title: "Founded in Beaumont, TX",
    body: "Triangle Concrete Services, Inc. opens with a focus on industrial and commercial concrete work across Southeast Texas.",
  },
  {
    year: "2018",
    title: "Triangle Civil Services launches",
    body: "The Triangle Civil Services d.b.a. expands scope beyond concrete into full heavy civil — earthwork, stormwater, and site infrastructure.",
  },
  {
    year: "Today",
    title: `${site.headcount}+ employees, ${site.capacity} at peak`,
    body: `Pouring ${site.concreteYardsPerYear.toLocaleString()} yd³ of concrete and moving more than a million yards of dirt every year across Texas and Louisiana.`,
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Two decades of self-performed concrete and civil work on the Gulf Coast."
        lead={`${site.legalName} has served industrial, commercial, and institutional clients since ${site.founded}. Our crews, equipment, and schedule are all in-house — so we own the outcome.`}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div className="max-w-prose text-concrete-700">
            <p className="text-lg">
              We started in Beaumont pouring concrete for industrial and
              commercial clients. Nearly two decades later we're a full
              heavy-civil contractor — still self-performing foundations,
              paving, drilled shafts, elevated structures, and stormwater work.
            </p>
            <p className="mt-4">
              Our reputation is built inside plant fences and on institutional
              campuses. Clients like {site.majorClients.slice(0, 3).join(", ")},{" "}
              and {site.majorClients[3]} trust us with the work because we
              prequalify, document, and deliver.
            </p>
          </div>
          <aside className="rounded-lg border border-concrete-200 bg-concrete-50 p-6">
            <p className="font-display text-lg font-semibold text-concrete-900">
              At a glance
            </p>
            <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <Fact label="Founded" value={site.founded.toString()} />
              <Fact label="Headquarters" value="Beaumont, TX" />
              <Fact label="Headcount" value={`${site.headcount}+`} />
              <Fact label="Peak capacity" value={site.capacity.toString()} />
              <Fact
                label="Concrete / yr"
                value={`${site.concreteYardsPerYear.toLocaleString()} yd³`}
              />
              <Fact
                label="Earthwork / yr"
                value={`${(site.dirtYardsPerYear / 1_000_000).toFixed(1)}M yd³`}
              />
            </dl>
          </aside>
        </div>
      </Section>

      <Section tone="subtle">
        <p className="text-xs font-semibold tracking-[0.2em] text-accent-600 uppercase">
          Timeline
        </p>
        <h2 className="font-display mt-3 text-3xl font-semibold text-concrete-900 md:text-5xl">
          How we got here.
        </h2>
        <ol className="mt-12 grid gap-8 md:grid-cols-3">
          {timeline.map((t) => (
            <li
              key={t.year}
              className="rounded-lg border border-concrete-200 bg-white p-6"
            >
              <p className="font-display text-accent-600 text-sm font-semibold tracking-[0.2em] uppercase">
                {t.year}
              </p>
              <p className="font-display mt-3 text-xl font-semibold text-concrete-900">
                {t.title}
              </p>
              <p className="mt-2 text-concrete-600">{t.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <CtaSection />
    </>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-medium tracking-[0.18em] text-concrete-500 uppercase">
        {label}
      </dt>
      <dd className="font-display mt-1 text-xl font-semibold text-concrete-900">
        {value}
      </dd>
    </div>
  );
}
