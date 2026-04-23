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
  },
];

export const markets: ProjectMarket[] = [
  "Industrial",
  "Commercial",
  "Institutional",
  "Stormwater",
  "Civil",
];
