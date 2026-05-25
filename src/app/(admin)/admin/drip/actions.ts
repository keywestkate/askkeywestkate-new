"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

async function assertAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.email?.toLowerCase() !== "kate@keywestkate.com") {
    throw new Error("Unauthorized");
  }
  return supabase;
}

// ── Sequences ──────────────────────────────────────────────

export async function createSequence(formData: FormData): Promise<void> {
  const supabase = await assertAdmin();
  const name = (formData.get("name") as string).trim();
  const description = (formData.get("description") as string | null)?.trim() || null;
  if (!name) return;
  const { error } = await supabase.from("drip_sequences").insert({ name, description });
  if (error) console.error("createSequence:", error.message);
  revalidatePath("/admin/drip");
}

export async function updateSequence(id: string, formData: FormData) {
  const supabase = await assertAdmin();
  const name = (formData.get("name") as string).trim();
  const description = (formData.get("description") as string | null)?.trim() || null;
  const is_active = formData.get("is_active") === "true";
  if (!name) return { error: "Name is required" };
  const { error } = await supabase
    .from("drip_sequences")
    .update({ name, description, is_active })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/drip");
  revalidatePath(`/admin/drip/${id}`);
}

export async function deleteSequence(id: string) {
  const supabase = await assertAdmin();
  const { error } = await supabase.from("drip_sequences").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/drip");
}

// ── Steps ──────────────────────────────────────────────────

export async function upsertStep(sequenceId: string, formData: FormData) {
  const supabase = await assertAdmin();
  const stepId = (formData.get("step_id") as string | null) || null;
  const step_number = Number(formData.get("step_number"));
  const delay_days = Number(formData.get("delay_days") ?? 0);
  const subject = (formData.get("subject") as string).trim();
  const body_html = (formData.get("body_html") as string).trim();
  if (!subject || !body_html) return { error: "Subject and body are required" };

  if (stepId) {
    const { error } = await supabase
      .from("drip_steps")
      .update({ step_number, delay_days, subject, body_html })
      .eq("id", stepId);
    if (error) return { error: error.message };
  } else {
    const { error } = await supabase
      .from("drip_steps")
      .insert({ sequence_id: sequenceId, step_number, delay_days, subject, body_html });
    if (error) return { error: error.message };
  }
  revalidatePath(`/admin/drip/${sequenceId}`);
}

export async function deleteStep(sequenceId: string, stepId: string) {
  const supabase = await assertAdmin();
  const { error } = await supabase.from("drip_steps").delete().eq("id", stepId);
  if (error) return { error: error.message };
  revalidatePath(`/admin/drip/${sequenceId}`);
}

// ── Enrollments ────────────────────────────────────────────

export async function enrollClient(userId: string, sequenceId: string) {
  const supabase = await assertAdmin();

  // Get first step to set next_send_at
  const { data: firstStep } = await supabase
    .from("drip_steps")
    .select("delay_days, step_number")
    .eq("sequence_id", sequenceId)
    .order("step_number", { ascending: true })
    .limit(1)
    .single();

  const next_send_at = firstStep
    ? new Date(Date.now() + firstStep.delay_days * 86400000).toISOString()
    : null;

  const { error } = await supabase.from("drip_enrollments").upsert(
    {
      user_id: userId,
      sequence_id: sequenceId,
      status: "active",
      enrolled_at: new Date().toISOString(),
      next_send_at,
      next_step_number: firstStep?.step_number ?? 1,
    },
    { onConflict: "user_id,sequence_id" }
  );
  if (error) return { error: error.message };
  revalidatePath(`/admin/clients/${userId}`);
}

export async function updateEnrollmentStatus(
  enrollmentId: string,
  userId: string,
  status: "active" | "paused" | "cancelled"
) {
  const supabase = await assertAdmin();
  const { error } = await supabase
    .from("drip_enrollments")
    .update({ status })
    .eq("id", enrollmentId);
  if (error) return { error: error.message };
  revalidatePath(`/admin/clients/${userId}`);
}
