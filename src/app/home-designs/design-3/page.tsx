import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/motion/Reveal";
import Parallax from "@/components/motion/Parallax";
import OwnerSection from "@/components/OwnerSection";
import OngoingProjectsSlider from "@/components/OngoingProjectsSlider";
import CurtainHero from "@/components/home-designs/CurtainHero";
import { listProjects } from "@/lib/projects";
import { COMPANY } from "@/lib/company";

export const dynamic = "force-static";

/**
 * DESIGN 03 — "The Storyteller".
 * Distilled, vertical, chapter-based.
 * NOTE per client brief: no testimonial / "return" content.
 * Just architecture, the founder, the work, an invitation.
 */

const CHAPTERS: {
  no: string;
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  href?: string;
}[] = [
  {
    no: "I",
    eyebrow: "The Idea",
    title: "Build for the generation that follows.",
    body: "Vedant Infra is a small studio with a single conviction — that genuine craft, restraint and patience matter more than scale. Every column, every grain of stone, every curve of an arch is a quiet promise to the family that will call it home.",
    image: "/videos/Vedant-infra-promotion.mp4",
  },
  {
    no: "II",
    eyebrow: "The Work · Royal Mansions",
    title: "Five-bedroom villas drawn around private courts.",
    body: "Our flagship community — composed for light, air and the rituals of large families. Roman-inspired pillars, deep-set verandas and gardens that arrive at every door.",
    image: "/vedant/royalmanison/Society.jpg",
    href: "/projects/royal-mansions",
  },
  {
    no: "III",
    eyebrow: "The Work · Royal Heritage",
    title: "A heritage in the making.",
    body: "Bungalows arranged around a green axis — a community designed to mature gracefully, where every elevation rewards a second look.",
    image: "/vedant/royalheritage/Society.jpg",
    href: "/projects/royal-heritage-villa",
  },
  {
    no: "IV",
    eyebrow: "The Work · Park Royal",
    title: "Generous in plan, restrained in elevation.",
    body: "Four-and-a-half bedroom bungalows for families who value quiet excellence — open layouts, daylight at every hour, finishes that age beautifully.",
    image: "/vedant/royalpark/Society.jpg",
    href: "/projects/park-royal",
  },
  {
    no: "V",
    eyebrow: "The Work · Royal Crest",
    title: "A boutique address built for everyday calm.",
    body: "A small collection of four-bedroom bungalows on a quiet road — disciplined, well-built, gently scaled.",
    image: "/vedant/royalcrest/Society.jpg",
    href: "/projects/royal-crest",
  },
  {
    no: "VI",
    eyebrow: "The Work · Royal Green Park",
    title: "Green living at the heart of the city.",
    body: "A master-planned community designed around the rhythm of nature — spacious layouts, lush landscaping, and homes built for families who want sustainability without compromise.",
    image: "/vedant/ROYALGREENPARK/Society.jpg",
    href: "/projects/royal-green-park",
  },
];

export default async function HomeDesignThree() {
  const all = await listProjects();

  return (
    <main className="bg-bg">
      <Header transparent />

      {/* ========= HERO — Midnight Vault: depth parallax + halo reveal ========= */}
      <section className="relative h-screen min-h-[680px] w-full overflow-hidden bg-[#03060a] text-white">
        <CurtainHero />
      </section>

      {/* ========= INTRO LINE ========= */}
      <section className="bg-bg border-b border-black/5">
        <div className="container py-20 md:py-28">
          <Reveal>
            <p className="font-serif text-3xl md:text-5xl leading-[1.2] max-w-5xl text-ink-primary">
              Vedant Infra is a small studio in Vadodara, building bungalows and
              villas for families who value craft over spectacle.{" "}
              <span className="text-ink-muted">
                What follows is the work, in five chapters.
              </span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ========= CHAPTERS ========= */}
      <section id="chapters" className="bg-bg">
        {CHAPTERS.map((c, i) => {
          const reverse = i % 2 === 1;
          return (
            <article
              key={c.no}
              className={[
                "border-b border-black/5",
                i % 2 === 1 ? "bg-bg-elev" : "bg-bg",
              ].join(" ")}
            >
              <div className="container py-20 md:py-28">
                <div
                  className={[
                    "grid lg:grid-cols-12 gap-10 lg:gap-16 items-center",
                  ].join(" ")}
                >
                  {/* Image or Video */}
                  <div
                    className={[
                      "lg:col-span-6 order-1",
                      reverse ? "lg:order-2" : "lg:order-1",
                    ].join(" ")}
                  >
                    <Reveal direction="scale">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl lift-on-hover">
                        {c.image.endsWith('.mp4') || c.image.endsWith('.webm') ? (
                          <video
                            src={c.image}
                            controls
                            autoPlay
                            muted
                            loop
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <Parallax speed={0.05}>
                            <Image
                              src={c.image}
                              alt={c.title}
                              fill
                              sizes="60vw"
                              className="object-cover"
                            />
                          </Parallax>
                        )}
                       
                      </div>
                    </Reveal>
                  </div>

                  {/* Text */}
                  <div
                    className={[
                      "lg:col-span-6 order-2",
                      reverse ? "lg:order-1" : "lg:order-2",
                    ].join(" ")}
                  >
                    <Reveal>
                      <div className="font-serif text-7xl md:text-8xl text-gold/30 leading-none mb-6 select-none">
                        {c.no}
                      </div>
                    </Reveal>
                    <Reveal delay={100}>
                      <div className="eyebrow mb-5 flex items-center gap-3">
                        <span className="gold-divider" /> {c.eyebrow}
                      </div>
                    </Reveal>
                    <Reveal delay={160}>
                      <h2 className="text-3xl md:text-4xl lg:text-5xl leading-[1.08] mb-6">
                        {c.title}
                      </h2>
                    </Reveal>
                    <Reveal delay={220}>
                      <p className="text-ink-secondary leading-relaxed text-[15px] md:text-base mb-8">
                        {c.body}
                      </p>
                    </Reveal>
                    {c.href && (
                      <Reveal delay={280}>
                        <Link href={c.href} className="btn-outline">
                          Open This Chapter
                        </Link>
                      </Reveal>
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* ========= ONGOING PROJECTS ========= */}
      <OngoingProjectsSlider />

      {/* ========= OWNER + AWARDS — split-style on cream ========= */}
      <OwnerSection variant="light" showFullBio={false} />

      {/* ========= ABOUT INVITATION — split with image collage ========= */}
      <section className="bg-[#0e0c0a] text-white relative overflow-hidden">
        {/* Soft gold radial behind the image to anchor the eye */}
        <div
          aria-hidden
          className="absolute -top-40 -right-40 w-[34rem] h-[34rem] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(219,157,35,0.10) 0%, transparent 65%)",
          }}
        />
        <div className="container py-28 md:py-36 grid lg:grid-cols-12 gap-14 items-center relative">
          {/* Left — copy */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="eyebrow !text-gold mb-6 flex items-center gap-3">
                <span className="gold-divider" /> An Invitation
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.04] mb-8">
                {COMPANY.whyTitle}
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="text-white/75 leading-relaxed text-base md:text-lg mb-10">
                {COMPANY.whyBody}
              </p>
            </Reveal>
            <Reveal delay={220}>
              <div className="flex flex-wrap gap-4">
                <Link href="/book-appointment" className="btn-gold">
                  Book a Private Visit
                </Link>
                <Link href="/projects" className="btn-outline-light">
                  See All {all.length} Projects
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Right — image collage with floating stats */}
          <div className="lg:col-span-5 relative">
            <Reveal direction="scale">
              <div className="grid grid-cols-5 grid-rows-6 gap-3 h-[460px] md:h-[560px]">
                {/* Big primary image */}
                <div className="col-span-3 row-span-4 relative overflow-hidden rounded-2xl">
                  <Parallax speed={0.05}>
                    <Image
                      src="/vedant/royalmanison/Front-morning.jpg"
                      alt="Royal Mansions facade"
                      fill
                      sizes="30vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </Parallax>
                </div>

                {/* Top-right small */}
                <div className="col-span-2 row-span-2 relative overflow-hidden rounded-2xl">
                  <Parallax speed={-0.07}>
                    <Image
                      src="/vedant/royalheritage/Building-Entrance.jpg"
                      alt="Royal Heritage entrance"
                      fill
                      sizes="20vw"
                      className="object-cover"
                    />
                  </Parallax>
                </div>

                {/* Mid-right gold pull-quote card */}
                <div className="col-span-2 row-span-2 bg-bg-elev border border-gold/20 p-5 flex flex-col justify-between rounded-2xl">
                  <div>
                    <div className="font-serif text-5xl text-gold leading-none">20+</div>
                    <div className="text-[10px] tracking-[0.28em] uppercase text-ink-secondary mt-2">
                      Years in
                      <br />
                      Vadodara
                    </div>
                  </div>
                  <div className="text-[10px] tracking-[0.28em] uppercase text-gold">
                    Estd.
                  </div>
                </div>

                {/* Bottom-left small */}
                <div className="col-span-2 row-span-2 relative overflow-hidden rounded-2xl">
                  <Parallax speed={0.06}>
                    <Image
                      src="/vedant/royalcrest/Banner.jpg"
                      alt="Royal Crest"
                      fill
                      sizes="20vw"
                      className="object-cover"
                    />
                  </Parallax>
                </div>

                {/* Bottom-right stat card */}
                <div className="col-span-3 row-span-2 bg-bg-elev border border-gold/20 p-5 flex items-center justify-between rounded-2xl">
                  <div>
                    <div className="font-serif text-5xl text-gold leading-none">150+</div>
                    <div className="text-[10px] tracking-[0.28em] uppercase text-ink-secondary mt-2">
                      Residences delivered
                    </div>
                  </div>
                  <div className="hidden md:block w-px h-12 bg-gold/30" />
                  <div className="hidden md:block">
                    <div className="font-serif text-5xl text-gold leading-none">12</div>
                    <div className="text-[10px] tracking-[0.28em] uppercase text-ink-secondary mt-2">
                      Industry honours
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ========= FINAL CTA — minimal ========= */}
      <CTASection
        eyebrow="Private Consultation"
        title="Visit by appointment."
        description="Our relationship team conducts private site previews and in-studio consultations by prior arrangement."
      />

    </main>
  );
}
