import { ButtonLink } from "@/components/ui/button";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";

export default function NotFound() {
  return (
    <>
      <PageHero
        eyebrow="404"
        title="Page not found."
        lead="The page you're looking for isn't here. Try one of the links below or head back to the homepage."
      />
      <Section>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" size="lg">
            Home
          </ButtonLink>
          <ButtonLink href="/services" variant="outline" size="lg">
            Services
          </ButtonLink>
          <ButtonLink href="/projects" variant="outline" size="lg">
            Projects
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline" size="lg">
            Contact
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
