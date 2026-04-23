export const site = {
  name: "Triangle Civil Services",
  legalName: "Triangle Concrete Services, Inc.",
  dba: "Triangle Civil Services",
  founded: 2006,
  civilServicesSince: 2018,
  headcount: 120,
  capacity: 160,
  concreteYardsPerYear: 50_000,
  dirtYardsPerYear: 1_000_000,
  url: "https://tcsinc.build",
  tagline: "Heavy civil and concrete construction across the Gulf Coast.",
  description:
    "Industrial, commercial, and institutional concrete and civil construction — self-performed across Texas and Louisiana.",
  contact: {
    phone: "(409) 861-1650",
    phoneHref: "tel:+14098611650",
    fax: "(409) 861-1911",
    email: "triangle@tcsinc.build",
    emailHref: "mailto:triangle@tcsinc.build",
    address: {
      street: "1350 S. Major Drive",
      city: "Beaumont",
      region: "TX",
      postalCode: "77707",
      country: "US",
    },
    hours: "Monday–Friday, 8am–6pm CT",
  },
  markets: [
    "Industrial",
    "Commercial",
    "Institutional",
    "Stormwater",
    "Civil infrastructure",
  ],
  serviceArea: ["Texas", "Louisiana"],
  majorClients: [
    "ExxonMobil",
    "Dow Chemical",
    "Sasol",
    "Enterprise Products",
    "Cheniere",
    "Lamar University",
  ],
  safetyPrograms: ["ISNetworld", "Avetta", "Veriforce", "ISTC", "DISA"],
} as const;

export const appleMapsUrl = `https://maps.apple.com/?address=${encodeURIComponent(
  `${site.contact.address.street}, ${site.contact.address.city}, ${site.contact.address.region} ${site.contact.address.postalCode}`,
)}`;

export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Safety", href: "/safety" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: { heading: string; items: NavItem[] }[] = [
  {
    heading: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Safety", href: "/safety" },
      { label: "Capabilities", href: "/capabilities" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    heading: "Work",
    items: [
      { label: "Services", href: "/services" },
      { label: "Projects", href: "/projects" },
      { label: "Request a quote", href: "/request-a-quote" },
    ],
  },
  {
    heading: "Contact",
    items: [
      { label: "Contact us", href: "/contact" },
      { label: "Privacy", href: "/privacy" },
      { label: "Accessibility", href: "/accessibility" },
    ],
  },
];
