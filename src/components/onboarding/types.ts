export type Intent = "buying" | "selling" | "both" | "browsing";

export interface BuyerState {
  regions: string[];
  islands: string[];
  propertyTypes: string[];
  priceMin: string;
  priceMax: string;
  bedroomsMin: number | null;
  mustHaves: string[];
  hasBoat: "yes" | "no" | "plan" | null;
  boatLength: string;
  boatDraft: number;
  boatType: string;
  boatingTypes: string[];
  timeline: string | null;
  purchasePurpose: string | null;
  isFirstTimeBuyer: boolean;
  financing: string | null;
  needsLenderReferral: boolean;
  whyTheKeys: string;
  alertFrequency: string;
}

export interface SellerState {
  address: string;
  island: string;
  currentUse: string | null;
  estimatedValue: string;
  timelineToSell: string | null;
  favoriteMemory: string;
  reasonForSelling: string;
  needsConsultation: boolean;
}

export interface NewsletterState {
  subscribeTideNews: boolean;
  islandSubscriptions: string[];
  frequency: "monthly" | "weekly";
}

export interface OnboardingState {
  intent: Intent | null;
  buyer: BuyerState;
  seller: SellerState;
  newsletter: NewsletterState;
}

export type StepId =
  | "intent"
  | "buyer_islands"
  | "buyer_range"
  | "buyer_matters"
  | "buyer_timeline"
  | "buyer_why"
  | "seller_property"
  | "seller_story"
  | "newsletter";

export function getStepSequence(intent: Intent | null): StepId[] {
  switch (intent) {
    case "buying":
      return ["intent", "buyer_islands", "buyer_range", "buyer_matters", "buyer_timeline", "buyer_why", "newsletter"];
    case "selling":
      return ["intent", "seller_property", "seller_story", "newsletter"];
    case "both":
      return ["intent", "buyer_islands", "buyer_range", "buyer_matters", "buyer_timeline", "buyer_why", "seller_property", "seller_story", "newsletter"];
    case "browsing":
    default:
      return ["intent", "newsletter"];
  }
}

export const KEYS_REGIONS = [
  {
    id: "upper",
    label: "Upper Keys",
    islands: ["Key Largo", "Tavernier", "Plantation Key", "Windley Key", "Islamorada (Upper Matecumbe)", "Lower Matecumbe"],
  },
  {
    id: "middle",
    label: "Middle Keys",
    islands: ["Long Key", "Conch Key", "Duck Key", "Grassy Key", "Marathon", "Knight's Key"],
  },
  {
    id: "lower",
    label: "Lower Keys",
    islands: ["Bahia Honda", "Big Pine Key", "No Name Key", "Little Torch", "Ramrod", "Summerland", "Cudjoe Key", "Upper Sugarloaf", "Lower Sugarloaf", "Saddlebunch", "Shark Key", "Geiger", "Big Coppitt"],
  },
  {
    id: "key_west",
    label: "Key West",
    islands: ["Stock Island", "Key West", "Sunset Key"],
  },
  {
    id: "not_sure",
    label: "Not sure which key yet — let's talk",
    islands: [],
  },
] as const;

export const INITIAL_BUYER_STATE: BuyerState = {
  regions: [],
  islands: [],
  propertyTypes: [],
  priceMin: "",
  priceMax: "",
  bedroomsMin: null,
  mustHaves: [],
  hasBoat: null,
  boatLength: "",
  boatDraft: 3,
  boatType: "",
  boatingTypes: [],
  timeline: null,
  purchasePurpose: null,
  isFirstTimeBuyer: false,
  financing: null,
  needsLenderReferral: true,
  whyTheKeys: "",
  alertFrequency: "weekly",
};

export const INITIAL_SELLER_STATE: SellerState = {
  address: "",
  island: "",
  currentUse: null,
  estimatedValue: "",
  timelineToSell: null,
  favoriteMemory: "",
  reasonForSelling: "",
  needsConsultation: true,
};

export const INITIAL_NEWSLETTER_STATE: NewsletterState = {
  subscribeTideNews: true,
  islandSubscriptions: [],
  frequency: "monthly",
};
