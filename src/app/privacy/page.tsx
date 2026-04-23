import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { buildMailto, site } from "@/lib/site";

export const metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${site.name}.`,
};

const privacyMailtoHref = buildMailto({
  subject: "Privacy question — Triangle Civil Services",
  body: `Hi Triangle Civil Services team,

I had a question about your privacy practices:

• Name:
• Company (if applicable):
• My question:


Thanks,
`,
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy policy."
        lead="How we handle information submitted through this website."
      />
      <Section>
        <div className="prose-like max-w-prose space-y-5 text-concrete-700">
          <p>
            {site.legalName} (&ldquo;Triangle&rdquo;, &ldquo;we&rdquo;)
            operates this website to provide information about our services.
            This page describes what we collect when you use the site and how
            we use it.
          </p>
          <h2 className="font-display text-xl font-semibold text-concrete-900">
            Information we collect
          </h2>
          <p>
            We collect information you voluntarily provide through contact and
            quote-request forms (name, company, email, phone, project details,
            and any files you attach). We also collect standard server logs
            (IP, user agent, timestamps).
          </p>
          <h2 className="font-display text-xl font-semibold text-concrete-900">
            How we use information
          </h2>
          <p>
            Information submitted through forms is used to respond to your
            inquiry. We do not sell personal information. We may share it with
            service providers (e.g. email delivery) under appropriate
            confidentiality terms.
          </p>
          <h2 className="font-display text-xl font-semibold text-concrete-900">
            Contact
          </h2>
          <p>
            Privacy questions: <a href={privacyMailtoHref}>{site.contact.email}</a>.
          </p>
          <p className="text-sm text-concrete-400">
            This is a placeholder policy pending legal review.
          </p>
        </div>
      </Section>
    </>
  );
}
