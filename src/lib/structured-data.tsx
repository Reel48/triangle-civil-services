import { site } from "./site";
import type { Service } from "@/content/services";
import type { Project } from "@/content/projects";

type JsonLd = Record<string, unknown>;

export function localBusinessJsonLd(): JsonLd {
  const { contact } = site;
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": `${site.url}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    telephone: contact.phone,
    email: contact.email,
    foundingDate: `${site.founded}`,
    description: site.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address.street,
      addressLocality: contact.address.city,
      addressRegion: contact.address.region,
      postalCode: contact.address.postalCode,
      addressCountry: contact.address.country,
    },
    areaServed: site.serviceArea.map((region) => ({
      "@type": "State",
      name: region,
    })),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    sameAs: [] as string[],
  };
}

export function serviceJsonLd(service: Service): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    name: service.title,
    description: service.description,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: site.serviceArea.map((region) => ({
      "@type": "State",
      name: region,
    })),
    url: `${site.url}/services/${service.slug}`,
  };
}

export function projectJsonLd(project: Project): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    about: project.market,
    dateCreated: `${project.year}`,
    locationCreated: {
      "@type": "Place",
      name: project.location,
    },
    creator: { "@id": `${site.url}/#organization` },
    description: project.scopeSummary,
    url: `${site.url}/projects/${project.slug}`,
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

export function JsonLdScript({ data }: { data: JsonLd | JsonLd[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
