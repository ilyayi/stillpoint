import Image from "next/image";
import { Button, ArrowRight } from "@/components/ui/Button";
import { blurDataURL, images } from "@/lib/images";
import { bookHref, site } from "@/content/site";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-svh items-center overflow-hidden bg-abyss">
      <div className="absolute inset-0 -z-10">
        <Image
          src={images.openWater.src}
          alt=""
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={blurDataURL}
          className="animate-drift object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-abyss/60" />
        <div className="grain absolute inset-0" />
      </div>

      <div className="u-container py-32 text-center">
        <span className="eyebrow text-ivory/65">404</span>
        <h1 className="t-display mx-auto mt-7 max-w-2xl font-display text-ivory">
          This page drifted off somewhere.
        </h1>
        <p className="t-lead mx-auto mt-7 u-measure text-ivory/70">
          The page you were looking for isn&rsquo;t here. The ocean is still where you left it,
          though — and so is the table.
        </p>
        <div className="mt-11 flex flex-wrap justify-center gap-4">
          <Button href="/" variant="light" size="lg">
            Back to the beginning
          </Button>
          <Button href={bookHref} variant="outline-light" size="lg">
            {site.booking.label}
            <ArrowRight />
          </Button>
        </div>
      </div>
    </section>
  );
}
