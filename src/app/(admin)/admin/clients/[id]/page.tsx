import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { AdminNotes } from "./AdminNotes";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin — Client Detail" };

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ClientDetailPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  // Parallel fetch of all client data
  const [
    { data: profile },
    { data: buyer },
    { data: sellers },
    { data: subscriptions },
    { data: activity },
  ] = await Promise.all([
    supabase
      .from("profiles")
      .select("id, full_name, email, phone, user_type, onboarding_completed, admin_notes, created_at")
      .eq("id", id)
      .single(),
    supabase
      .from("buyer_preferences")
      .select("islands, property_types, price_min, price_max, bedrooms_min, must_haves, timeline, financing, purchase_purpose, is_first_time_buyer, alert_frequency, notes, created_at")
      .eq("user_id", id)
      .maybeSingle(),
    supabase
      .from("seller_properties")
      .select("address, island, current_use, timeline_to_sell, estimated_value_cents, reason_for_selling, needs_consultation, notes, created_at")
      .eq("user_id", id),
    supabase
      .from("newsletter_subscriptions")
      .select("island, frequency, subscribed")
      .eq("user_id", id),
    supabase
      .from("activity_log")
      .select("event_type, metadata, created_at")
      .eq("user_id", id)
      .order("created_at", { ascending: false })
      .limit(20),
  ]);

  if (!profile) notFound();

  const buyerNotes = buyer?.notes ? JSON.parse(buyer.notes as string) : null;

  return (
    <div className="px-8 pt-36 pb-28 md:px-12 md:pt-44">
      <div className="mx-auto max-w-[1400px]">

        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.2em] text-ink-400">
          <Link href="/admin/clients" className="hover:text-ink-950 transition-colors">
            Clients
          </Link>
          <span>/</span>
          <span className="text-ink-950">{profile.full_name ?? profile.email ?? id}</span>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]">

          {/* LEFT — client data */}
          <div className="space-y-10">

            {/* Profile header */}
            <div>
              <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-[0.95] text-ink-950">
                {profile.full_name ?? "No name"}
              </h1>
              <div className="mt-3 flex flex-wrap gap-4 text-sm text-ink-600">
                {profile.email && (
                  <a href={`mailto:${profile.email}`} className="hover:text-ink-950">
                    {profile.email}
                  </a>
                )}
                {profile.phone && (
                  <a href={`tel:${profile.phone.replace(/\D/g, "")}`} className="hover:text-ink-950">
                    {profile.phone}
                  </a>
                )}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full bg-ink-100 px-2.5 py-0.5 text-[0.72rem] uppercase tracking-[0.16em] text-ink-600">
                  {profile.user_type}
                </span>
                <span className={`rounded-full px-2.5 py-0.5 text-[0.72rem] uppercase tracking-[0.16em] ${profile.onboarding_completed ? "bg-gulf-100 text-gulf-800" : "bg-ink-100 text-ink-500"}`}>
                  {profile.onboarding_completed ? "Onboarded" : "Not onboarded"}
                </span>
              </div>
              <div className="mt-2 text-xs text-ink-400">
                Joined {new Date(profile.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </div>
            </div>

            {/* Buyer preferences */}
            {buyer && (
              <section className="border-t border-ink-200 pt-8">
                <div className="eyebrow mb-4 text-ink-400">Buyer preferences</div>
                <dl className="grid grid-cols-1 gap-x-8 gap-y-4 text-sm sm:grid-cols-2">
                  {buyer.islands && buyer.islands.length > 0 && (
                    <div>
                      <dt className="text-ink-400">Islands</dt>
                      <dd className="mt-0.5 text-ink-950">{buyer.islands.join(", ")}</dd>
                    </div>
                  )}
                  {buyer.property_types && buyer.property_types.length > 0 && (
                    <div>
                      <dt className="text-ink-400">Property types</dt>
                      <dd className="mt-0.5 text-ink-950">{(buyer.property_types as string[]).join(", ")}</dd>
                    </div>
                  )}
                  {(buyer.price_min || buyer.price_max) && (
                    <div>
                      <dt className="text-ink-400">Price range</dt>
                      <dd className="mt-0.5 text-ink-950">
                        {buyer.price_min ? `$${Number(buyer.price_min).toLocaleString()}` : "Any"}
                        {" — "}
                        {buyer.price_max ? `$${Number(buyer.price_max).toLocaleString()}` : "Any"}
                      </dd>
                    </div>
                  )}
                  {buyer.bedrooms_min != null && (
                    <div>
                      <dt className="text-ink-400">Bedrooms min</dt>
                      <dd className="mt-0.5 text-ink-950">{buyer.bedrooms_min}</dd>
                    </div>
                  )}
                  {buyer.must_haves && (buyer.must_haves as string[]).length > 0 && (
                    <div className="sm:col-span-2">
                      <dt className="text-ink-400">Must-haves</dt>
                      <dd className="mt-0.5 text-ink-950">{(buyer.must_haves as string[]).join(", ")}</dd>
                    </div>
                  )}
                  {buyer.timeline && (
                    <div>
                      <dt className="text-ink-400">Timeline</dt>
                      <dd className="mt-0.5 text-ink-950">{buyer.timeline}</dd>
                    </div>
                  )}
                  {buyer.financing && (
                    <div>
                      <dt className="text-ink-400">Financing</dt>
                      <dd className="mt-0.5 text-ink-950">{buyer.financing}</dd>
                    </div>
                  )}
                  {buyer.purchase_purpose && (
                    <div>
                      <dt className="text-ink-400">Purchase purpose</dt>
                      <dd className="mt-0.5 text-ink-950">{buyer.purchase_purpose}</dd>
                    </div>
                  )}
                  {buyer.alert_frequency && (
                    <div>
                      <dt className="text-ink-400">Alert frequency</dt>
                      <dd className="mt-0.5 text-ink-950">{buyer.alert_frequency}</dd>
                    </div>
                  )}
                  {buyerNotes?.why_the_keys && (
                    <div className="sm:col-span-2">
                      <dt className="text-ink-400">Why the Keys</dt>
                      <dd className="mt-0.5 italic text-ink-700">&ldquo;{buyerNotes.why_the_keys}&rdquo;</dd>
                    </div>
                  )}
                  {buyerNotes?.boat && buyerNotes.boat.has_boat !== "no" && (
                    <div className="sm:col-span-2">
                      <dt className="text-ink-400">Boat</dt>
                      <dd className="mt-0.5 text-ink-950">
                        {buyerNotes.boat.has_boat === "plan" ? "Plans to get one" : "Has a boat"}
                        {buyerNotes.boat.length_ft ? ` — ${buyerNotes.boat.length_ft} ft` : ""}
                        {buyerNotes.boat.draft_ft ? `, ${buyerNotes.boat.draft_ft} ft draft` : ""}
                        {buyerNotes.boat.type ? ` (${buyerNotes.boat.type})` : ""}
                      </dd>
                    </div>
                  )}
                </dl>
              </section>
            )}

            {/* Seller properties */}
            {sellers && sellers.length > 0 && (
              <section className="border-t border-ink-200 pt-8">
                <div className="eyebrow mb-4 text-ink-400">Seller property{sellers.length > 1 ? "ies" : ""}</div>
                {sellers.map((s, i) => (
                  <div key={i} className="mb-6 rounded-lg border border-ink-200 p-5">
                    <dl className="grid grid-cols-1 gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
                      {s.address && (
                        <div className="sm:col-span-2">
                          <dt className="text-ink-400">Address</dt>
                          <dd className="mt-0.5 text-ink-950">{s.address}</dd>
                        </div>
                      )}
                      {s.island && (
                        <div>
                          <dt className="text-ink-400">Island</dt>
                          <dd className="mt-0.5 text-ink-950">{s.island}</dd>
                        </div>
                      )}
                      {s.current_use && (
                        <div>
                          <dt className="text-ink-400">Current use</dt>
                          <dd className="mt-0.5 text-ink-950">{s.current_use}</dd>
                        </div>
                      )}
                      {s.timeline_to_sell && (
                        <div>
                          <dt className="text-ink-400">Timeline to sell</dt>
                          <dd className="mt-0.5 text-ink-950">{s.timeline_to_sell}</dd>
                        </div>
                      )}
                      {s.estimated_value_cents && (
                        <div>
                          <dt className="text-ink-400">Estimated value</dt>
                          <dd className="mt-0.5 text-ink-950">
                            ${(Number(s.estimated_value_cents) / 100).toLocaleString()}
                          </dd>
                        </div>
                      )}
                      {s.reason_for_selling && (
                        <div className="sm:col-span-2">
                          <dt className="text-ink-400">Reason for selling</dt>
                          <dd className="mt-0.5 text-ink-700">{s.reason_for_selling}</dd>
                        </div>
                      )}
                      <div>
                        <dt className="text-ink-400">Needs consultation</dt>
                        <dd className="mt-0.5 text-ink-950">{s.needs_consultation ? "Yes" : "No"}</dd>
                      </div>
                    </dl>
                  </div>
                ))}
              </section>
            )}

            {/* Newsletter subscriptions */}
            {subscriptions && subscriptions.length > 0 && (
              <section className="border-t border-ink-200 pt-8">
                <div className="eyebrow mb-4 text-ink-400">Newsletter subscriptions</div>
                <div className="flex flex-wrap gap-2">
                  {subscriptions.map((s) => (
                    <span
                      key={s.island}
                      className="rounded-full bg-ink-100 px-3 py-1 text-[0.72rem] uppercase tracking-[0.16em] text-ink-600"
                    >
                      {s.island === "__newsletter__" ? "Tide News" : s.island}
                      {" · "}{s.frequency}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Activity log */}
            {activity && activity.length > 0 && (
              <section className="border-t border-ink-200 pt-8">
                <div className="eyebrow mb-4 text-ink-400">Activity</div>
                <ul className="space-y-2">
                  {activity.map((a, i) => (
                    <li key={i} className="flex items-start gap-4 text-sm">
                      <span className="shrink-0 text-ink-400">
                        {new Date(a.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span className="text-ink-700">{a.event_type}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

          </div>

          {/* RIGHT — admin notes */}
          <div>
            <AdminNotes clientId={id} initialNotes={profile.admin_notes ?? ""} />
          </div>

        </div>
      </div>
    </div>
  );
}
