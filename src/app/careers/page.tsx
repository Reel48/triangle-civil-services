import { ButtonLink } from "@/components/ui/button";
import { CtaSection } from "@/components/site/cta-section";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { site } from "@/lib/site";

export const metadata = {
  title: "Careers",
  description:
    "Join a self-performing concrete and civil contractor on the Gulf Coast.",
};

const openings = [
  {
    title: "Concrete Finisher",
    location: "Beaumont, TX",
    type: "Full-time",
  },
  {
    title: "Heavy Equipment Operator",
    location: "Beaumont, TX",
    type: "Full-time",
  },
  {
    title: "Project Superintendent",
    location: "Gulf Coast, TX / LA",
    type: "Full-time",
  },
  {
    title: "Project Engineer",
    location: "Beaumont, TX",
    type: "Full-time",
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build a career, not just the jobsite."
        lead={`We're ${site.headcount}+ strong and scaling toward ${site.capacity}. If you want real work, real mentorship, and real equipment to run, come talk to us.`}
      >
        <ButtonLink href={site.contact.emailHref} size="lg">
          Email HR
        </ButtonLink>
      </PageHero>

      <Section>
        <p className="text-xs font-semibold tracking-[0.2em] text-accent-600 uppercase">
          Open roles
        </p>
        <h2 className="font-display mt-3 text-3xl font-semibold text-concrete-900 md:text-5xl">
          What we're hiring for.
        </h2>
        <p className="mt-3 max-w-2xl text-concrete-500">
          Don't see the right fit? Send a resume to{" "}
          <a
            href={site.contact.emailHref}
            className="text-accent-600 hover:text-accent-700"
          >
            {site.contact.email}
          </a>
          . We're always hiring skilled crew.
        </p>
        <ul className="mt-10 divide-y divide-concrete-200 overflow-hidden rounded-lg border border-concrete-200 bg-white">
          {openings.map((o) => (
            <li
              key={o.title}
              className="flex flex-col gap-3 p-6 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="font-display text-lg font-semibold text-concrete-900">
                  {o.title}
                </p>
                <p className="text-sm text-concrete-500">
                  {o.location} · {o.type}
                </p>
              </div>
              <ButtonLink
                href={`${site.contact.emailHref}?subject=Application: ${encodeURIComponent(o.title)}`}
                size="sm"
                variant="outline"
              >
                Apply by email
              </ButtonLink>
            </li>
          ))}
        </ul>
      </Section>

      <CtaSection />
    </>
  );
}
