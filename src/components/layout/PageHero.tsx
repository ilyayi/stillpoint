import Image from "next/image";
import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Section";
import { WaveDivider } from "@/components/ui/Wave";
import { blurDataURL, type ImageSlot } from "@/lib/images";

/**
 * The opening band on every page except the homepage. Same proportions and same
 * type rhythm each time, so moving between pages feels like one place.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  children,
  size = "md",
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  image: ImageSlot;
  children?: ReactNode;
  size?: "sm" | "md";
  align?: "left" | "center";
}) {
  const centered = align === "center";
  return (
    <header className="relative isolate overflow-hidden bg-abyss">
      <div className="absolute inset-0">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={blurDataURL}
          className="animate-drift object-cover opacity-80"
        />
        <div className="scrim-full absolute inset-0" />
        {/* Guarantees the transparent header stays legible, whatever the photo does up there. */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-abyss/75 to-transparent" />
        <div className="grain absolute inset-0" />
      </div>

      <div
        className={`u-container relative flex flex-col justify-end ${
          size === "sm" ? "min-h-[52svh] pt-36 pb-20" : "min-h-[68svh] pt-40 pb-24 md:pb-28"
        } ${centered ? "items-center text-center" : ""}`}
      >
        {eyebrow && (
          <Reveal>
            <Eyebrow tone="light" className={centered ? "justify-center" : ""}>
              {eyebrow}
            </Eyebrow>
          </Reveal>
        )}
        <Reveal delay={90}>
          <h1
            className={`t-display mt-6 text-ivory ${centered ? "mx-auto max-w-4xl" : "max-w-4xl"}`}
          >
            {title}
          </h1>
        </Reveal>
        {lead && (
          <Reveal delay={180}>
            <p className={`t-lead mt-7 text-ivory/75 u-measure-wide ${centered ? "mx-auto" : ""}`}>
              {lead}
            </p>
          </Reveal>
        )}
        {children && (
          <Reveal delay={260}>
            <div className={`mt-10 flex flex-wrap gap-4 ${centered ? "justify-center" : ""}`}>
              {children}
            </div>
          </Reveal>
        )}
      </div>

      <WaveDivider className="absolute inset-x-0 bottom-0" />
    </header>
  );
}
