import { ButtonLink } from "@/components/ui/button";
import { site } from "@/lib/site";

export function CtaSection() {
  return (
    <section className="bg-concrete-900 text-white">
      <div className="container-page flex flex-col gap-8 py-16 md:flex-row md:items-center md:justify-between md:py-20">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold md:text-4xl">
            Have a project on the boards?
          </h2>
          <p className="mt-3 text-concrete-300 md:text-lg">
            We bid concrete, earthwork, and civil packages across {site.serviceArea.join(" and ")}.
            Send us the scope and we'll get back the same business day.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row md:flex-col md:items-end">
          <ButtonLink href="/request-a-quote" variant="cta" size="lg">
            Request a quote
          </ButtonLink>
          <ButtonLink
            href={site.contact.phoneHref}
            variant="outline"
            size="lg"
            className="border-brand-navy-700 text-white hover:bg-brand-navy-700"
          >
            Call {site.contact.phone}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
