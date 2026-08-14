import type { Metadata, Viewport } from "next";
import { Fraunces, Jost } from "next/font/google";
import "./globals.css";

import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { StickyBookBar } from "@/components/layout/StickyBookBar";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/content/site";
import { BASE_URL, localBusinessSchema, websiteSchema } from "@/lib/seo";

/**
 * Display face: warm, organic, low-contrast — the opposite of corporate.
 * Only the weights actually used are requested; each extra weight or style is
 * another font file on the critical path.
 */
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  weight: ["300", "400"],
  style: ["normal", "italic"],
});

/** Text face: geometric, airy, excellent in wide-tracked uppercase. */
const jost = Jost({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jost",
  weight: ["300", "400"],
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: `${site.name} — Massage & Bodywork in ${site.location.city}`,
    template: `%s | ${site.name}`,
  },
  description:
    "Expert massage and bodywork in Santa Barbara. Therapeutic, deep tissue, sports recovery, stretching and mobility — sessions built around your body by a therapist with 750+ hours of formal training.",
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  formatDetection: { telephone: true, address: true, email: true },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  category: "Health & Wellness",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f3ec" },
    { media: "(prefers-color-scheme: dark)", color: "#061e29" },
  ],
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${jost.variable}`}>
      <body className="min-h-svh antialiased">
        {/* Scroll-reveal is progressive enhancement — without JS, show everything. */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <StickyBookBar />
        <JsonLd data={[localBusinessSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
