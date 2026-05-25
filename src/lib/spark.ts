const BASE = "https://replication.sparkapi.com/Version/3/Reso/OData";

function token() {
  return process.env.SPARK_ACCESS_TOKEN;
}

export interface SparkListing {
  ListingKey: string;
  ListingId: string;
  ListPrice: number;
  OriginalListPrice: number;
  BedroomsTotal: number;
  BathroomsTotalInteger: number;
  BathroomsFull: number;
  BathroomsHalf: number;
  BuildingAreaTotal: number;
  LotSizeSquareFeet: number | null;
  PropertyType: string;
  PropertySubType: string;
  StandardStatus: string;
  MlsStatus: string;
  City: string;
  StateOrProvince: string;
  PostalCode: string;
  UnparsedAddress: string;
  StreetNumber: string;
  StreetName: string;
  StreetSuffix: string | null;
  UnitNumber: string | null;
  SubdivisionName: string | null;
  MLSAreaMajor: string;
  PublicRemarks: string;
  Latitude: number;
  Longitude: number;
  WaterfrontYN: boolean;
  WaterfrontFeatures: string[];
  PoolPrivateYN: boolean;
  PhotosCount: number;
  DaysOnMarket: number;
  ListingContractDate: string;
  YearBuilt: number | null;
  Furnished: string | null;
  AssociationYN: boolean;
  AssociationFee: number | null;
  AssociationFeeFrequency: string | null;
  ListOfficeName: string | null;
  Media?: SparkMedia[];
  // FlexMLS custom fields
  "Location_sp_Tax_sp_Legal_co_Mile_sp_Marker2"?: number;
  "Location_sp_Tax_sp_Legal_co_Flood_sp_Zone"?: string;
  "General_sp_Property_sp_Description_co_Rentals_sp_Allowed2"?: string;
  "General_sp_Property_sp_Description_co_Waterfront"?: string;
}

export interface SparkMedia {
  MediaURL: string;
  Order: number;
  MediaCategory: string;
}

export interface ListingSearchParams {
  status?: "Active" | "Pending" | "Closed";
  minPrice?: number;
  maxPrice?: number;
  minBeds?: number;
  city?: string;
  waterfront?: boolean;
  waterfrontType?: "Oceanfront" | "Gulf Front" | "Canal Front" | "Open Water" | "Bay Front";
  hasDockage?: boolean;
  minMileMarker?: number;
  maxMileMarker?: number;
  rentalsAllowed?: boolean;
  hasPool?: boolean;
  limit?: number;
  skip?: string; // skiptoken for pagination
}

export async function getListings(params: ListingSearchParams = {}): Promise<{
  listings: SparkListing[];
  nextToken: string | null;
}> {
  const {
    status = "Active",
    minPrice,
    maxPrice,
    minBeds,
    city,
    waterfront,
    waterfrontType,
    hasDockage,
    minMileMarker,
    maxMileMarker,
    rentalsAllowed,
    hasPool,
    limit = 24,
    skip,
  } = params;

  const filters: string[] = [`StandardStatus eq '${status}'`];
  if (minPrice) filters.push(`ListPrice ge ${minPrice}`);
  if (maxPrice) filters.push(`ListPrice le ${maxPrice}`);
  if (minBeds) filters.push(`BedroomsTotal ge ${minBeds}`);
  if (city) filters.push(`City eq '${city}'`);
  if (waterfront) filters.push(`WaterfrontYN eq true`);
  if (waterfrontType) filters.push(`WaterfrontFeatures/any(f:f eq '${waterfrontType}')`);
  if (hasDockage) filters.push(`WaterfrontFeatures/any(f:f eq 'Dock Access')`);
  if (minMileMarker) filters.push(`Location_sp_Tax_sp_Legal_co_Mile_sp_Marker2 ge ${minMileMarker}`);
  if (maxMileMarker) filters.push(`Location_sp_Tax_sp_Legal_co_Mile_sp_Marker2 le ${maxMileMarker}`);
  if (rentalsAllowed) filters.push(`General_sp_Property_sp_Description_co_Rentals_sp_Allowed2 eq 'Yes'`);
  if (hasPool) filters.push(`PoolPrivateYN eq true`);

  const qs = new URLSearchParams({
    $top: String(limit),
    $filter: filters.join(" and "),
    $expand: "Media",
    $orderby: "ListPrice desc",
    $count: "true",
  });
  if (skip) qs.set("$skiptoken", skip);

  const url = `${BASE}/Property?${qs.toString()}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token()}` },
    next: { revalidate: 900 }, // 15-minute cache
  });

  if (!res.ok) {
    console.error("Spark API error:", res.status, await res.text());
    return { listings: [], nextToken: null };
  }

  const data = await res.json();
  const nextLink: string | null = data["@odata.nextLink"] ?? null;
  const nextToken = nextLink
    ? new URL(nextLink).searchParams.get("$skiptoken")
    : null;

  return { listings: data.value ?? [], nextToken };
}

export async function getListing(listingKey: string): Promise<SparkListing | null> {
  const url = `${BASE}/Property('${listingKey}')?$expand=Media`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token()}` },
    next: { revalidate: 900 },
  });
  if (!res.ok) return null;
  return res.json();
}

export function primaryPhoto(listing: SparkListing): string {
  if (listing.Media && listing.Media.length > 0) {
    const sorted = [...listing.Media].sort((a, b) => a.Order - b.Order);
    return sorted[0].MediaURL;
  }
  return "/images/listing-placeholder.jpg";
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}
