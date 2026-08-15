import Image from "next/image";
import { Parallax } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";
import { blurDataURL, images } from "@/lib/images";

const lines = ["Slow down.", "Breathe deep.", "Be here."];

/**
 * The signature moment of the site: no product, no offer, no button. Just the
 * ocean and three lines. Restraint is what makes it feel expensive.
 */
export function CoastalBreak() {
  return (
    <section className="relative isolate flex min-h-[88svh] items-center overflow-hidden bg-abyss">
      <div className="absolute inset-0 -z-10 scale-110">
        <Parallax distance={90} className="absolute inset-0">
          <Image
            src={images.coastalBreak.src}
            alt={images.coastalBreak.alt}
            fill
            sizes="100vw"
            placeholder="blur"
            blurDataURL={blurDataURL}
            // Favour the darker water side of the frame — the pale sand at the
            // left edge is where centred type loses its footing.
            className="object-cover object-[68%_center]"
          />
        </Parallax>
        <div className="absolute inset-0 bg-abyss/40" />
        {/* A soft pool of shade under the type. Without it, any photograph with a
            pale area — sand, foam, sky — swallows the smaller line. */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_78%_at_50%_52%,rgba(6,30,41,0.68),rgba(6,30,41,0.25)_55%,transparent_78%)]" />
        <div className="grain absolute inset-0" />
      </div>

      <div className="u-container relative py-32 text-center">
        <h2 className="t-hero font-display text-ivory drop-shadow-[0_2px_30px_rgba(6,30,41,0.35)]">
          {lines.map((line, i) => (
            <Reveal key={line} delay={i * 260} as="span" className="block">
              <span className={i === 2 ? "italic" : undefined}>{line}</span>
            </Reveal>
          ))}
        </h2>

        <Reveal delay={900}>
          <p className="mx-auto mt-12 max-w-md text-[0.9375rem] leading-relaxed text-ivory/90 [text-shadow:0_1px_14px_rgba(6,30,41,0.75)]">
            The ocean has been keeping this rhythm a lot longer than we have. A good session simply
            borrows it for an hour.
          </p>
        </Reveal>
      </div>

      <span className="eyebrow absolute bottom-8 left-1/2 -translate-x-1/2 text-ivory/75 [text-shadow:0_1px_12px_rgba(6,30,41,0.8)]">
        Santa Barbara · California
      </span>
    </section>
  );
}
