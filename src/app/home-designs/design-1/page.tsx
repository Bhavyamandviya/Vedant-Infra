import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import ProjectCard from "@/components/ProjectCard";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/motion/Reveal";
import Parallax from "@/components/motion/Parallax";
import Marquee from "@/components/motion/Marquee";
import Counter from "@/components/motion/Counter";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import HeroSlideshow from "@/components/home-designs/HeroSlideshow";
import OwnerSection from "@/components/OwnerSection";
import { listProjects } from "@/lib/projects";
import { COMPANY, KEY_FEATURES, TESTIMONIALS } from "@/lib/company";

export const dynamic = "force-static";

const STATS = [
  { n: 20, suffix: "+", label: "Years in Vadodara" },
  { n: 150, suffix: "+", label: "Residences Delivered" },
  { n: 5, suffix: "", label: "Signature Communities" },
  { n: 12, suffix: "", label: "Industry Honours" },
];

export default async function HomeDesignOne() {
  const all = await listProjects();
  const featured = all;
  const spotlight = all.find((p) => p.slug === "royal-mansions") ?? all[0];

  return (
    <main>
      <Header transparent />

      {/* ========= HERO — full-bleed cinematic slideshow ========= */}
      <section className="relative h-screen min-h-[680px] w-full overflow-hidden">
        <HeroSlideshow intervalMs={7500} />
      </section>

      {/* ========= MARQUEE STRIP ========= */}
      <section className="bg-[#111] text-white/80 border-y border-white/10 py-6">
        <Marquee
          speed={45}
          items={[
            <span key="a" className="eyebrow !text-white/80">Royal Mansions · 5BHK Individual Villa</span>,
            <span key="b" className="mark-divider" />,
            <span key="c" className="eyebrow !text-white/80">Royal Heritage Villa · 5BHK Bungalow</span>,
            <span key="d" className="mark-divider" />,
            <span key="e" className="eyebrow !text-white/80">Park Royal · 4B2HK Bungalow</span>,
            <span key="f" className="mark-divider" />,
            <span key="g" className="eyebrow !text-white/80">Royal Crest · 4BHK Bungalow</span>,
            <span key="h" className="mark-divider" />,
            <span key="i" className="eyebrow !text-white/80">Architect · Ruchir Sheth</span>,
            <span key="j" className="mark-divider" />,
          ]}
        />
      </section>

      {/* ========= WELCOME ========= */}
      <section className="bg-bg">
        <div className="container py-28 md:py-40 grid lg:grid-cols-12 gap-14 items-center">
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-4">
              <Reveal direction="up" delay={0}>
                <Parallax speed={0.12} className="relative aspect-[10/16] overflow-hidden rounded-2xl">
                  <Image src="/vedant/royalmanison/Balcony.jpg" alt="Royal Mansions" fill sizes="20vw" className="object-cover" />
                </Parallax>
              </Reveal>
              <Reveal direction="up" delay={200}>
                <Parallax speed={-0.1} className="relative aspect-[10/16] overflow-hidden rounded-2xl mt-10">
                  <Image src="/vedant/royalheritage/Balcony.jpg" alt="Royal Heritage" fill sizes="20vw" className="object-cover" />
                </Parallax>
              </Reveal>
            </div>
          </div>
          <div className="lg:col-span-7 lg:pl-8">
            <Reveal>
              <div className="eyebrow mb-6 flex items-center gap-3">
                <span className="gold-divider" />
                Welcome to {COMPANY.name}
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-8 max-w-xl">
                Brand-new lavish homes for an inspiring lifestyle.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="text-ink-secondary leading-relaxed max-w-lg mb-5">
                {COMPANY.about}
              </p>
            </Reveal>
            <Reveal delay={220}>
              <p className="text-ink-secondary leading-relaxed max-w-lg mb-10 italic">
                {COMPANY.promise}
              </p>
            </Reveal>
            <Reveal delay={280}>
              <Link href="/about" className="btn-outline">
                Discover Our Story
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ========= STATS COUNTERS ========= */}
      <section className="bg-bg border-b border-gold/10">
        <div className="container py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gold/15 border border-gold/15">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 100} className="bg-bg-elev p-10 md:p-12 text-center stat-card">
                <div className="font-serif text-5xl md:text-6xl text-ink-primary leading-none">
                  <Counter to={s.n} suffix={s.suffix} />
                </div>
                <div className="eyebrow mt-4">{s.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========= WHY VEDANT ========= */}
      <section className="bg-bg">
        <div className="container py-28 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 mb-20 items-end">
            <div className="lg:col-span-6">
              <Reveal>
                <div className="eyebrow mb-5 flex items-center gap-3">
                  <span className="gold-divider" /> Why Vedant
                </div>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.05] max-w-xl">
                  {COMPANY.whyTitle}
                </h2>
              </Reveal>
            </div>
            <Reveal delay={160} className="lg:col-span-5 lg:col-start-8">
              <p className="text-ink-secondary leading-relaxed">
                {COMPANY.whyBody}
              </p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-gold/10 border border-gold/10">
            {KEY_FEATURES.map((p, i) => (
              <Reveal key={p.title} delay={i * 80} className="bg-bg-elev p-10 md:p-12 group hover:bg-bg transition-colors">
                <div className="relative w-12 h-12 mb-8 transition-transform duration-500 group-hover:scale-110">
                  <Image src={p.icon} alt="" fill sizes="48px" className="object-contain" />
                </div>
                <h3 className="text-xl md:text-2xl leading-tight mb-4 group-hover:text-gold transition-colors">
                  {p.title}
                </h3>
                <p className="text-ink-secondary text-sm leading-relaxed">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========= FEATURED PROJECTS ========= */}
      <section className="bg-bg-elev">
        <div className="container py-28 md:py-36">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
            <div>
              <Reveal>
                <div className="eyebrow mb-5 flex items-center gap-3">
                  <span className="gold-divider" /> Featured Residences
                </div>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.05] max-w-2xl">
                  A selection of our current portfolio.
                </h2>
              </Reveal>
            </div>
            <Reveal delay={120}>
              <Link href="/projects" className="btn-outline">
                View All Projects
              </Link>
            </Reveal>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
            {featured.map((p, i) => (
              
              <Reveal key={p.slug} delay={i * 120} direction="up">
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========= SPOTLIGHT — image, no video ========= */}
      {spotlight && (
        <section className="bg-[#111] text-white">
          <div className="grid lg:grid-cols-12">
            <div className="lg:col-span-7 relative min-h-[440px] lg:min-h-[720px] overflow-hidden">
              <div className="absolute inset-0 kenburns" style={{ animationDuration: "20s" }}>
                <Image
                  src="/vedant/royalmanison/Balcony.jpg"
                  alt={spotlight.name}
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black/25" />
            </div>
            <div className="lg:col-span-5 flex items-center">
              <div className="px-8 md:px-14 py-20 lg:py-28 max-w-lg">
                <Reveal>
                  <div className="eyebrow !text-gold mb-5 flex items-center gap-3">
                    <span className="gold-divider" /> In Focus
                  </div>
                </Reveal>
                <Reveal delay={100}>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-6">
                    {spotlight.name}
                  </h2>
                </Reveal>
                <Reveal delay={160}>
                  <div className="text-white/75 mb-8">{spotlight.location}</div>
                </Reveal>
                <Reveal delay={220}>
                  <p className="text-white/80 leading-relaxed mb-10">
                    {spotlight.tagline}. Thoughtfully resolved layouts, curated
                    material palettes and a resident amenity programme that
                    prioritises calm over spectacle.
                  </p>
                </Reveal>
                <Reveal delay={280}>
                  <Link
                    href={`/projects/${spotlight.slug}`}
                    className="btn-outline-light"
                  >
                    Explore Residence
                  </Link>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========= OWNER + AWARDS ========= */}
      <OwnerSection variant="light" />

      {/* ========= TESTIMONIALS ========= */}
      <section className="bg-bg">
        <div className="container py-28 md:py-36">
          <div className="text-center mb-14">
            <Reveal>
              <div className="eyebrow mb-5 flex items-center justify-center gap-3">
                <span className="gold-divider" /> Our Residents
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
