import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/motion/Reveal";
import Parallax from "@/components/motion/Parallax";
import Counter from "@/components/motion/Counter";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import MosaicHero from "@/components/home-designs/MosaicHero";
import OwnerSection from "@/components/OwnerSection";
import { listProjects } from "@/lib/projects";
import { COMPANY, TESTIMONIALS } from "@/lib/company";

export const dynamic = "force-static";

const STATS = [
  { n: 20, suffix: "+", label: "Years" },
  { n: 150, suffix: "+", label: "Residences" },
  { n: 5, suffix: "", label: "Communities" },
  { n: 12, suffix: "", label: "Honours" },
];

const PROJECT_POSTERS: { slug: string; image: string; eyebrow: string; title: string; body: string }[] = [
  {
    slug: "royal-mansions",
    image: "/vedant/royalmanison/Society.jpg",
    eyebrow: "Signature Residence",
    title: "Royal Mansions",
    body: "Five-bedroom individual villas drawn around private courts, gardens and a quiet community spine.",
  },
  {
    slug: "royal-heritage-villa",
    image: "/vedant/royalheritage/Society.jpg",
    eyebrow: "Heritage Address",
    title: "Royal Heritage Villa",
    body: "An aerial composition of bungalows around a green axis — a heritage in the making.",
  },
  {
    slug: "park-royal",
    image: "/vedant/royalpark/Society.jpg",
    eyebrow: "Family Address",
    title: "Park Royal",
    body: "Four-and-a-half bedroom bungalows, generous in plan and quietly resolved at every elevation.",
  },
  {
    slug: "royal-crest",
    image: "/vedant/royalcrest/Society.jpg",
    eyebrow: "Boutique Edition",
    title: "Royal Crest",
    body: "Four-bedroom bungalows of restrained scale — a boutique address built for everyday calm.",
  },
];

export default async function HomeDesignTwo() {
  const all = await listProjects();

  return (
    <main>
      <Header transparent />

      {/* ========= HERO — full-bleed iris reveal, cycles 5 ========= */}
      <section className="relative h-screen min-h-[680px] w-full overflow-hidden">
        <MosaicHero />

        {/* Brand mark — top-right, fades in after iris opens */}
        <div
          className="absolute top-28 right-8 md:right-12 z-30 anim-fade-up text-ink-primary"
          style={{ animationDelay: "2700ms" }}
        >
          <div className="inline-flex items-center gap-3">
            <span className="text-[10px] tracking-[0.32em] uppercase">Four · One</span>
            <span className="block w-10 h-px bg-gold" />
          </div>
        </div>
      </section>

      {/* ========= STAT STRIP ========= */}
      <section className="bg-[#0e0c0a] text-white border-b border-white/10">
        <div className="container py-14">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 100}>
                <div className="text-center md:border-l md:border-white/10 md:first:border-l-0 px-6 py-4">
                  <div className="font-serif text-4xl md:text-5xl text-white leading-none">
                    <Counter to={s.n} suffix={s.suffix} />
                  </div>
                  <div className="eyebrow !text-white/60 mt-3">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========= INTRO — asymmetric ========= */}
      <section className="bg-bg">
        <div className="container py-28 md:py-40">
          <div className="grid lg:grid-cols-12 gap-10 items-end mb-20">
            <Reveal className="lg:col-span-7">
              <div className="eyebrow mb-6 flex items-center gap-3">
                <span className="gold-divider" /> Welcome to {COMPANY.name}
              </div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl leading-[1.02]">
                A studio of{" "}
                <em className="not-italic text-shine">restraint</em>,{" "}
                discipline and patience.
              </h2>
            </Reveal>
            <Reveal className="lg:col-span-4 lg:col-start-9" delay={140}>
              <p className="text-ink-secondary leading-relaxed text-[15px]">
                {COMPANY.about}
              </p>
              <Link href="/about" className="btn-outline mt-8 inline-flex">
                The Vedant Story
              </Link>
            </Reveal>
          </div>

          {/* Triple image row, staggered */}
          <div className="grid grid-cols-12 gap-4 md:gap-6">
            <Reveal direction="up" className="col-span-12 md:col-span-5">
              <Parallax speed={0.06} className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                <Image
                  src="/vedant/royalmanison/Side-night.jpg"
                  alt="Royal Mansions at night"
                  fill
                  sizes="40vw"
                  className="object-cover"
                />
              </Parallax>
            </Reveal>
            <Reveal direction="up" delay={150} className="col-span-12 md:col-span-7">
              <Parallax speed={-0.04} className="relative aspect-[16/10] overflow-hidden rounded-2xl mt-8 md:mt-16">
                <Image
                  src="/vedant/royalheritage/Society.jpg"
                  alt="Royal Heritage community"
                  fill
                  sizes="55vw"
                  className="object-cover"
                />
              </Parallax>
            </Reveal>
            <Reveal direction="up" delay={300} className="col-span-12 md:col-span-7">
              <Parallax speed={0.05} className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                <Image
                  src="/vedant/ROYALGREENPARK/Balcony.jpg"
                  alt="Royal Green Park balcony"
                  fill
                  sizes="55vw"
                  className="object-cover"
                />
              </Parallax>
            </Reveal>
            <Reveal direction="up" delay={450} className="col-span-12 md:col-span-5">
              <Parallax speed={-0.05} className="relative aspect-[16/10] overflow-hidden rounded-2xl mt-0 md:-mt-12">
                <Image
                  src="/vedant/royalcrest/Balcony.jpg"
                  alt="Royal Crest balcony"
                  fill
                  sizes="40vw"
                  className="object-cover"
                />
              </Parallax>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ========= POSTER PROJECTS — full-bleed alternating ========= */}
      <section className="bg-bg-elev">
        <div className="container pt-24 md:pt-32 pb-12">
          <div className="max-w-2xl">
            <Reveal>
              <div className="eyebrow mb-5 flex items-center gap-3">
                <span className="gold-divider" /> The Portfolio
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.04]">
                Four chapters.{" "}
                <em className="not-italic text-shine">One studio.</em>
              </h2>
            </Reveal>
          </div>
        </div>

        {PROJECT_POSTERS.map((p, i) => {
          const reverse = i % 2 === 1;
          return (
            <div
              key={p.slug}
              className={[
                "grid lg:grid-cols-12 gap-0 lg:gap-0 items-stretch",
                i % 2 === 1 ? "bg-bg" : "bg-bg-elev",
              ].join(" ")}
            >
              <div
                className={[
                  "lg:col-span-6 relative min-h-[360px] lg:min-h-[520px] overflow-hidden order-1",
                  reverse ? "lg:order-2" : "lg:order-1",
                ].join(" ")}
              >
                <Parallax speed={0.08} className="absolute inset-0">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="50vw"
                    className="object-cover transition-transform duration-[2000ms] ease-out hover:scale-[1.04]"
                  />
                </Parallax>
              </div>

              <div
                className={[
                  "lg:col-span-6 flex items-center px-8 md:px-14 py-16 lg:py-24 order-2",
                  reverse ? "lg:order-1" : "lg:order-2",
                ].join(" ")}
              >
                <div className="max-w-md">
                  <Reveal>
                    <div className="eyebrow mb-5 flex items-center gap-3 text-gold">
                      <span className="gold-divider" /> {p.eyebrow}
                    </div>
                  </Reveal>
                  <Reveal delay={100}>
                    <h3 className="text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-6">
                      {p.title}
                    </h3>
                  </Reveal>
                  <Reveal delay={160}>
                    <p className="text-ink-secondary leading-relaxed mb-8">
                      {p.body}
                    </p>
                  </Reveal>
                  <Reveal delay={220}>
                    <div className="flex flex-wrap gap-4">
                      <Link href={`/projects/${p.slug}`} className="btn-gold">
                        Explore
                      </Link>
                      <Link
                        href={`/book-appointment?project=${p.slug}`}
                        className="btn-outline"
                      >
                        Site Visit
                      </Link>
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          );
        })}

        <div className="container py-16 text-center">
          <Reveal>
            <Link href="/projects" className="btn-outline">
              View All {all.length} Projects
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ========= OWNER + AWARDS — dark variant ========= */}
      <OwnerSection variant="dark" />

      {/* ========= TESTIMONIALS ========= */}
      <section className="bg-bg">
        <div className="container py-28 md:py-36">
          <div className="text-center mb-14">
            <Reveal>
              <div className="eyebrow mb-5 flex items-center justify-center gap-3">
                <span className="gold-divider" /> Resident Voices
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.05] max-w-3xl mx-auto">
                In the words of the families who live here.
              </h2>
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
