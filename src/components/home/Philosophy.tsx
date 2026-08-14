import Image from "next/image";
import { Button, ArrowRight } from "@/components/ui/Button";
import { Parallax } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Section";
import { WaveRule } from "@/components/ui/Wave";
import { blurDataURLLight, images } from "@/lib/images";

const qualities = [
  { title: "Body awareness", body: "Noticing what you are actually holding, and where." },
  { title: "Recovery", body: "Giving hard-working tissue a real chance to reset." },
  { title: "Mobility", body: "Range you can move through, not just reach." },
  { title: "Presence", body: "Attention that settles back into the body it belongs to." },
];

export function Philosophy() {
  return (
    <section className="relative overflow-hidden bg-ivory py-24 md:py-36">
      <div className="u-container">
        <div className="grid items-start gap-16 lg:grid-cols-12 lg:gap-20">
          {/* Statement */}
          <div className="lg:col-span-6 lg:pt-10">
            <Reveal>
              <Eyebrow>Philosophy</Eyebrow>
            </Reveal>

            <Reveal delay={90}>
              <h2 className="t-display mt-7 font-display text-deep">
                Wellness isn&rsquo;t always about doing more.
                <span className="block text-ocean italic">
                  Sometimes it&rsquo;s about becoming still enough to feel what&rsquo;s already
                  there.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={180}>
              <div className="mt-9 space-y-6 text-ink-soft u-measure">
                <p className="t-lead">
                  Most of us live a little ahead of ourselves — already in the next hour, the next
                  task, the next thing. The body keeps score of that, quietly, in the shoulders and
                  the jaw and the hips.
                </p>
                <p>
                  Bodywork is one of the few things that reliably brings attention back. Not because
                  someone tells you to relax, but because skilled hands give your nervous system
                  something specific and safe to pay attention to. From there, the rest tends to
                  follow on its own.
                </p>
              </div>
            </Reveal>

            <Reveal delay={260}>
              <WaveRule className="mt-12" />
            </Reveal>

            <Reveal delay={300}>
              <dl className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
                {qualities.map((q) => (
                  <div key={q.title} className="border-t border-dune/60 pt-5">
                    <dt className="font-display text-xl text-deep">{q.title}</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-ink-soft">{q.body}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={360}>
              <Button href="/experience" variant="quiet" className="mt-12 group">
                See how a session unfolds
                <ArrowRight />
              </Button>
            </Reveal>
          </div>

          {/* Image */}
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <Reveal delay={120}>
              <figure className="relative">
                <div className="grain relative aspect-[4/5] overflow-hidden rounded-t-[14rem] rounded-b-[3rem]">
                  <Parallax distance={44} className="absolute inset-0">
                    <Image
                      src={images.philosophy.src}
                      alt={images.philosophy.alt}
                      fill
                      sizes="(min-width: 1024px) 46vw, 100vw"
                      placeholder="blur"
                      blurDataURL={blurDataURLLight}
                      className="scale-110 object-cover"
                    />
                  </Parallax>
                </div>
                <figcaption className="mt-6 flex items-center gap-3 text-xs tracking-[0.14em] text-ink-faint uppercase">
                  <span aria-hidden className="h-px w-8 bg-dune" />
                  The Pacific, three miles from the table
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
