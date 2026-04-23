import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { roles } from "@/content/careers";
import { site } from "@/lib/site";
import {
  JsonLdScript,
  breadcrumbJsonLd,
} from "@/lib/structured-data";
import { ApplicationForm } from "./application-form";

export function generateStaticParams() {
  return roles.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const role = roles.find((r) => r.slug === slug);
  if (!role) return {};
  return {
    title: `${role.title} — Careers`,
    description: role.summary,
    alternates: { canonical: `${site.url}/careers/${role.slug}` },
  };
}

export default async function RolePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const role = roles.find((r) => r.slug === slug);
  if (!role) notFound();

  return (
    <>
      <JsonLdScript
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers" },
          { name: role.title, path: `/careers/${role.slug}` },
        ])}
      />
      <PageHero
        eyebrow={`${role.team} · ${role.type}`}
        title={role.title}
        lead={role.summary}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="max-w-prose">
            <Link
              href="/careers"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-600 hover:text-accent-700"
            >
              <ArrowLeft className="h-4 w-4" />
              All open roles
            </Link>

            <h2 className="font-display mt-10 text-2xl font-semibold text-concrete-900">
              What you&apos;ll do
            </h2>
            <ul className="mt-4 space-y-2.5">
              {role.responsibilities.map((r) => (
                <li key={r} className="flex items-start gap-3 text-concrete-700">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent-600" />
                  {r}
                </li>
              ))}
            </ul>

            <h2 className="font-display mt-10 text-2xl font-semibold text-concrete-900">
              What we&apos;re looking for
            </h2>
            <ul className="mt-4 space-y-2.5">
              {role.qualifications.map((q) => (
                <li key={q} className="flex items-start gap-3 text-concrete-700">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent-600" />
                  {q}
                </li>
              ))}
            </ul>

            {role.preferred?.length ? (
              <>
                <h2 className="font-display mt-10 text-2xl font-semibold text-concrete-900">
                  Nice to have
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {role.preferred.map((q) => (
                    <li
                      key={q}
                      className="flex items-start gap-3 text-concrete-700"
                    >
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent-600" />
                      {q}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            {role.compensation ? (
              <>
                <h2 className="font-display mt-10 text-2xl font-semibold text-concrete-900">
                  Compensation
                </h2>
                <p className="mt-2 text-concrete-700">{role.compensation}</p>
              </>
            ) : null}
          </div>

          <aside className="h-fit rounded-lg border border-concrete-200 bg-concrete-50 p-6">
            <dl className="space-y-4 text-sm">
              <Detail label="Team" value={role.team} />
              <Detail label="Location" value={role.location} />
              <Detail label="Type" value={role.type} />
            </dl>
            <div className="mt-6 border-t border-concrete-200 pt-4 text-sm">
              <p className="text-concrete-500">Questions?</p>
              <a
                href={site.contact.emailHref}
                className="font-display mt-1 block text-base font-semibold text-concrete-900 hover:text-accent-600"
              >
                {site.contact.email}
              </a>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="subtle" id="apply">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-accent-600 uppercase">
            Apply
          </p>
          <h2 className="font-display mt-3 text-3xl font-semibold text-concrete-900 md:text-4xl">
            Apply for this role
          </h2>
          <p className="mt-3 text-concrete-600">
            Tell us a bit about yourself. This is a demo form — submissions are
            not sent anywhere yet.
          </p>
        </div>
        <div className="mt-10">
          <ApplicationForm roleSlug={role.slug} roleTitle={role.title} />
        </div>
      </Section>
    </>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold tracking-[0.18em] text-concrete-500 uppercase">
        {label}
      </dt>
      <dd className="mt-0.5 text-base text-concrete-800">{value}</dd>
    </div>
  );
}
