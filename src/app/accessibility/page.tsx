import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { site } from "@/lib/site";

export const metadata = {
  title: "Accessibility",
  description: `Accessibility statement for ${site.name}.`,
};

export default function AccessibilityPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Accessibility statement."
        lead="We aim to make this website usable for the widest possible audience."
      />
      <Section>
        <div className="max-w-prose space-y-5 text-concrete-700">
          <p>
            {site.legalName} is committed to making this website accessible in
            line with the Web Content Accessibility Guidelines (WCAG) 2.1 Level
            AA. If you encounter a barrier using this site, we&apos;d like to know.
          </p>
          <p>
            Report an issue:{" "}
            <a href={site.contact.emailHref}>{site.contact.email}</a> or{" "}
            <a href={site.contact.phoneHref}>{site.contact.phone}</a>.
          </p>
        </div>
      </Section>
    </>
  );
}
