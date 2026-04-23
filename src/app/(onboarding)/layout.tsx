import { Nav } from "@/components/Nav";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav theme="dark" />
      <main className="min-h-screen bg-paper">{children}</main>
    </>
  );
}
