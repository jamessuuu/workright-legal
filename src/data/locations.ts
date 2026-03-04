/**
 * Location data for suburb-specific landing pages.
 * Each location generates pages like /services/unfair-dismissal-lawyers-sydney/parramatta
 */

export interface Location {
  name: string;
  slug: string;
  postcode: string;
  region: string;
  description: string;
  distanceFromCBD: string;
}

export const locations: Location[] = [
  {
    name: "Parramatta",
    slug: "parramatta",
    postcode: "2150",
    region: "Western Sydney",
    description: "Parramatta is Western Sydney's commercial hub, home to thousands of workers across government, corporate, and retail sectors.",
    distanceFromCBD: "23km west of Sydney CBD",
  },
  {
    name: "North Sydney",
    slug: "north-sydney",
    postcode: "2060",
    region: "Lower North Shore",
    description: "North Sydney is a major business district with a high concentration of corporate offices, tech companies, and financial services firms.",
    distanceFromCBD: "3km north of Sydney CBD",
  },
  {
    name: "Liverpool",
    slug: "liverpool",
    postcode: "2170",
    region: "South Western Sydney",
    description: "Liverpool is South Western Sydney's largest commercial centre, with a diverse workforce across healthcare, retail, and construction.",
    distanceFromCBD: "32km south-west of Sydney CBD",
  },
  {
    name: "Penrith",
    slug: "penrith",
    postcode: "2750",
    region: "Western Sydney",
    description: "Penrith is the gateway to Western Sydney, with a growing workforce across construction, manufacturing, and retail.",
    distanceFromCBD: "54km west of Sydney CBD",
  },
  {
    name: "Blacktown",
    slug: "blacktown",
    postcode: "2148",
    region: "Western Sydney",
    description: "Blacktown is one of Sydney's most populous areas, with a large workforce in logistics, manufacturing, healthcare, and retail.",
    distanceFromCBD: "34km west of Sydney CBD",
  },
  {
    name: "Chatswood",
    slug: "chatswood",
    postcode: "2067",
    region: "Lower North Shore",
    description: "Chatswood is a thriving commercial centre on the Lower North Shore, home to corporate offices, tech firms, and retail workers.",
    distanceFromCBD: "10km north of Sydney CBD",
  },
  {
    name: "Bondi Junction",
    slug: "bondi-junction",
    postcode: "2022",
    region: "Eastern Suburbs",
    description: "Bondi Junction is a major commercial hub in Sydney's Eastern Suburbs, with workers across retail, hospitality, and professional services.",
    distanceFromCBD: "6km east of Sydney CBD",
  },
  {
    name: "Campbelltown",
    slug: "campbelltown",
    postcode: "2560",
    region: "Macarthur",
    description: "Campbelltown serves the Macarthur region with a growing economy across healthcare, education, construction, and government services.",
    distanceFromCBD: "53km south-west of Sydney CBD",
  },
  {
    name: "Hornsby",
    slug: "hornsby",
    postcode: "2077",
    region: "Upper North Shore",
    description: "Hornsby is the commercial centre of Sydney's Upper North Shore, with workers in healthcare, education, retail, and professional services.",
    distanceFromCBD: "25km north of Sydney CBD",
  },
  {
    name: "Wollongong",
    slug: "wollongong",
    postcode: "2500",
    region: "Illawarra",
    description: "Wollongong is the Illawarra region's major city, with a strong workforce across mining, manufacturing, university, and healthcare sectors.",
    distanceFromCBD: "80km south of Sydney CBD",
  },
];

/**
 * Generate location-specific copy for a practice area + location combination.
 */
export function getLocationMeta(
  practiceArea: { title: string; slug: string; description: string },
  location: Location,
) {
  const areaName = practiceArea.title.toLowerCase();
  return {
    title: `${practiceArea.title} Lawyers ${location.name} | WorkRight Legal`,
    description: `${practiceArea.title} lawyers serving ${location.name} and ${location.region}. Free case assessment. Call (02) 9555 1234. ${location.distanceFromCBD}.`,
    heading: `${practiceArea.title} lawyers near ${location.name}`,
    subheading: `Expert ${areaName} representation for workers in ${location.name}, ${location.region}. Same specialist team, local knowledge.`,
  };
}
