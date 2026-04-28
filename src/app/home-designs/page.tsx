import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Reveal from "@/components/motion/Reveal";

export const dynamic = "force-static";

const DESIGNS = [
  {
    href: "/home-designs/design-1",
    label: "Design 01",
    name: "Editorial Cinematic",
    blurb:
      "A classic luxury magazine layout — full-bleed imagery, generous whitespace and a Cormorant headline that breathes. Auto-rotating image hero with kenburns motion.",
    cover: "/vedant/HomePage/1.jpg",
    accent: "Image hero · Magazine grid · Awards integrated",
  },
  {
    href: "/home-designs/design-2",
    label: "Design 02",
    name: "Cinematic Mosaic",
    blurb:
      "Four images compose into one as you arrive. Asymmetric storytelling, project showcases as full-bleed posters and a moody noir founder section.",
    cover: "/vedant/HomePage/2.jpg",
    accent: "Mosaic hero · Asymmetric grid · Noir founder",
  },
  {
    href: "/home-designs/design-3",
    label: "Design 03",
    name: "The Storyteller",
    blurb:
      "Distilled. Five chapters, five frames. No testimonials, no quote returns — just architecture, the founder and the work. Best for clients who want a quieter site.",
    cover: "/vedant/HomePage/3.jpg",
    accent: "No Return content · Vertical chapters · Pure focus",
    highlight: "No Return / Testimonial section",
  },
  {
    href: "/home-designs/design-4",
    label: "Design 04",
    name: "Modern Magazine",
    blurb:
      "Bold contemporary type, an auto-cycling slideshow hero, large stat strips and a portfolio masonry. Rich animations and a hero-scale founder spread.",
    cover: "/vedant/HomePage/4.jpg",
    accent: "Slideshow hero · Bold type · Masonry portfolio",
  },
];

export default function HomeDesignsIndex() {
  return (
    <main className="bg-bg min-h-screen">
      <Header transparent />

      {/* Intro */}
      <section className="relative overflow-hidden border-b border-gold/10 bg-bg-elev">
        <div
          aria-hidden
          className="absolute -top-40 -right-40 w-[40rem] h-[40rem] rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(circle, rgba(219,157,35,0.15) 0%, transparent 60%)",
          }}
        />
        <div className="container relative pt-40 md:pt-48 pb-20">
          <Reveal>
            <div className="eyebrow mb-5 flex items-center gap-3">
              <span className="gold-divider" />
              <span>Client Preview · Internal</span>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl leading-[1.04] max-w-4xl">
              Four directions for the new{" "}
              <em className="not-italic text-shine">Vedant Infra</em> homepage.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 text-ink-secondary leading-relaxed max-w-2xl">
              Each design uses the new Vedant photography (no video). They share
              the same content but propose distinct narratives — so the client
              can choose the mood that best represents the brand.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Design grid */}
      <section className="container py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-14">
          {DESIGNS.map((d, i) => (
            <Reveal key={d.href} delay={i * 120} direction="up">
              <Link
                href={d.href}
                className="group block bg-bg-elev border border-gold/10 hover:border-gold/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_70px_-30px_rgba(219,157,35,0.30)] rounded-2xl overflow-hidden"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={d.cover}
                    alt={d.name}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  <div className="absolute top-5 left-5 bg-bg-elev/95 backdrop-blur border border-gold/30 px-3.5 py-1.5 text-[10px] tracking-[0.22em] uppercase text-gold">
                    {d.label}
                  </div>
                  {d.highlight && (
                    <div className="absolute top-5 right-5 bg-gold text-[#0a0805] px-3.5 py-1.5 text-[10px] tracking-[0.22em] uppercase">
                      {d.highlight}
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-7">
                    <div className="font-serif text-3xl md:text-4xl text-white leading-tight">
                      {d.name}
                    </div>
                  </div>
                </div>
                <div className="p-7 md:p-8">
                  <p className="text-ink-secondary leading-relaxed mb-5">
                    {d.blurb}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] tracking-[0.22em] uppercase text-ink-muted">
                      {d.accent}
                    </div>
                    <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase text-ink-primary group-hover:text-gold transition-colors">
                      Preview
                      <svg width="22" height="10" viewBox="0 0 22 10" fill="none">
                        <path d="M0 5h20M16 1l4 4-4 4" stroke="currentColor" strokeWidth="1" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}>
          <div className="mt-20 border-t border-gold/10 pt-10 flex flex-wrap items-center justify-between gap-6">
            <div className="text-sm text-ink-secondary">
              Once approved, the chosen design will replace the current home
              page at <code className="text-gold">/</code>.
            </div>
            <Link href="/" className="btn-outline">
              View Current Home
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
