export type Category = {
  slug: string;
  name: string;
  description: string;
};

export const CATEGORIES: Category[] = [
  {
    slug: "architecture-decor",
    name: "Architecture & Décor",
    description:
      "Conch homes, modernist builds, interior design, and the architectural language of the Keys.",
  },
  {
    slug: "happenings",
    name: "Happenings",
    description:
      "Events, news, celebrations, and timeless history from across the Florida Keys.",
  },
  {
    slug: "florida-keys",
    name: "Florida Keys",
    description:
      "Island-by-island life, waterways, neighborhoods, and the rhythm of the lower, middle, and upper Keys.",
  },
  {
    slug: "for-sale",
    name: "For Sale",
    description:
      "Featured listings — waterfront estates, canal-front homes, boat-ready lots, and quiet-market opportunities.",
  },
  {
    slug: "just-sold",
    name: "Just Sold",
    description:
      "Recent closings and the stories behind them — strategy, price, and what made the deal work.",
  },
  {
    slug: "key-west-culture",
    name: "Key West & Culture",
    description:
      "Hemingway, sunset rituals, Bahama Village, and the cultural fabric that makes Key West unlike anywhere else.",
  },
  {
    slug: "real-estate-market-trends",
    name: "Real Estate Market Trends",
    description:
      "Weekly numbers, days on market, price shifts, and what Kate is seeing in real time across the Keys.",
  },
  {
    slug: "restaurant-cocktails",
    name: "Restaurant & Cocktails",
    description:
      "Where to eat, where to drink, and the quiet places only locals know.",
  },
  {
    slug: "raves-reviews",
    name: "Raves & Reviews",
    description:
      "Client stories, kudos, and thank-you notes from buyers and sellers across the Keys.",
  },
  {
    slug: "videos",
    name: "Videos",
    description:
      "Lifestyle reels, neighborhood walk-throughs, and listing video tours.",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getCategoryByName(name: string): Category | undefined {
  return CATEGORIES.find((c) => c.name === name);
}
