import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { CtaSection } from "@/components/site/cta-section";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { roles } from "@/content/careers";
import { buildMailto, site } from "@/lib/site";

export const metadata = {
  title: "Careers",
  description:
    "Join a self-performing concrete and civil contractor on the Gulf Coast.",
};

const hrMailtoHref = buildMailto({
  subject: "Career inquiry — Triangle Civil Services",
  body: `Hi Triangle Civil Services HR team,

I'm interested in learning more about career opportunities with your crew. A quick introduction:

• Name:
• Phone:
• Current location:
• Role(s) I'm interested in:
• Years of relevant experience:
• Certifications / licenses (OSHA, TWIC, CDL, etc.):
• Earliest availability:

I've attached my resume. Happy to provide references on request.

Thanks,
`,
});

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build a career, not just the jobsite."
        lead={`We're ${site.headcount}+ strong and scaling toward ${site.capacity}. If you want real work, real mentorship, and real equipment to run, come talk to us.`}
      >
        <ButtonLink href={hrMailtoHref} size="lg">
          Email HR
        </ButtonLink>
      </PageHero>

      <Section>
        <p className="text-xs font-semibold tracking-[0.2em] text-accent-600 uppercase">
          Open roles
        </p>
        <h2 className="font-display mt-3 text-3xl font-semibold text-concrete-900 md:text-5xl">
          What we&apos;re hiring for.
        </h2>
        <p className="mt-3 max-w-2xl text-concrete-500">
          Don&apos;t see the right fit? Send a resume to{" "}
          <a
            href={hrMailtoHref}
            className="text-accent-600 hover:text-accent-700"
          >
            {site.contact.email}
          </a>
          . We&apos;re always hiring skilled crew.
        </p>

        <ul className="mt-10 divide-y divide-concrete-200 overflow-hidden rounded-lg border border-concrete-200 bg-white">
          {roles.map((r) => (
            <li key={r.slug}>
              <Link
                href={`/careers/${r.slug}`}
                className="group flex flex-col gap-3 p-6 transition-colors hover:bg-concrete-50 md:flex-row md:items-center md:justify-between"
              >
                <div className="min-w-0">
                  <p className="font-display text-lg font-semibold text-concrete-900 group-hover:text-accent-700">
                    {r.title}
                  </p>
                  <p className="text-sm text-concrete-500">
                    {r.team} · {r.location} · {r.type}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-600 group-hover:text-accent-700">
                  View role & apply
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaSection />
    </>
  );
}
