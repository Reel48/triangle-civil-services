export type Service = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  bullets: string[];
};

export const services: Service[] = [
  {
    slug: "concrete-paving",
    title: "Concrete Paving",
    summary:
      "Heavy-duty pavement for industrial yards, distribution facilities, and commercial sites.",
    description:
      "From plant and refinery yards to retail parking, we self-perform form, reinforcement, placement, and finish — to spec, on schedule.",
    bullets: [
      "Industrial-grade slab-on-grade",
      "Jointed reinforced paving",
      "Curb, gutter, and sidewalks",
      "High-tolerance commercial paving",
    ],
  },
  {
    slug: "foundations",
    title: "Foundations",
    summary:
      "Structural foundations for industrial, commercial, and institutional builds.",
    description:
      "Spread footings, mat foundations, and pile caps for buildings, tanks, racks, and process equipment — coordinated with structural steel and MEP trades.",
    bullets: [
      "Spread and mat foundations",
      "Pile caps and grade beams",
      "Equipment pads and pedestals",
      "Tank and vessel foundations",
    ],
  },
  {
    slug: "drilled-footings",
    title: "Drilled Footings",
    summary: "Drilled shafts and piers for deep foundation loads.",
    description:
      "Auger-cast and drilled pier installation with in-house crews and QA/QC documentation matching client procurement standards.",
    bullets: [
      "Drilled shafts and piers",
      "Load testing coordination",
      "Inspection documentation",
      "Tight-site and right-of-way work",
    ],
  },
  {
    slug: "elevated-structures",
    title: "Elevated Concrete Structures",
    summary:
      "Elevated slabs, platforms, and pipe racks for process facilities.",
    description:
      "Formwork, shoring, reinforcement, and concrete placement for elevated structural concrete — from equipment platforms to elevated process decks.",
    bullets: [
      "Elevated slabs and decks",
      "Structural platforms",
      "Pipe rack foundations",
      "Containment and sumps",
    ],
  },
  {
    slug: "stormwater",
    title: "Stormwater & Drainage",
    summary:
      "Detention ponds, concrete-lined ditches, and drainage infrastructure.",
    description:
      "Full-scope stormwater work including detention/retention construction, lined channels, inlets, and storm piping.",
    bullets: [
      "Detention and retention ponds",
      "Concrete-lined ditches",
      "Storm drainage and inlets",
      "Erosion and sediment control",
    ],
  },
  {
    slug: "site-preparation",
    title: "Site Preparation & Earthwork",
    summary:
      "Mass grading, excavation, and earthmoving — over one million yards a year.",
    description:
      "Clearing, grubbing, demolition, grading, excavation, and site utilities to deliver a pad ready for structural work.",
    bullets: [
      "Clearing and demolition",
      "Mass and fine grading",
      "Excavation and backfill",
      "Site utilities coordination",
    ],
  },
];
