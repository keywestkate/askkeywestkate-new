"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";

type ActionState = { error: string | null };

function safeReturnTo(raw: FormDataEntryValue | null): string {
  if (typeof raw !== "string") return "/dashboard";
  // Only allow internal paths to prevent open redirect
  if (!raw.startsWith("/") || raw.startsWith("//")) return "/dashboard";
  return raw;
}

export async function login(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (error) return { error: error.message };

  revalidatePath("/", "layout");
  redirect(safeReturnTo(formData.get("returnTo")));
}

export async function signup(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const supabase = await createClient();
  const email = formData.get("email") as string;

  // Prefer the explicit env var (set in Vercel); fall back to the request's
  // own origin so local dev works without any .env.local configuration.
  const headersList = await headers();
  const host = headersList.get("host") ?? "localhost:3000";
  const proto = headersList.get("x-forwarded-proto") ?? "http";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? `${proto}://${host}`;
  console.log("[signup] using siteUrl:", siteUrl);

  const { data, error } = await supabase.auth.signUp({
    email,
    password: formData.get("password") as string,
    options: {
      data: { full_name: formData.get("full_name") as string },
      emailRedirectTo: `${siteUrl}/auth/callback?next=/onboarding`,
    },
  });

  if (error) return { error: error.message };

  revalidatePath("/", "layout");

  // Email confirmation is ON — no session yet. Send to the check-email screen.
  if (!data.session) {
    redirect(`/check-your-email?email=${encodeURIComponent(email)}`);
  }

  redirect("/onboarding");
}

export async function signout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}
