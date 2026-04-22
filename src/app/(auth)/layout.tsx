import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav theme="dark" />
      <main className="min-h-screen bg-paper pt-32 pb-24 md:pt-40 md:pb-36">
        {children}
      </main>
      <Footer />
    </>
  );
}
