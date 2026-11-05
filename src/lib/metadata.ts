import type { Metadata } from "next";
import { site } from "./site";

/**
 * Per-page metadata with a self-referencing canonical and matching Open Graph
 * / Twitter tags. Next.js replaces (rather than merges) `openGraph` and
 * `twitter` from the root layout, so every page builds the full objects here.
 * Paths are relative; `metadataBase` in the root layout makes them absolute.
 *
 * Overriding `openGraph` also drops the image Next.js injects from
 * src/app/opengraph-image.tsx for child routes, so it is re-added here.
 *
 * Omit `title` to keep the root layout's default title (used by the homepage).
 */
const shareImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${site.name} | ${site.tagline}`,
};

export function pageMetadata({
  title,
  description = site.description,
  path,
}: {
  title?: string;
  description?: string;
  path: string;
}): Metadata {
  const socialTitle = title ? `${title} | ${site.name}` : site.name;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_US",
      title: socialTitle,
      description,
      url: path,
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [shareImage.url],
    },
  };
}
