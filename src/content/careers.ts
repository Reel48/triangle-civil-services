export type Role = {
  slug: string;
  title: string;
  location: string;
  type: "Full-time" | "Part-time";
  team: "Field" | "Operations" | "Office";
  summary: string;
  responsibilities: string[];
  qualifications: string[];
  preferred?: string[];
  compensation?: string;
};

export const roles: Role[] = [
  {
    slug: "concrete-finisher",
    title: "Concrete Finisher",
    location: "Beaumont, TX",
    type: "Full-time",
    team: "Field",
    summary:
      "Finish flatwork, structural pours, and industrial slabs on self-performed concrete crews across Southeast Texas and Louisiana.",
    responsibilities: [
      "Screed, bull-float, and finish concrete to spec tolerances",
      "Set and verify forms, edges, and control joints",
      "Maintain finishing tools, screeds, and power trowels",
      "Work safely inside active industrial facilities and institutional campuses",
    ],
    qualifications: [
      "2+ years of concrete finishing experience",
      "Able to lift 50 lbs and stand/kneel for long shifts",
      "Valid driver's license and reliable transportation",
    ],
    preferred: [
      "Experience with power trowels and laser screeds",
      "TWIC card or willingness to obtain",
    ],
    compensation: "Competitive hourly + per-diem on travel projects",
  },
  {
    slug: "heavy-equipment-operator",
    title: "Heavy Equipment Operator",
    location: "Beaumont, TX",
    type: "Full-time",
    team: "Field",
    summary:
      "Run dozers, excavators, scrapers, and articulated haul trucks on earthwork and stormwater packages.",
    responsibilities: [
      "Operate earthmoving equipment safely and to grade",
      "Read grade stakes and GPS machine-control targets",
      "Perform daily equipment inspections and routine maintenance",
      "Coordinate with foreman and survey crews on production targets",
    ],
    qualifications: [
      "3+ years operating at least two earthmoving equipment types",
      "Ability to work outdoors in all weather conditions",
      "Valid driver's license",
    ],
    preferred: [
      "Experience with Trimble or Topcon machine control",
      "CDL Class A",
    ],
    compensation: "Competitive hourly, overtime, and benefits",
  },
  {
    slug: "project-superintendent",
    title: "Project Superintendent",
    location: "Gulf Coast, TX / LA",
    type: "Full-time",
    team: "Operations",
    summary:
      "Own the daily field execution of concrete, earthwork, and civil packages — from mobilization through closeout.",
    responsibilities: [
      "Plan and sequence crews, equipment, and materials on multi-phase sites",
      "Lead daily safety briefings and enforce JSAs",
      "Coordinate with owners, GCs, and inspectors on quality and schedule",
      "Track production, approve timecards, and drive schedule recovery when needed",
    ],
    qualifications: [
      "5+ years as superintendent on heavy civil or concrete work",
      "OSHA 30; TWIC and refinery prequalifications a plus",
      "Strong grasp of concrete placement, formwork, and earthwork production rates",
    ],
    preferred: [
      "Industrial / petrochem field experience",
      "Experience leading crews of 20+",
    ],
    compensation: "Salary + truck allowance + bonus",
  },
  {
    slug: "project-engineer",
    title: "Project Engineer",
    location: "Beaumont, TX",
    type: "Full-time",
    team: "Office",
    summary:
      "Support project managers on submittals, RFIs, change orders, scheduling, and cost reporting from preconstruction through closeout.",
    responsibilities: [
      "Prepare and track submittals, RFIs, and shop drawings",
      "Maintain cost reports, budgets, and change-order logs",
      "Coordinate with field supers on quantities, deliveries, and subs",
      "Support estimators with quantity takeoffs and bid prep",
    ],
    qualifications: [
      "BS in Civil Engineering, Construction Management, or similar",
      "Proficiency with Procore, Bluebeam, and MS Office",
      "Strong written communication and attention to detail",
    ],
    preferred: [
      "Internship or co-op with a heavy civil / concrete contractor",
      "Familiarity with P6 or MS Project",
    ],
    compensation: "Salary + benefits + annual bonus",
  },
  {
    slug: "safety-coordinator",
    title: "Safety Coordinator",
    location: "Beaumont, TX",
    type: "Full-time",
    team: "Operations",
    summary:
      "Audit jobsites, train crews, and keep our ISNetworld / Avetta / Veriforce programs current.",
    responsibilities: [
      "Conduct jobsite safety audits and incident investigations",
      "Deliver toolbox talks, new-hire orientations, and refresher training",
      "Maintain prequalification portals and OSHA recordkeeping",
      "Support superintendents on JSAs, permit-to-work, and LOTO programs",
    ],
    qualifications: [
      "3+ years construction safety, preferably industrial",
      "OSHA 30 (OSHA 500 preferred)",
      "Strong writing and documentation skills",
    ],
    preferred: ["CHST or CSP certification", "TWIC card"],
    compensation: "Salary + truck allowance",
  },
];
