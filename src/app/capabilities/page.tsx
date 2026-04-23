import { AwardsStrip } from "@/components/site/awards-strip";
import { CtaSection } from "@/components/site/cta-section";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { site } from "@/lib/site";

export const metadata = {
  title: "Capabilities",
  description:
    "Self-performed scopes, owned equipment, bonding capacity, and a service footprint across Texas and Louisiana.",
};

const equipmentCategories = [
  { title: "Earthwork", items: ["Dozers", "Excavators", "Scrapers", "Articulated haul trucks"] },
  { title: "Concrete placement", items: ["Concrete pumps", "Telebelts", "Laser screeds", "Finishing crews"] },
  { title: "Drilled shafts", items: ["Drilled-shaft rigs", "Casing / temporary casing", "Cleanout tooling"] },
  { title: "Support", items: ["Service trucks", "Welders", "Generators", "Site trailers"] },
];

export default function CapabilitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Capabilities"
        title="What we bring to your project."
        lead="Owned equipment, self-performed crews, and a Gulf-Coast service footprint that scales with the work."
      />

      <Section>
        <div className="grid gap-8 md:grid-cols-3">
          <Panel title="Self-perform percentage">
            We self-perform the concrete, earthwork, drilled foundations, and
            stormwater packages on most of our projects — no lost critical
            path to a sub.
          </Panel>
          <Panel title="Workforce">
            {`${site.headcount} employees core, scaling to ${site.capacity}+ at peak. Cross-trained crews across earthwork, concrete, and drilling.`}
          </Panel>
          <Panel title="Service area">
            {`Headquartered in ${site.contact.address.city}, TX. Active across ${site.serviceArea.join(" and ")} — from refineries in Port Arthur to institutional campuses and beyond.`}
          </Panel>
        </div>
      </Section>

      <Section tone="subtle">
        <p className="text-xs font-semibold tracking-[0.2em] text-accent-600 uppercase">
          Fleet
        </p>
        <h2 className="font-display mt-3 text-3xl font-semibold text-concrete-900 md:text-5xl">
          Owned equipment we run.
        </h2>
        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {equipmentCategories.map((c) => (
            <li
              key={c.title}
              className="rounded-lg border border-concrete-200 bg-white p-6"
            >
              <p className="font-display text-lg font-semibold text-concrete-900">
                {c.title}
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-concrete-600">
                {c.items.map((i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-2 h-1 w-1 rounded-full bg-accent-500" />
                    {i}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Section>

      <AwardsStrip tone="default" eyebrow="Affiliations" title="Where we stand." lead="Memberships, accreditations, and active prequalifications clients verify up front." />

      <CtaSection />
    </>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-concrete-200 bg-white p-6">
      <p className="font-display text-xl font-semibold text-concrete-900">
        {title}
      </p>
      <p className="mt-3 text-concrete-600">{children}</p>
    </div>
  );
}
