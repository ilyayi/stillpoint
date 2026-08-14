import Image from "next/image";
import { Button, ArrowRight } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Section";
import { WaveDivider } from "@/components/ui/Wave";
import { about } from "@/content/about";
import { blurDataURL, images } from "@/lib/images";

export function Expertise() {
  return (
    <section className="relative isolate overflow-hidden bg-deep text-ivory">
      <WaveDivider fill="var(--color-ivory)" flip className="absolute inset-x-0 top-0 z-10" />

      {/* Ground image, held well back so type stays effortless to read */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={images.expertise.src}
          alt=""
          fill
          sizes="100vw"
          placeholder="blur"
          blurDataURL={blurDataURL}
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-deep via-deep/85 to-abyss" />
        <div className="grain absolute inset-0" />
      </div>

      <div className="u-container py-28 md:py-40">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow tone="light">Expertise</Eyebrow>
            </Reveal>
            <Reveal delay={90}>
              <h2 className="t-display mt-7 font-display text-ivory">Experience you can feel.</h2>
            </Reveal>
            <Reveal delay={170}>
              <p className="t-lead mt-8 text-ivory/75">
                Technique can be taught in a classroom. Judgement is built one body at a time — and
                the difference shows up in the first five minutes of a session.
              </p>
            </Reveal>
            <Reveal delay={230}>
              <p className="mt-6 text-ivory/60">
                750+ hours of formal training at the Santa Barbara Body Therapy Institute, further
                work in Genius of Flexibility and RFST, and professional experience alongside Dr.
                Hunter Ford at Ford Chiropractic &amp; Sports Care — where massage was often the
                work performed immediately before a chiropractic adjustment, at a volume of 50+
                clients a week.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <Button href="/about" variant="outline-light" className="mt-10">
                Read the full story
                <ArrowRight />
              </Button>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            {/* The numbers */}
            <dl className="grid gap-px overflow-hidden rounded-2xl bg-ivory/12 sm:grid-cols-2">
              {about.credentials.map((c, i) => (
                <Reveal key={c.label} delay={i * 80} className="bg-deep/80 backdrop-blur-sm">
                  <div className="h-full p-7 md:p-9">
                    <dt className="font-display text-[2.6rem] leading-none text-shoal">
                      {c.figure}
                    </dt>
                    <dd className="mt-4">
                      <span className="block text-sm tracking-[0.1em] text-ivory uppercase">
                        {c.label}
                      </span>
                      <span className="mt-3 block text-sm leading-relaxed text-ivory/70">
                        {c.detail}
                      </span>
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>

            {/* The toolkit */}
            <Reveal delay={200}>
              <div className="mt-12">
                <h3 className="eyebrow text-ivory/65">Hands-on techniques</h3>
                <ul className="mt-6 flex flex-wrap gap-2.5">
                  {about.techniques.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-ivory/18 px-4 py-2 text-sm text-ivory/75 transition-colors duration-500 hover:border-shoal/60 hover:text-ivory"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <WaveDivider fill="var(--color-ivory)" className="absolute inset-x-0 bottom-0" />
    </section>
  );
}
