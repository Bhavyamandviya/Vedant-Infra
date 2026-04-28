import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import ProjectCard from "@/components/ProjectCard";
import CTASection from "@/components/CTASection";
import VideoHero from "@/components/VideoHero";
import Reveal from "@/components/motion/Reveal";
import Parallax from "@/components/motion/Parallax";
import Marquee from "@/components/motion/Marquee";
import Counter from "@/components/motion/Counter";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import { listProjects } from "@/lib/projects";
import { COMPANY, KEY_FEATURES, TESTIMONIALS, TROPHIES } from "@/lib/company";

export const dynamic = "force-static";

const STATS = [
  { n: 20,  suffix: "+", label: "Years in Vadodara" },
  { n: 150, suffix: "+", label: "Residences Delivered" },
  { n: 5,   suffix: "",  label: "Signature Communities" },
  { n: 12,  suffix: "",  label: "Industry Honours" }
];

export default async function HomePage() {
  const all = await listProjects();
  const featured = all.slice(0, 3);
  const spotlight = all.find((p) => p.slug === "royal-mansions") ?? all[0];

  return (
    <main>
      <Header transparent />

      {/* ========= 1. VIDEO HERO ========= */}
      <VideoHero src="/videos/HomePageVideo.mp4" poster="/uploads/royal_mansions/banner.png">
        <div className="max-w-4xl">
          <div className="eyebrow !text-white/80 mb-6 anim-fade-up" style={{ animationDelay: "200ms" }}>
            Vedant Infra · Est. Vadodara
          </div>
          <h1 className="text-white text-5xl md:text-7xl lg:text-[5.2rem] leading-[1.02] max-w-3xl anim-fade-up" style={{ animationDelay: "350ms" }}>
            Residences crafted for a quieter kind of luxury.
          </h1>
          <p className="text-white/85 mt-6 max-w-xl text-base md:text-lg leading-relaxed anim-fade-up" style={{ animationDelay: "500ms" }}>
            A portfolio of landmark villas and bungalows in Vadodara, designed
            with architectural restraint and enduring detail.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 anim-fade-up" style={{ animationDelay: "650ms" }}>
            <Link href="/book-appointment" className="btn-gold">Book Appointment</Link>
            <Link href="/projects" className="btn-outline-light">View Projects</Link>
          </div>
        </div>
      </VideoHero>

      {/* ========= 2. MARQUEE STRIP ========= */}
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
            <span key="k" className="eyebrow !text-white/80">Structure · ZARNA Associates</span>,
            <span key="l" className="mark-divider" />
          ]}
        />
      </section>

      {/* ========= 3. WELCOME / ABOUT ========= */}
      <section className="bg-bg">
        <div className="container py-28 md:py-40 grid lg:grid-cols-12 gap-14 items-center">
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-4">
              <Reveal direction="up" delay={0}>
                <Parallax speed={0.12} className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <Image src="/uploads/royal_crest/about.png" alt="About" fill sizes="20vw" className="object-cover" />
                </Parallax>
              </Reveal>
              <Reveal direction="up" delay={200}>
                <Parallax speed={-0.1} className="relative aspect-[4/5] overflow-hidden rounded-2xl mt-10">
                  <Image src="/uploads/royal_heritage_villa/club_house.jpg" alt="Club" fill sizes="20vw" className="object-cover" />
                </Parallax>
              </Reveal>
            </div>
          </div>
          <div className="lg:col-span-7 lg:pl-8">
            <Reveal><div className="eyebrow mb-6">Welcome to {COMPANY.name}</div></Reveal>
            <Reveal delay={80}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-8 max-w-xl">
                Brand-new lavish homes for an inspiring lifestyle.
              </h2>
            </Reveal>
            <Reveal delay={160}><p className="text-ink-secondary leading-relaxed max-w-lg mb-5">{COMPANY.about}</p></Reveal>
            <Reveal delay={220}><p className="text-ink-secondary leading-relaxed max-w-lg mb-10 italic">{COMPANY.promise}</p></Reveal>
            <Reveal delay={280}><Link href="/about" className="btn-outline">Discover Our Story</Link></Reveal>
          </div>
        </div>
      </section>

      {/* ========= 4. LOGO VIDEO LAUNCH ========= */}
      <section className="bg-[#0e0e0e] text-white">
        <div className="container py-24 md:py-32 grid lg:grid-cols-12 gap-14 items-center">
          <div className="lg:col-span-5">
            <Reveal><div className="eyebrow !text-gold mb-6">A New Identity</div></Reveal>
            <Reveal delay={80}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-8 max-w-md">
                The next chapter of Vedant Infra.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="text-white/75 leading-relaxed max-w-md mb-10">
                A refreshed mark. The same conviction. Our identity has been
                redrawn for a new decade of residences — quieter, more
                considered, unmistakably Vedant.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <Link href="/about" className="btn-outline-light">The Story</Link>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal direction="scale">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 group">
                <video
                  src="/videos/logo.mp4"
                  autoPlay muted loop playsInline preload="metadata"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-5 left-5 eyebrow !text-white/80">New Logo Film</div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ========= 5. STATS COUNTERS ========= */}
      <section className="bg-bg border-b border-gold/10">
        <div className="container py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gold/10 border border-gold/10">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 100} className="bg-bg-elev p-10 md:p-12 text-center">
                <div className="font-serif text-5xl md:text-6xl text-ink-primary leading-none">
                  <Counter to={s.n} suffix={s.suffix} />
                </div>
                <div className="eyebrow mt-4">{s.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========= 6. WHY — MORE THAN A BUNGALOW ========= */}
      <section className="bg-bg">
        <div className="container py-28 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 mb-20 items-end">
            <div className="lg:col-span-6">
              <Reveal><div className="eyebrow mb-5">Why Vedant</div></Reveal>
              <Reveal delay={80}>
                <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.05] max-w-xl">
                  {COMPANY.whyTitle}
                </h2>
              </Reveal>
            </div>
            <Reveal delay={160} className="lg:col-span-5 lg:col-start-8">
              <p className="text-ink-secondary leading-relaxed">{COMPANY.whyBody}</p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-gold/10 border border-gold/10">
            {KEY_FEATURES.map((p, i) => (
              <Reveal key={p.title} delay={i * 80} className="bg-bg-elev p-10 md:p-12 group hover:bg-bg transition-colors">
                <div className="relative w-12 h-12 mb-8 transition-transform duration-500 group-hover:scale-110">
                  <Image src={p.icon} alt="" fill sizes="48px" className="object-contain" />
                </div>
                <h3 className="text-xl md:text-2xl leading-tight mb-4 group-hover:text-gold transition-colors">{p.title}</h3>
                <p className="text-ink-secondary text-sm leading-relaxed">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========= 7. FEATURED PROJECTS ========= */}
      <section className="bg-bg-elev">
        <div className="container py-28 md:py-36">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
            <div>
              <Reveal><div className="eyebrow mb-5">Featured Residences</div></Reveal>
              <Reveal delay={80}>
                <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.05] max-w-2xl">
                  A selection of our current portfolio.
                </h2>
              </Reveal>
            </div>
            <Reveal delay={120}><Link href="/projects" className="btn-outline">View All Projects</Link></Reveal>
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

      {/* ========= 8. SPOTLIGHT — ROYAL MANSIONS with video ========= */}
      {spotlight && (
        <section className="bg-[#111] text-white">
          <div className="grid lg:grid-cols-12">
            <div className="lg:col-span-7 relative min-h-[440px] lg:min-h-[720px] overflow-hidden">
              <video
                src="/videos/RoyalMansion.mp4"
                autoPlay muted loop playsInline preload="metadata"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/25" />
            </div>
            <div className="lg:col-span-5 flex items-center">
              <div className="px-8 md:px-14 py-20 lg:py-28 max-w-lg">
                <Reveal><div className="eyebrow !text-gold mb-5">In Focus</div></Reveal>
                <Reveal delay={100}><h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-6">{spotlight.name}</h2></Reveal>
                <Reveal delay={160}><div className="text-white/75 mb-8">{spotlight.location}</div></Reveal>
                <Reveal delay={220}>
                  <p className="text-white/80 leading-relaxed mb-10">
                    {spotlight.tagline}. Thoughtfully resolved layouts, curated
                    material palettes and a resident amenity programme that
                    prioritises calm over spectacle.
                  </p>
                </Reveal>
                <Reveal delay={280}>
                  <Link href={`/projects/${spotlight.slug}`} className="btn-outline-light">Explore Residence</Link>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========= 9. TROPHIES / RECOGNITION ========= */}
      <section className="bg-bg">
        <div className="container pt-28 md:pt-36 pb-12">
          <div className="text-center mb-14">
            <Reveal><div className="eyebrow mb-5">Recognition</div></Reveal>
            <Reveal delay={80}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.08] max-w-3xl mx-auto">
                A trophy cabinet built, quietly, over two decades.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="text-ink-secondary mt-6 max-w-xl mx-auto">
                A selection of honours received across architectural and
                residential design categories.
              </p>
            </Reveal>
          </div>
        </div>
        <Marquee
          speed={55}
          items={TROPHIES.map((src, i) => (
            <div key={i} className="relative w-[220px] md:w-[260px] aspect-[3/4] overflow-hidden rounded-2xl bg-bg-elev shadow-sm border border-gold/10">
              <Image src={src} alt={`Award ${i + 1}`} fill sizes="260px" className="object-cover" />
            </div>
          ))}
        />
        <Marquee
          speed={65}
          reverse
          className="mt-4"
          items={TROPHIES.slice().reverse().map((src, i) => (
            <div key={`r-${i}`} className="relative w-[180px] md:w-[220px] aspect-[3/4] overflow-hidden rounded-2xl bg-bg-elev shadow-sm border border-gold/10">
              <Image src={src} alt={`Award ${i + 1}`} fill sizes="220px" className="object-cover" />
            </div>
          ))}
        />
        <div className="container pb-28 md:pb-36 pt-12 text-center">
          <Reveal><Link href="/about#awards" className="btn-outline">See All Awards</Link></Reveal>
        </div>
      </section>

      {/* ========= 10. BRAND FILM (promotion video) ========= */}
      <section className="relative bg-[#0a0a0a]">
        <div className="container py-28 md:py-36 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 text-white">
            <Reveal><div className="eyebrow !text-gold mb-5">The Brand Film</div></Reveal>
            <Reveal delay={80}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-8 max-w-md">
                A minute inside Vedant Infra.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="text-white/75 leading-relaxed max-w-md mb-10">
                A short film on who we are, how we build and why families
                choose Vedant Infra for their most important address.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <Link href="/book-appointment" className="btn-gold">Book Appointment</Link>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal direction="scale">
              <div className="relative mx-auto aspect-[9/16] max-w-[340px] rounded-[26px] overflow-hidden border border-white/10 shadow-2xl">
                <video
                  src="/videos/Vedant-infra-promotion.mp4"
                  autoPlay muted loop playsInline controls preload="metadata"
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ========= 11. TESTIMONIALS ========= */}
      <section className="bg-bg">
        <div className="container py-28 md:py-36">
          <div className="text-center mb-14">
            <Reveal><div className="eyebrow mb-5">Our Residents</div></Reveal>
            <Reveal delay={80}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.05] max-w-3xl mx-auto">
                In the words of the families who live here.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={160}><TestimonialCarousel items={TESTIMONIALS as unknown as { name: string; residence: string; quote: string }[]} /></Reveal>
        </div>
      </section>

      {/* ========= 12. FINAL CTA ========= */}
      <CTASection
        eyebrow="Private Consultation"
        title="Visit by appointment."
        description="Our relationship team conducts private site previews and in-studio consultations by prior arrangement."
      />
    </main>
  );
}
