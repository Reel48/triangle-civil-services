import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { site } from "@/lib/site";
import { QuoteWizard } from "./quote-wizard";

export const metadata = {
  title: "Request a Quote",
  description:
    "Send us your scope and we'll respond with a bid the same business day.",
};

export default function QuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Request a quote"
        title="Tell us about the project."
        lead="Share scope, schedule, and any drawings — we'll respond the same business day with next steps."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <QuoteWizard />

          <aside className="h-fit rounded-lg border border-concrete-200 bg-concrete-50 p-6">
            <p className="font-display text-lg font-semibold text-concrete-900">
              What happens next
            </p>
            <ol className="mt-4 space-y-3 text-sm text-concrete-700">
              <Step n={1} title="Same-day acknowledgement">
                You&apos;ll hear back from our estimating team within the business
                day.
              </Step>
              <Step n={2} title="Scope alignment">
                A quick call to confirm quantities, access, and schedule.
              </Step>
              <Step n={3} title="Bid package">
                We return a priced, signed proposal with qualifications and
                inclusions clearly stated.
              </Step>
            </ol>

            <div className="mt-6 border-t border-concrete-200 pt-4 text-sm">
              <p className="text-concrete-500">Prefer a phone call?</p>
              <a
                href={site.contact.phoneHref}
                className="font-display mt-1 block text-xl font-semibold text-concrete-900 hover:text-accent-600"
              >
                {site.contact.phone}
              </a>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}

function Step({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-3">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-500 text-xs font-semibold text-white">
        {n}
      </span>
      <span>
        <span className="block font-medium text-concrete-900">{title}</span>
        <span className="text-concrete-600">{children}</span>
      </span>
    </li>
  );
}
