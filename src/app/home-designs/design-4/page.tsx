import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/motion/Reveal";
import Parallax from "@/components/motion/Parallax";
import Counter from "@/components/motion/Counter";
import Marquee from "@/components/motion/Marquee";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import ReelHero from "@/components/home-designs/ReelHero";
import PortfolioMasonry from "@/components/home-designs/PortfolioMasonry";
import OwnerSection from "@/components/OwnerSection";
import { COMPANY, KEY_FEATURES, TESTIMONIALS } from "@/lib/company";

export const dynamic = "force-static";

const STATS = [
  { n: 20, suffix: "+", label: "Years in Vadodara" },
  { n: 150, suffix: "+", label: "Residences Delivered" },
  { n: 5, suffix: "", label: "Signature Communities" },
  { n: 12, suffix: "", label: "Industry Honours" },
];

export default function HomeDesignFour() {
  return (
    <main>
      <Header transparent />

      {/* ========= HERO — venetian strip reveal, cycles all 5 projects ========= */}
      <section className="relative h-screen min-h-[700px] w-full overflow-hidden">
        <ReelHero intervalMs={7000} />

        {/* Vertical issue ticker — left, decorative only */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 text-white/55 z-30">
          <div className="w-px h-16 bg-white/30" />
          <div
            className="text-[10px] tracking-[0.32em] uppercase rotate-180"
            style={{ writingMode: "vertical-rl" }}
          >
            Vedant · Vadodara
          </div>
          <div className="w-px h-16 bg-white/30" />
        </div>

      </section>

      {/* ========= BIG STAT BAND ========= */}
      <section className="bg-gold text-white relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(115deg, rgba(255,255,255,0.15) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.1) 100%)",
          }}
        />
        <div className="container relative py-16 grid grid-cols-2 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 100}
              className={[
                "px-6 text-center md:text-left",
                i > 0 ? "md:border-l md:border-white/20" : "",
              ].join(" ")}
            >
              <div className="font-serif text-5xl md:text-7xl text-white leading-none">
                <Counter to={s.n} suffix={s.suffix} />
              </div>
              <div className="text-[10px] tracking-[0.28em] uppercase mt-3 text-white/85">
                {s.label}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ========= INTRO — magazine spread ========= */}
      <section className="bg-bg">
        <div className="container py-28 md:py-40 grid lg:grid-cols-12 gap-14 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <Reveal>
              <div className="text-[10px] tracking-[0.32em] uppercase text-gold mb-5">
                Editor&apos;s Letter
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="font-serif text-7xl text-ink-primary leading-none select-none">
                &ldquo;
              </div>
            </Reveal>
            <Reveal delay={120}>
              <p className="font-serif text-2xl md:text-3xl leading-[1.25] text-ink-primary mt-2">
                Quiet excellence. That is the only standard worth the work.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <div className="mt-8 text-ink-secondary text-sm">
                — Darpan Patel, Founder
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-8 space-y-10">
            <Reveal>
              <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.04] max-w-2xl">
                A studio of <em className="not-italic text-shine">restraint</em>, drawn for the long quiet.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <div className="grid md:grid-cols-2 gap-x-10 gap-y-6 text-ink-secondary leading-relaxed">
                <p>{COMPANY.about}</p>
                <p>{COMPANY.aboutExtra} {COMPANY.promise}</p>
              </div>
            </Reveal>

            {/* Editorial duo image */}
            <div className="grid grid-cols-12 gap-4 md:gap-6 mt-6">
              <Reveal direction="scale" className="col-span-12 md:col-span-7">
                <Parallax speed={0.05} className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                  <Image
                    src="/vedant/royalheritage/Building.jpg"
                    alt="Royal Heritage building"
                    fill
                    sizes="55vw"
                    className="object-contain"
                  />
                </Parallax>
              </Reveal>
              <Reveal direction="scale" delay={120} className="col-span-12 md:col-span-5">
                <Parallax speed={-0.05} className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <Image
                    src="/vedant/royalmanison/Balcony.jpg"
                    alt="Royal Mansions house"
                    fill
                    sizes="40vw"
                    className="object-cover"
                  />
                </Parallax>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ========= PORTFOLIO MASONRY ========= */}
      <section className="bg-bg-elev">
        <div className="container py-24 md:py-32">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
            <div>
              <Reveal>
                <div className="text-[10px] tracking-[0.32em] uppercase text-gold mb-5">
                  The Portfolio
                </div>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.02] max-w-2xl">
                  Six frames.{" "}
                  <em className="not-italic text-shine">One language.</em>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={140}>
              <Link href="/projects" className="btn-outline">
                See All Projects
              </Link>
            </Reveal>
          </div>

          <PortfolioMasonry />
        </div>
      </section>

      {/* ========= AMENITIES STRIP — marquee ========= */}
      <section className="bg-[#0e0c0a] text-white py-20 border-y border-white/5">
        <div className="container mb-10">
          <Reveal>
            <div className="text-[10px] tracking-[0.32em] uppercase text-gold mb-5">
              The Detail
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.04] max-w-3xl">
              Six things every Vedant residence has{" "}
              <em className="not-italic text-shine">in common.</em>
            </h2>
          </Reveal>
        </div>
        <Marquee
          speed={50}
          items={KEY_FEATURES.map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-5 px-7 py-5 mr-4 rounded-2xl border border-[#d4ad55]/45 bg-[#1a1610] shadow-[0_10px_30px_-12px_rgba(212,173,85,0.20)]"
            >
              <div className="relative w-10 h-10 shrink-0">
                <Image
                  src={f.icon}
                  alt=""
                  fill
                  sizes="40px"
                  className="object-contain invert brightness-110"
                />
              </div>
              <div>
                <div className="font-serif text-lg text-[#f5efdc] leading-tight font-medium tracking-wide">
                  {f.title}
                </div>
                <div className="text-[10px] tracking-[0.26em] uppercase text-[#e8c878] mt-1.5 font-medium">
                  Vedant Standard
                </div>
              </div>
            </div>
          ))}
        />
      </section>

      {/* ========= OWNER + AWARDS — light, hero scale ========= */}
      <OwnerSection variant="light" />

      {/* ========= TESTIMONIALS ========= */}
      <section className="bg-bg">
        <div className="container py-28 md:py-36 pb-20 md:pb-24">
          <div className="grid lg:grid-cols-12 gap-10 mb-14">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="text-[10px] tracking-[0.32em] uppercase text-gold mb-5">
                  Resident Voices
                </div>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.04]">
                  In the words of the families{" "}
                  <em className="not-italic text-shine">who live here.</em>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={140} className="lg:col-span-4 lg:col-start-9 self-end">
              <p className="text-ink-secondary leading-relaxed">
                The truest measure of a home is the family that has made one of
                it. A few words from ours.
              </p>
            </Reveal>
          </div>
          <Reveal delay={160}>
            <TestimonialCarousel
              items={
                TESTIMONIALS as unknown as {
                  name: string;
                  residence: string;
                  quote: string;
                }[]
              }
            />
          </Reveal>
        </div>
      </section>

      {/* ========= FINAL CTA ========= */}
      <CTASection
        eyebrow="Private Consultation"
        title="Visit by appointment."
        description="Our relationship team conducts private site previews and in-studio consultations by prior arrangement."
      />

    </main>
  );
}
