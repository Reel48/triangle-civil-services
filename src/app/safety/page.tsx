import { ShieldCheck } from "lucide-react";
import { CtaSection } from "@/components/site/cta-section";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { site } from "@/lib/site";

export const metadata = {
  title: "Safety",
  description:
    "Our safety program meets the prequalification standards of the industrial and petrochemical clients we serve.",
};

export default function SafetyPage() {
  return (
    <>
      <PageHero
        eyebrow="Safety"
        title="Safety is the work."
        lead="Our program is built around the prequalification standards our industrial and petrochem clients require — and owned by every crew member."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div className="max-w-prose text-concrete-700">
            <p className="text-lg">
              Working inside a plant fence is a privilege earned one shift at a
              time. We treat every project — industrial or not — with the same
              protocols: pre-task planning, daily JSAs, documented training, and
              visible leadership in the field.
            </p>
            <p className="mt-4">
              Our safety program is continuously audited through third-party
              prequalification networks. The goal isn&apos;t paperwork — it&apos;s crews
              that go home the way they came in.
            </p>
          </div>

          <aside className="h-fit rounded-lg border border-concrete-200 bg-concrete-50 p-6">
            <p className="font-display text-lg font-semibold text-concrete-900">
              Prequalification
            </p>
            <p className="mt-1 text-sm text-concrete-500">
              Enrolled and active in:
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {site.safetyPrograms.map((p) => (
                <li
                  key={p}
                  className="flex items-center gap-2 rounded-md border border-concrete-200 bg-white px-3 py-2 text-sm font-medium text-concrete-800"
                >
                  <ShieldCheck className="h-4 w-4 text-accent-600" />
                  {p}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </Section>

      <Section tone="subtle">
        <p className="text-xs font-semibold tracking-[0.2em] text-accent-600 uppercase">
          Metrics
        </p>
        <h2 className="font-display mt-3 text-3xl font-semibold text-concrete-900 md:text-5xl">
          Safety by the numbers.
        </h2>
        <p className="mt-4 max-w-2xl text-concrete-500">
          Specific TRIR / EMR / DART figures by fiscal year are available on
          request for prequalification packages.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <Metric label="TRIR" value="Available on request" />
          <Metric label="EMR" value="Available on request" />
          <Metric label="DART" value="Available on request" />
        </div>
      </Section>

      <CtaSection />
    </>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-concrete-200 bg-white p-6">
      <p className="text-xs font-semibold tracking-[0.2em] text-concrete-500 uppercase">
        {label}
      </p>
      <p className="font-display mt-2 text-2xl font-semibold text-concrete-900">
        {value}
      </p>
    </div>
  );
}
