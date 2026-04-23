import { Nav } from "@/components/Nav";
import { signout } from "@/app/(auth)/actions";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.email?.toLowerCase() !== "kate@keywestkate.com") {
    redirect("/dashboard");
  }

  return (
    <>
      <Nav theme="admin" userEmail={user.email} signout={signout} />
      <main className="min-h-screen bg-paper text-ink-950">{children}</main>
    </>
  );
}
