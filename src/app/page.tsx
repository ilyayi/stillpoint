import type { Metadata } from "next";

import { Hero } from "@/components/home/Hero";
import { Philosophy } from "@/components/home/Philosophy";
import { Expertise } from "@/components/home/Expertise";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { CoastalBreak } from "@/components/home/CoastalBreak";
import { ExperienceJourney } from "@/components/home/ExperienceJourney";
import { Testimonials } from "@/components/home/Testimonials";
import { FaqPreview } from "@/components/home/FaqPreview";
import { ClosingCta } from "@/components/shared/ClosingCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/content/site";

export const metadata: Metadata = {
  ...buildMetadata({
    title: `Massage & Bodywork in ${site.location.city}`,
    description:
      "Expert massage and bodywork in Santa Barbara. Therapeutic, deep tissue, sports recovery, stretching and mobility — personalized sessions from a therapist with 750+ hours of formal training and experience in a chiropractic sports-care practice.",
    path: "/",
    keywords: [
      "massage Santa Barbara",
      "massage therapy Santa Barbara",
      "therapeutic massage Santa Barbara",
      "deep tissue massage Santa Barbara",
      "sports massage Santa Barbara",
      "relaxation massage Santa Barbara",
      "bodywork Santa Barbara",
      "wellness Santa Barbara",
    ],
  }),
  // The homepage title stands alone rather than taking the "| Name" template.
  title: `${site.name} — Massage & Bodywork in ${site.location.city}, California`,
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Philosophy />
      <Expertise />
      <ServicesPreview />
      <CoastalBreak />
      <ExperienceJourney />
      <Testimonials />
      <FaqPreview />
      <ClosingCta />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `${site.name} — Massage & Bodywork in ${site.location.city}`,
          description: site.tagline,
          url: site.url,
          about: { "@id": `${site.url.replace(/\/$/, "")}/#business` },
        }}
      />
    </>
  );
}
