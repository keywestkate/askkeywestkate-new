import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-display-tight",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body-sans",
  subsets: ["latin"],
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
      className={`${interTight.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
