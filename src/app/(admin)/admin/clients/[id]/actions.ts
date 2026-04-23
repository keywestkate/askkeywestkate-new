"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateAdminNotes(
  clientId: string,
  notes: string
): Promise<{ error: string } | void> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.email?.toLowerCase() !== "kate@keywestkate.com") {
    return { error: "Unauthorized" };
  }

  const { error } = await supabase
    .from("profiles")
    .update({ admin_notes: notes || null })
    .eq("id", clientId);

  if (error) return { error: error.message };

  revalidatePath(`/admin/clients/${clientId}`);
}
