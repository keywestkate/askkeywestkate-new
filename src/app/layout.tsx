import type { Metadata } from "next";
import localFont from "next/font/local";
import { Fraunces } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const modernSerif = localFont({
  src: [
    { path: "../../public/fonts/ModernSerif.ttf", weight: "100 900", style: "normal" },
    { path: "../../public/fonts/ModernSerif-Italic.ttf", weight: "100 900", style: "italic" },
  ],
  variable: "--font-modern-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://askkeywestkate.com"),
  title: {
    default:
      "Kate Baldwin — Selling a Lifestyle in Key West & the Florida Keys",
    template: "%s · Kate Baldwin",
  },
  description:
    "Luxury waterfront real estate in Key West and the Florida Keys. Homes on the water, boating, fishing, and life on a sand bar — Kate Baldwin, Bluescape Real Estate.",
  openGraph: {
    title: "Kate Baldwin — Selling a Lifestyle",
    description:
      "Luxury waterfront real estate in Key West and the Florida Keys.",
    url: "https://askkeywestkate.com",
    siteName: "Kate Baldwin",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${modernSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
