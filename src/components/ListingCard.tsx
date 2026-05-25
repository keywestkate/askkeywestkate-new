import Image from "next/image";
import Link from "next/link";
import { type SparkListing, primaryPhoto, formatPrice } from "@/lib/spark";

export function ListingCard({ listing, index }: { listing: SparkListing; index: number }) {
  const photo = primaryPhoto(listing);
  const address = [listing.StreetNumber, listing.StreetName, listing.StreetSuffix]
    .filter(Boolean)
    .join(" ");
  const unit = listing.UnitNumber ? ` #${listing.UnitNumber}` : "";

  return (
    <article className="group flex flex-col">
      <Link href={`/listings/${listing.ListingKey}`} className="block">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-paper-warm">
          <Image
            src={photo}
            alt={address + unit}
            fill
            className="object-cover transition duration-700 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
          />
          {listing.WaterfrontYN && (
            <div className="absolute left-4 top-4">
              <span className="bg-gulf-700 px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-white">
                Waterfront
              </span>
            </div>
          )}
          <div className="absolute bottom-4 left-4">
            <span className="bg-paper/95 px-3 py-1 text-[0.72rem] uppercase tracking-[0.18em] text-ink-950">
              {formatPrice(listing.ListPrice)}
            </span>
          </div>
        </div>
      </Link>

      <div className="mt-5 flex items-baseline justify-between">
        <div className="stat-label text-ink-500">{listing.City}</div>
        <div className="stat-label text-ink-500">
          / {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      <Link href={`/listings/${listing.ListingKey}`} className="group/link mt-3 block">
        <div className="font-display text-xl leading-snug text-ink-950 group-hover/link:underline underline-offset-4">
          {listing.BedroomsTotal}bd · {listing.BathroomsTotalInteger}ba
          {listing.BuildingAreaTotal ? ` · ${Math.round(listing.BuildingAreaTotal).toLocaleString()} sf` : ""}
        </div>
        <div className="mt-1 text-sm text-ink-600 truncate">
          {address}{unit}
          {listing.SubdivisionName ? ` — ${listing.SubdivisionName}` : ""}
        </div>
      </Link>

      {listing.DaysOnMarket <= 7 && (
        <div className="mt-2">
          <span className="text-[0.68rem] uppercase tracking-[0.2em] text-gulf-700">
            New listing
          </span>
        </div>
      )}
    </article>
  );
}
