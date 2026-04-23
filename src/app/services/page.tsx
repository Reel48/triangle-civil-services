import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CtaSection } from "@/components/site/cta-section";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { services } from "@/content/services";

export const metadata = {
  title: "Services",
  description:
    "Concrete paving, foundations, drilled footings, elevated structures, stormwater, site prep, and earthwork.",
};

export default function ServicesIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Everything we self-perform."
        lead="Concrete, earthwork, and civil scopes executed with in-house crews and equipment — from single-package bids to full sitework."
      />
      <Section>
        <ul className="grid gap-6 md:grid-cols-2">
          {services.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                className="group flex h-full flex-col rounded-lg border border-concrete-200 bg-white p-8 transition-shadow hover:shadow-md"
              >
                <p className="font-display text-2xl font-semibold text-concrete-900">
                  {s.title}
                </p>
                <p className="mt-3 flex-1 text-concrete-500">{s.summary}</p>
                <ul className="mt-5 grid gap-1 text-sm text-concrete-600">
                  {s.bullets.slice(0, 4).map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span className="mt-2 h-1 w-1 rounded-full bg-accent-500" />
                      {b}
                    </li>
                  ))}
                </ul>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent-600 group-hover:text-accent-700">
                  Learn more <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      <Section tone="subtle">
        <ul className="grid gap-6 md:grid-cols-3">
          {[
            {
              src: "/services/services-1.jpg",
              alt: "TCS crew on a concrete paving placement",
            },
            {
              src: "/services/services-2.jpg",
              alt: "TCS earthwork and site preparation",
            },
            {
              src: "/services/services-3.jpg",
              alt: "TCS foundations and drilled footings",
            },
          ].map(({ src, alt }) => (
            <li
              key={src}
              className="relative aspect-[4/3] overflow-hidden rounded-lg border border-concrete-200 bg-concrete-100"
            >
              <Image
                src={src}
                alt={alt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover"
              />
            </li>
          ))}
        </ul>
      </Section>
      <CtaSection />
    </>
  );
}
