import { ButtonLink } from "@/components/ui/button";
import { site } from "@/lib/site";

export function CtaSection() {
  return (
    <section
      className="relative overflow-hidden text-white"
      style={{
        backgroundImage:
          "linear-gradient(135deg, var(--color-brand-navy-600) 0%, var(--color-brand-blue) 100%)",
      }}
    >
      <div className="container-page relative flex flex-col gap-8 py-14 md:flex-row md:items-center md:justify-between md:py-20">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold md:text-4xl">
            Have a project on the boards?
          </h2>
          <p className="mt-3 text-concrete-300 md:text-lg">
            We bid concrete, earthwork, and civil packages across {site.serviceArea.join(" and ")}.
            Send us the scope and we&apos;ll get back the same business day.
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
            className="border-white text-white hover:bg-white/10"
          >
            Call {site.contact.phone}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
