import Link from "next/link";
import { Button, ArrowRight } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/Section";
import { ServiceCard } from "@/components/services/ServiceCard";
import { activeServices } from "@/content/services";

export function ServicesPreview() {
  const featured = activeServices.slice(0, 6);

  return (
    <section id="services" className="bg-ivory py-24 md:py-36">
      <div className="u-container">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Sessions"
            title={
              <>
                Different bodies. <span className="text-ocean italic">Different work.</span>
              </>
            }
            lead="Every session is built around what you bring in that day. These are the starting points — the pressure, pacing and technique are decided together, once my hands are on you."
          />
          <Reveal delay={120}>
            <Button href="/services" variant="secondary" className="shrink-0">
              All services
              <ArrowRight />
            </Button>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {featured.map((service, i) => (
            <Reveal key={service.slug} delay={(i % 3) * 90}>
              <div className="h-full">
                <ServiceCard service={service} priority={i < 3} />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-12 text-center text-sm text-ink-faint">
            Not sure which one?{" "}
            <Link href="/services/customized-bodywork" className="link-underline text-ocean">
              Customized Bodywork
            </Link>{" "}
            covers everything — we decide together in the first few minutes.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
