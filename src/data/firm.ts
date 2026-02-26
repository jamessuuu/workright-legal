export const firmData = {
  name: "WorkRight Legal",
  tagline: "Fighting for workers' rights across Greater Sydney",
  phone: "(02) 9555 1234",
  phoneClean: "0295551234",
  secondaryPhone: "1300 123 456",
  secondaryPhoneClean: "1300123456",
  email: "hello@workrightlegal.com.au",
  address: {
    street: "Level 12, 123 Pitt Street",
    city: "Sydney",
    state: "NSW",
    postcode: "2000",
    country: "Australia",
    full: "Level 12, 123 Pitt Street, Sydney NSW 2000",
  },
  hours: "Monday – Friday, 9:00 AM – 5:30 PM",
  serviceArea: "Greater Sydney",
  serviceRadius: "100km from Sydney CBD",
  foundedYear: 2009,
  domain: "workrightlegal.vercel.app",
  url: "https://workrightlegal.vercel.app",
  social: {
    linkedin: "",
    facebook: "",
    twitter: "",
  },
  geo: {
    lat: -33.8688,
    lng: 151.2093,
  },
  serviceAreas: [
    "Sydney CBD",
    "North Sydney",
    "Parramatta",
    "Chatswood",
    "Bondi Junction",
    "Liverpool",
    "Penrith",
    "Blacktown",
    "Campbelltown",
    "Sutherland",
    "Hornsby",
    "Ryde",
    "Bankstown",
    "Castle Hill",
    "Hurstville",
    "Strathfield",
    "Newtown",
    "Surry Hills",
    "Randwick",
    "Manly",
    "Wollongong",
    "Gosford",
    "Blue Mountains",
  ],
} as const;

export const practiceAreasList = [
  {
    name: "Unfair Dismissal",
    slug: "unfair-dismissal-lawyers-sydney",
    shortDescription:
      "Fight unfair dismissal with Sydney's top-rated employment lawyers. No win, no fee options available.",
    iconKey: "unfair-dismissal",
  },
  {
    name: "Workplace Discrimination",
    slug: "workplace-discrimination-lawyers-sydney",
    shortDescription:
      "Experienced workplace discrimination lawyers. Age, gender, race, disability discrimination cases.",
    iconKey: "workplace-discrimination",
  },
  {
    name: "Employment Contracts",
    slug: "employment-contract-lawyers-sydney",
    shortDescription:
      "Don't sign before we review it. Expert contract review, negotiation, and drafting services.",
    iconKey: "employment-contracts",
  },
  {
    name: "Workplace Bullying",
    slug: "workplace-bullying-lawyers-sydney",
    shortDescription:
      "Stop workplace bullying and harassment. Compassionate, experienced lawyers on your side.",
    iconKey: "workplace-bullying",
  },
  {
    name: "Redundancy & Severance",
    slug: "redundancy-severance-lawyers-sydney",
    shortDescription:
      "Is your redundancy payout fair? Expert lawyers to help you get what you're entitled to.",
    iconKey: "redundancy-severance",
  },
  {
    name: "General Protections Claims",
    slug: "general-protections-lawyers-sydney",
    shortDescription:
      "Uncapped compensation for workplace rights violations. Don't let employers punish you.",
    iconKey: "general-protections",
  },
] as const;
