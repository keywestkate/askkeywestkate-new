import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getResend, FROM_EMAIL, mergeTags } from "@/lib/resend";

// Runs daily via Vercel Cron. Protected by CRON_SECRET.
export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const now = new Date().toISOString();

  // Fetch all active enrollments where next_send_at is due
  const { data: due, error: fetchError } = await supabase
    .from("drip_enrollments")
    .select(`
      id,
      user_id,
      sequence_id,
      next_step_number,
      profiles(full_name, email),
      drip_sequences(id, name)
    `)
    .eq("status", "active")
    .lte("next_send_at", now);

  if (fetchError) {
    console.error("Drip cron fetch error:", fetchError);
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  const results: { userId: string; status: string; error?: string }[] = [];

  for (const enrollment of due ?? []) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const profile = (enrollment.profiles as any) as { full_name: string | null; email: string | null } | null;

    if (!profile?.email) {
      results.push({ userId: enrollment.user_id, status: "skipped_no_email" });
      continue;
    }

    // Get the step to send
    const { data: step } = await supabase
      .from("drip_steps")
      .select("id, step_number, delay_days, subject, body_html")
      .eq("sequence_id", enrollment.sequence_id)
      .eq("step_number", enrollment.next_step_number)
      .single();

    if (!step) {
      // No more steps — mark completed
      await supabase
        .from("drip_enrollments")
        .update({ status: "completed", next_send_at: null })
        .eq("id", enrollment.id);
      results.push({ userId: enrollment.user_id, status: "completed" });
      continue;
    }

    const firstName = profile.full_name?.split(" ")[0] ?? "there";
    const fullName = profile.full_name ?? profile.email;

    const subject = mergeTags(step.subject, { first_name: firstName, full_name: fullName });
    const html = mergeTags(step.body_html, { first_name: firstName, full_name: fullName });

    // Send via Resend
    const { data: sent, error: sendError } = await getResend().emails.send({
      from: FROM_EMAIL,
      to: profile.email,
      subject,
      html: html.includes("<") ? html : html.replace(/\n/g, "<br>"),
    });

    if (sendError) {
      await supabase.from("drip_sends").insert({
        enrollment_id: enrollment.id,
        step_id: step.id,
        user_id: enrollment.user_id,
        status: "failed",
      });
      results.push({ userId: enrollment.user_id, status: "failed", error: sendError.message });
      continue;
    }

    // Log the send
    await supabase.from("drip_sends").insert({
      enrollment_id: enrollment.id,
      step_id: step.id,
      user_id: enrollment.user_id,
      resend_id: sent?.id ?? null,
      status: "sent",
    });

    // Advance to next step
    const { data: nextStep } = await supabase
      .from("drip_steps")
      .select("step_number, delay_days")
      .eq("sequence_id", enrollment.sequence_id)
      .gt("step_number", step.step_number)
      .order("step_number", { ascending: true })
      .limit(1)
      .single();

    if (nextStep) {
      const nextSendAt = new Date(Date.now() + nextStep.delay_days * 86400000).toISOString();
      await supabase
        .from("drip_enrollments")
        .update({ next_step_number: nextStep.step_number, next_send_at: nextSendAt })
        .eq("id", enrollment.id);
      results.push({ userId: enrollment.user_id, status: "sent_advancing" });
    } else {
      await supabase
        .from("drip_enrollments")
        .update({ status: "completed", next_send_at: null })
        .eq("id", enrollment.id);
      results.push({ userId: enrollment.user_id, status: "sent_completed" });
    }
  }

  return NextResponse.json({ processed: results.length, results });
}
