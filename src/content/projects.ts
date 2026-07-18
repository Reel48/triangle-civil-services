export type ProjectMarket =
  | "Industrial"
  | "Commercial"
  | "Institutional"
  | "Stormwater"
  | "Civil";

export type ProjectImage = { src: string; alt: string };

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
  gallery?: ProjectImage[];
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
    image: "/projects/sour-lake-detention-pond/01-detention-pond.jpg",
    imageAlt:
      "Excavator beside a rebar-reinforced concrete wall at the Sour Lake detention pond",
    gallery: [
      {
        src: "/projects/sour-lake-detention-pond/01-detention-pond.jpg",
        alt: "Excavator beside a rebar-reinforced concrete wall at the Sour Lake detention pond",
      },
      {
        src: "/projects/sour-lake-detention-pond/02-waste-water-pond.jpg",
        alt: "Waste-water detention pond construction at the Sour Lake site",
      },
      {
        src: "/projects/sour-lake-detention-pond/03-waste-water-pond.jpg",
        alt: "Concrete work at the Sour Lake waste-water detention pond",
      },
      {
        src: "/projects/sour-lake-detention-pond/04-head-wall.jpg",
        alt: "Formed concrete head wall at the Sour Lake detention pond",
      },
      {
        src: "/projects/sour-lake-detention-pond/05-retaining-wall.jpg",
        alt: "Poured concrete retaining wall at the Sour Lake detention pond",
      },
      {
        src: "/projects/sour-lake-detention-pond/06-footing-install.jpg",
        alt: "Footing installation at the Sour Lake detention pond",
      },
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
    image: "/projects/lamar-setzer-center/01-paving.jpg",
    imageAlt:
      "Finished concrete plaza and hardscape at the Lamar University Setzer Center",
    gallery: [
      {
        src: "/projects/lamar-setzer-center/01-paving.jpg",
        alt: "Finished concrete plaza and hardscape at the Lamar University Setzer Center",
      },
      {
        src: "/projects/lamar-setzer-center/02-foundation-pour.jpg",
        alt: "Concrete foundation pour at the Lamar University Setzer Center",
      },
      {
        src: "/projects/lamar-setzer-center/03-paving.jpg",
        alt: "Concrete paving and walkways at the Lamar University Setzer Center",
      },
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
    image: "/projects/dicks-sporting-goods-beaumont/01-slab-pour.jpg",
    imageAlt:
      "Aerial view of a large slab pour with concrete pump and mixer trucks at the Dick's Sporting Goods site",
    gallery: [
      {
        src: "/projects/dicks-sporting-goods-beaumont/01-slab-pour.jpg",
        alt: "Aerial view of a large slab pour with concrete pump and mixer trucks at the Dick's Sporting Goods site",
      },
      {
        src: "/projects/dicks-sporting-goods-beaumont/02-foundation-excavation.jpg",
        alt: "Foundation excavation for the Dick's Sporting Goods store in Beaumont",
      },
      {
        src: "/projects/dicks-sporting-goods-beaumont/03-drill-pier-installation.jpg",
        alt: "Drilled pier installation at the Dick's Sporting Goods foundation",
      },
      {
        src: "/projects/dicks-sporting-goods-beaumont/04-limestone-substrate.jpg",
        alt: "Limestone substrate installation at the Dick's Sporting Goods site",
      },
      {
        src: "/projects/dicks-sporting-goods-beaumont/05-slab-pour.jpg",
        alt: "Concrete slab placement at the Dick's Sporting Goods store",
      },
      {
        src: "/projects/dicks-sporting-goods-beaumont/06-slab-pour.jpg",
        alt: "Finishing the concrete slab at the Dick's Sporting Goods store",
      },
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
    image: "/projects/beaumont-cancer-center/01-cancer-center.jpg",
    imageAlt:
      "Aerial view of a slab pour with rebar mat and concrete pumps at the Beaumont Cancer Center",
    gallery: [
      {
        src: "/projects/beaumont-cancer-center/01-cancer-center.jpg",
        alt: "Aerial view of a slab pour with rebar mat and concrete pumps at the Beaumont Cancer Center",
      },
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
