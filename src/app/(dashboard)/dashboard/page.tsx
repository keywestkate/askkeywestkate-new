import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Nav } from "@/components/Nav";
import { signout } from "@/app/(auth)/actions";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const displayName =
    user.user_metadata?.full_name ?? user.email ?? "there";

  return (
    <main className="min-h-screen bg-paper text-ink-950">
      <Nav theme="dashboard" userEmail={user.email} signout={signout} />

      <section className="px-8 pt-40 pb-28 md:px-12 md:pt-52 md:pb-36">
        <div className="mx-auto max-w-[1600px]">
          <div className="eyebrow text-ink-500">Client Portal</div>
          <h1 className="mt-6 font-display text-[clamp(3rem,8vw,7rem)] leading-[0.92] tracking-[-0.04em] text-ink-950">
            Dashboard —<br />
            <span className="text-gulf-700">coming together.</span>
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-ink-800">
            Welcome, {displayName}. Saved searches, favorites, and market
            alerts are on the way.
          </p>
          <p className="mt-3 text-sm text-ink-500">{user.email}</p>
        </div>
      </section>
    </main>
  );
}
