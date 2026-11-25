// Side projects: things built outside client and employer work. Every claim here
// is checkable from the product itself. No usage numbers are claimed.

export type SideProject = {
  slug: string;
  kicker: string;
  name: string;
  summary: string;
  points: string[];
  stack: string[];
  links: { label: string; href: string; primary?: boolean }[];
};

export const sideProjects: SideProject[] = [
  {
    slug: "mingalar-tarot",
    kicker: "Mobile app · Android",
    name: "Mingalar Tarot",
    summary:
      "A calm, bilingual tarot companion for English and Burmese readers. Draw a card, read its meaning, and write down what it brings to mind.",
    points: [
      "Offline-first: card content, journal and settings live on the phone; cloud backup is optional.",
      "Every card meaning, lesson and weekday sign text is written in both English and Burmese.",
      "Birth-chart planet positions are calculated on the phone with an open-source astronomy library.",
      "Locale, card-data and content validation run in CI alongside type checks, lint and tests.",
    ],
    stack: ["Expo", "React Native", "TypeScript", "SQLite", "i18n (EN / MY)"],
    links: [
      {
        label: "Get it on Google Play",
        href: "https://play.google.com/store/apps/details?id=com.mingalartarot.app",
        primary: true,
      },
    ],
  },
  {
    slug: "myanmar-thai-calendar",
    kicker: "Developer API · Apify Actor",
    name: "Myanmar & Thai Calendar API",
    summary:
      "Converts Gregorian dates to the Myanmar calendar and returns astrological days plus Myanmar and Thai public holidays, as one pay-per-result API.",
    points: [
      "Myanmar year, month, moon phase and full-moon days, plus Sabbath, Yatyaza, Pyathada and Thamanyo days.",
      "Output in English, Burmese (Unicode and Zawgyi), Mon, Shan and Karen.",
      "Verified against an independent implementation: 255 full moons from 2000 to 2050 match, and a 40-year round trip passes.",
      "Priced per result on the Apify Store, so there is no subscription and no client to manage.",
    ],
    stack: ["Node.js", "Apify", "Docker", "pay-per-event"],
    links: [
      {
        label: "Open on Apify Store",
        href: "https://apify.com/zinminkhant/myanmar-thai-calendar",
        primary: true,
      },
    ],
  },
];
