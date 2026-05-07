import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const caviarDreams = localFont({
  src: [
    { path: "../../public/fonts/CaviarDreams.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/CaviarDreams_Italic.ttf", weight: "400", style: "italic" },
    { path: "../../public/fonts/CaviarDreams_Bold.ttf", weight: "700", style: "normal" },
    { path: "../../public/fonts/CaviarDreams_BoldItalic.ttf", weight: "700", style: "italic" },
  ],
  variable: "--font-caviar-dreams",
  display: "swap",
});

const lemonMilk = localFont({
  src: [
    { path: "../../public/fonts/LEMONMILK-Light.otf", weight: "300", style: "normal" },
    { path: "../../public/fonts/LEMONMILK-LightItalic.otf", weight: "300", style: "italic" },
    { path: "../../public/fonts/LEMONMILK-Regular.otf", weight: "400", style: "normal" },
    { path: "../../public/fonts/LEMONMILK-RegularItalic.otf", weight: "400", style: "italic" },
    { path: "../../public/fonts/LEMONMILK-Medium.otf", weight: "500", style: "normal" },
    { path: "../../public/fonts/LEMONMILK-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-lemon-milk",
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
      className={`${caviarDreams.variable} ${lemonMilk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
