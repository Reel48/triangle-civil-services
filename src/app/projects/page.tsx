import { CtaSection } from "@/components/site/cta-section";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { pageMetadata } from "@/lib/metadata";
import { ProjectGrid } from "./project-grid";

export const metadata = pageMetadata({
  title: "Projects",
  description:
    "Concrete, civil, and stormwater projects across Texas and Louisiana, from university campuses to municipal detention ponds.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Selected work."
        lead="A sample of concrete, civil, and stormwater projects across Texas and Louisiana."
      />

      <Section>
        <ProjectGrid />
      </Section>

      <CtaSection />
    </>
  );
}
