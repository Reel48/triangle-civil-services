export type ProjectMarket =
  | "Industrial"
  | "Commercial"
  | "Institutional"
  | "Stormwater"
  | "Civil";

export type Project = {
  slug: string;
  title: string;
  client: string;
  location: string;
  market: ProjectMarket;
  year: number;
  scopeSummary: string;
  scope: string[];
  image?: string;
  imageAlt?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "sour-lake-detention-pond",
    title: "Sour Lake Detention Pond",
    client: "City of Sour Lake",
    location: "Sour Lake, TX",
    market: "Stormwater",
    year: 2023,
    scopeSummary:
      "Detention pond construction and associated stormwater infrastructure.",
    scope: [
      "Mass excavation",
      "Concrete-lined channels",
      "Inlet and outlet structures",
      "Erosion control",
    ],
    image: "/projects/sour-lake-detention-pond.jpg",
    imageAlt:
      "Sour Lake detention pond during construction with concrete-lined channels",
    featured: true,
  },
  {
    slug: "lamar-setzer-center",
    title: "Lamar University — Setzer Center",
    client: "Lamar University",
    location: "Beaumont, TX",
    market: "Institutional",
    year: 2023,
    scopeSummary:
      "Concrete foundations and site concrete for a university student center.",
    scope: [
      "Structural foundations",
      "Elevated slabs",
      "Site concrete and hardscape",
    ],
    image: "/projects/lamar-setzer-center.jpg",
    imageAlt: "Concrete paving work at the Lamar University Setzer Center",
    featured: true,
  },
  {
    slug: "dicks-sporting-goods-beaumont",
    title: "Dick's Sporting Goods",
    client: "Dick's Sporting Goods",
    location: "Beaumont, TX",
    market: "Commercial",
    year: 2023,
    scopeSummary:
      "Foundations and site concrete for a new retail store build-out.",
    scope: [
      "Building foundations",
      "Heavy-duty parking paving",
      "Sidewalks and curbs",
    ],
    image: "/projects/dicks-sporting-goods-beaumont.jpg",
    imageAlt:
      "Limestone substrate install for the Dick's Sporting Goods site in Beaumont",
  },
  {
    slug: "beaumont-cancer-center",
    title: "Beaumont Cancer Center",
    client: "Beaumont Cancer Center",
    location: "Beaumont, TX",
    market: "Institutional",
    year: 2023,
    scopeSummary:
      "Concrete scope for a regional cancer treatment medical facility.",
    scope: [
      "Structural foundations",
      "Elevated decks",
      "Equipment pads",
    ],
    image: "/projects/beaumont-cancer-center.jpg",
    imageAlt: "Concrete work at the Beaumont Cancer Center",
  },
];

export const markets: ProjectMarket[] = [
  "Industrial",
  "Commercial",
  "Institutional",
  "Stormwater",
  "Civil",
];
