import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ContactBlock } from "@/components/ContactBlock";
import { getListing, formatPrice, type SparkMedia } from "@/lib/spark";

interface PageProps {
  params: Promise<{ key: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { key } = await params;
  const listing = await getListing(key);
  if (!listing) return { title: "Listing Not Found" };
  return {
    title: `${listing.UnparsedAddress} — ${formatPrice(listing.ListPrice)}`,
    description: listing.PublicRemarks?.slice(0, 160),
  };
}

export default async function ListingPage({ params }: PageProps) {
  const { key } = await params;
  const listing = await getListing(key);
  if (!listing) notFound();

  const photos: SparkMedia[] = listing.Media
    ? [...listing.Media].sort((a, b) => a.Order - b.Order)
    : [];

  const address = [listing.StreetNumber, listing.StreetName, listing.StreetSuffix]
    .filter(Boolean)
    .join(" ");
  const unit = listing.UnitNumber ? ` #${listing.UnitNumber}` : "";
  const fullAddress = `${address}${unit}, ${listing.City}, ${listing.StateOrProvince} ${listing.PostalCode}`;

  return (
    <main className="bg-paper text-ink-950">
      <Nav />

      <div className="px-8 pt-36 pb-28 md:px-12 md:pt-44">
        <div className="mx-auto max-w-[1400px]">

          {/* Breadcrumb */}
          <div className="mb-8 flex items-center gap-2 text-[0.75rem] uppercase tracking-[0.2em] text-ink-400">
            <Link href="/buy" className="hover:text-ink-950 transition-colors">Listings</Link>
            <span>/</span>
            <span className="text-ink-700">{listing.City}</span>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_360px]">

            {/* LEFT — photos + details */}
            <div>
              {/* Primary photo */}
              {photos.length > 0 && (
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-paper-warm">
                  <Image
                    src={photos[0].MediaURL}
                    alt={fullAddress}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 70vw"
                    priority
                  />
                </div>
              )}

              {/* Photo grid */}
              {photos.length > 1 && (
                <div className="mt-3 grid grid-cols-4 gap-3">
                  {photos.slice(1, 9).map((photo, i) => (
                    <div key={i} className="relative aspect-square overflow-hidden bg-paper-warm">
                      <Image
                        src={photo.MediaURL}
                        alt={`${fullAddress} photo ${i + 2}`}
                        fill
                        className="object-cover"
                        sizes="200px"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Description */}
              <div className="mt-10 border-t border-ink-200 pt-8">
                <div className="eyebrow mb-4 text-ink-400">About this property</div>
                <p className="text-[0.98rem] leading-relaxed text-ink-800 whitespace-pre-line">
                  {listing.PublicRemarks}
                </p>
              </div>

              {/* Details grid */}
              <div className="mt-10 border-t border-ink-200 pt-8">
                <div className="eyebrow mb-6 text-ink-400">Property details</div>
                <dl className="grid grid-cols-2 gap-x-10 gap-y-4 text-sm sm:grid-cols-3">
                  {listing.PropertyType && (
                    <div>
                      <dt className="text-ink-400">Type</dt>
                      <dd className="mt-0.5 text-ink-950">{listing.PropertySubType || listing.PropertyType}</dd>
                    </div>
                  )}
                  {listing.YearBuilt && (
                    <div>
                      <dt className="text-ink-400">Year built</dt>
                      <dd className="mt-0.5 text-ink-950">{listing.YearBuilt}</dd>
                    </div>
                  )}
                  {listing.BuildingAreaTotal && (
                    <div>
                      <dt className="text-ink-400">Living area</dt>
                      <dd className="mt-0.5 text-ink-950">{Math.round(listing.BuildingAreaTotal).toLocaleString()} sf</dd>
                    </div>
                  )}
                  {listing.LotSizeSquareFeet && (
                    <div>
                      <dt className="text-ink-400">Lot size</dt>
                      <dd className="mt-0.5 text-ink-950">{Math.round(listing.LotSizeSquareFeet).toLocaleString()} sf</dd>
                    </div>
                  )}
                  {listing.AssociationYN && listing.AssociationFee && (
                    <div>
                      <dt className="text-ink-400">HOA</dt>
                      <dd className="mt-0.5 text-ink-950">
                        {formatPrice(listing.AssociationFee)} / {listing.AssociationFeeFrequency?.toLowerCase()}
                      </dd>
                    </div>
                  )}
                  {listing["Location_sp_Tax_sp_Legal_co_Mile_sp_Marker2"] && (
                    <div>
                      <dt className="text-ink-400">Mile marker</dt>
                      <dd className="mt-0.5 text-ink-950">MM {listing["Location_sp_Tax_sp_Legal_co_Mile_sp_Marker2"]}</dd>
                    </div>
                  )}
                  {listing["Location_sp_Tax_sp_Legal_co_Flood_sp_Zone"] && (
                    <div>
                      <dt className="text-ink-400">Flood zone</dt>
                      <dd className="mt-0.5 text-ink-950">{listing["Location_sp_Tax_sp_Legal_co_Flood_sp_Zone"]}</dd>
                    </div>
                  )}
                  {listing.Furnished && (
                    <div>
                      <dt className="text-ink-400">Furnished</dt>
                      <dd className="mt-0.5 text-ink-950">{listing.Furnished}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-ink-400">Days on market</dt>
                    <dd className="mt-0.5 text-ink-950">{listing.DaysOnMarket}</dd>
                  </div>
                  <div>
                    <dt className="text-ink-400">MLS #</dt>
                    <dd className="mt-0.5 text-ink-950">{listing.ListingId}</dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* RIGHT — price + contact */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-lg border border-ink-200 bg-paper-warm/40 px-6 py-7">

                <div className="text-[0.72rem] uppercase tracking-[0.2em] text-ink-400">
                  {listing.StandardStatus}
                </div>
                <div className="mt-2 font-display text-[2.5rem] leading-none text-ink-950">
                  {formatPrice(listing.ListPrice)}
                </div>

                <div className="mt-4 flex gap-5 text-sm text-ink-700">
                  <span><strong className="text-ink-950">{listing.BedroomsTotal}</strong> bd</span>
                  <span><strong className="text-ink-950">{listing.BathroomsTotalInteger}</strong> ba</span>
                  {listing.BuildingAreaTotal && (
                    <span><strong className="text-ink-950">{Math.round(listing.BuildingAreaTotal).toLocaleString()}</strong> sf</span>
                  )}
                </div>

                <div className="mt-3 text-sm text-ink-600">{fullAddress}</div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {listing.WaterfrontYN && (
                    <span className="rounded-full bg-gulf-100 px-3 py-1 text-[0.7rem] uppercase tracking-[0.16em] text-gulf-800">
                      Waterfront
                    </span>
                  )}
                  {listing.PoolPrivateYN && (
                    <span className="rounded-full bg-ink-100 px-3 py-1 text-[0.7rem] uppercase tracking-[0.16em] text-ink-600">
                      Pool
                    </span>
                  )}
                  {listing["General_sp_Property_sp_Description_co_Rentals_sp_Allowed2"] === "Yes" && (
                    <span className="rounded-full bg-ink-100 px-3 py-1 text-[0.7rem] uppercase tracking-[0.16em] text-ink-600">
                      Rentals allowed
                    </span>
                  )}
                </div>

                <div className="mt-8 space-y-3">
                  <a
                    href={`mailto:Kate@BluescapeRealEstate.com?subject=Interest in ${fullAddress}&body=Hi Kate, I'm interested in the property at ${fullAddress} listed at ${formatPrice(listing.ListPrice)}. Please contact me.`}
                    className="block w-full bg-ink-950 py-3 text-center text-[0.78rem] uppercase tracking-[0.2em] text-paper transition-opacity hover:opacity-80"
                  >
                    Email Kate about this listing
                  </a>
                  <a
                    href="tel:3052407828"
                    className="block w-full border border-ink-950 py-3 text-center text-[0.78rem] uppercase tracking-[0.2em] text-ink-950 transition-opacity hover:opacity-60"
                  >
                    Call 305-240-7828
                  </a>
                </div>

                <p className="mt-5 text-[0.7rem] text-ink-400 leading-relaxed">
                  Listing courtesy of {listing.ListOfficeName ?? "Bluescape Real Estate"}. Information deemed reliable but not guaranteed.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <ContactBlock
        title="Questions about this property?"
        accent="I know every mile marker."
      />
      <Footer />
    </main>
  );
}
