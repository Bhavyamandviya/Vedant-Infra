import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import CTASection from "@/components/CTASection";
import VideoHero from "@/components/VideoHero";
import Reveal from "@/components/motion/Reveal";
import Parallax from "@/components/motion/Parallax";
import LayoutsGallery from "@/components/LayoutsGallery";
import GalleryGrid from "@/components/GalleryGrid";
import BrochureButton from "@/components/BrochureButton";
import { getProjectContent, getProjectSlugs } from "@/lib/projects";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getProjectContent(slug);
  if (!p) return { title: "Project — Vedant Infra" };
  return { title: `${p.name} — Vedant Infra`, description: p.summary };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectContent(slug);
  if (!project) notFound();

  const HeroContent = (
    <div className="max-w-4xl">
      <div className="eyebrow !text-white/80 mb-5 anim-fade-up flex items-center gap-3" style={{ animationDelay: "200ms" }}>
        <span className="gold-divider" />
        <span>{project.location}</span>
      </div>
      <h1 className="text-white text-5xl md:text-7xl lg:text-[5.4rem] leading-[1.02] anim-fade-up" style={{ animationDelay: "350ms" }}>
        {project.name}
      </h1>
      {project.tagline && (
        <p className="text-white/85 mt-6 text-lg md:text-xl max-w-xl leading-relaxed anim-fade-up" style={{ animationDelay: "500ms" }}>
          {project.tagline}
        </p>
      )}
      <div className="mt-10 flex flex-wrap gap-4 anim-fade-up" style={{ animationDelay: "650ms" }}>
        <Link href={`/book-appointment?project=${project.slug}`} className="btn-gold">Book Appointment</Link>
        {project.brochure && (
          <BrochureButton
            pdfUrl={project.brochure}
            title={project.name}
            variant="outline-light"
            label="View Brochure"
          />
        )}
      </div>
    </div>
  );

  const facts: { label: string; value: string }[] = [];
  if (project.type) facts.push({ label: "Type", value: project.type });
  if (project.architect) facts.push({ label: "Architect", value: project.architect });
  facts.push({ label: "Location", value: project.location });
  if (project.rera) facts.push({ label: "RERA", value: project.rera });

  return (
    <main>
      <Header transparent />

      {/* A. HERO */}
      {project.heroVideo ? (
        <VideoHero src={project.heroVideo} poster={project.hero}>
          {HeroContent}
        </VideoHero>
      ) : (
        <section className="relative h-[92vh] min-h-[640px] w-full overflow-hidden">
          <div className="absolute inset-0 kenburns">
            <Image src={project.hero} alt={project.name} fill priority sizes="100vw" className="object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/15 to-black/70" />
          <div className="relative h-full flex flex-col justify-end pb-20 md:pb-28">
            <div className="container">{HeroContent}</div>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-[10px] tracking-[0.3em] uppercase flex flex-col items-center gap-2">
            <span>Scroll</span>
            <span className="w-px h-10 bg-white/30 relative overflow-hidden">
              <span className="absolute inset-x-0 top-0 h-1/2 bg-gold animate-[float-soft_2.4s_ease-in-out_infinite]" />
            </span>
          </div>
        </section>
      )}

      {/* B. QUICK FACTS STRIP */}
      <section className="border-b border-black/5 bg-white">
        <div className="container py-8 md:py-10 grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-8">
          {facts.map((f, i) => (
            <Reveal key={f.label} delay={i * 80}>
              <div className="flex flex-col gap-1.5">
                <span className="eyebrow">{f.label}</span>
                <span className="text-ink-primary text-sm md:text-base break-words">{f.value}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* C. OVERVIEW — editorial split */}
      <section className="overview-grid-bg">
        <div className="container py-28 md:py-40 grid lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <Reveal>
              <div className="eyebrow mb-5 flex items-center gap-3">
                <span className="gold-divider" /> <span>Project Overview</span>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.04] mb-8">
                An enduring <em className="not-italic text-shine">address</em>.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="text-ink-secondary leading-relaxed mb-5 text-[15px] md:text-base">{project.summary}</p>
            </Reveal>
            <Reveal delay={220}>
              <p className="text-ink-secondary leading-relaxed mb-10 text-[15px] md:text-base">{project.description}</p>
            </Reveal>

            <Reveal delay={280}>
              <div className="flex flex-wrap gap-3">
                {project.brochure && (
                  <BrochureButton
                    pdfUrl={project.brochure}
                    title={project.name}
                    variant="outline"
                    label="View Brochure"
                  />
                )}
                <Link href={`/book-appointment?project=${project.slug}`} className="btn-gold">Book a Visit</Link>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 gap-8">
            <Reveal direction="scale">
              <div className="relative aspect-[16/10] overflow-hidden lift-on-hover">
                <Parallax speed={0.06}>
                  <Image src={project.overview.topView} alt="Top view" fill sizes="60vw" className="object-cover" />
                </Parallax>
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-4 py-2 text-[10px] tracking-[0.22em] uppercase text-ink-primary">
                  Top View
                </div>
              </div>
            </Reveal>
            <Reveal direction="scale" delay={120}>
              <div className="relative aspect-[16/9] overflow-hidden lift-on-hover">
                <Parallax speed={-0.05}>
                  <Image src={project.overview.elevation} alt="Elevation" fill sizes="60vw" className="object-cover" />
                </Parallax>
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-4 py-2 text-[10px] tracking-[0.22em] uppercase text-ink-primary">
                  Elevation
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* D. LAYOUTS — clickable / zoomable */}
      {project.overview.layouts.length > 0 && (
        <section className="bg-white">
          <div className="container py-28 md:py-36">
            <div className="max-w-2xl mb-16">
              <Reveal>
                <div className="eyebrow mb-5 flex items-center gap-3">
                  <span className="gold-divider" /> <span>Floor Plans</span>
                </div>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.04] mb-5">
                  Thoughtfully planned floor plates.
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="text-ink-secondary leading-relaxed">
                  Each residence is composed for light, air and uninterrupted living.
                  Tap any plan to expand and explore in detail.
                </p>
              </Reveal>
            </div>

            <LayoutsGallery layouts={project.overview.layouts} />
          </div>
        </section>
      )}

      {/* E. AMENITIES */}
      <section className="bg-bg">
        <div className="container py-28 md:py-36">
          <div className="max-w-2xl mb-16">
            <Reveal>
              <div className="eyebrow mb-5 flex items-center gap-3">
                <span className="gold-divider" /> <span>World-class Amenities</span>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.04] mb-5">
                Curated conveniences, everyday privilege.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="text-ink-secondary leading-relaxed">
                Considered features — from intimate retreats to community-scale spaces — that bring depth to daily life.
              </p>
            </Reveal>
          </div>

          {project.projectAmenities.length > 0 && (
            <>
              <Reveal>
                <div className="flex items-center gap-4 mb-10">
                  <h3 className="text-2xl md:text-3xl text-ink-primary">Project Amenities</h3>
                  <div className="flex-1 section-rule" />
                </div>
              </Reveal>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-12 gap-x-6 mb-24">
                {project.projectAmenities.map((a, i) => (
                  <Reveal key={a.label} delay={i * 30}>
                    <div className="flex flex-col items-center text-center group cursor-default">
                      <div className="w-16 h-16 relative mb-4 transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-1">
                        <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/10 rounded-full blur-xl transition-all duration-500" />
                        <Image src={a.icon} alt={a.label} fill sizes="64px" className="object-contain relative" />
                      </div>
                      <div className="text-xs md:text-sm text-ink-secondary leading-snug group-hover:text-gold transition-colors">{a.label}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </>
          )}

          {project.villaAmenities.length > 0 && (
            <>
              <Reveal>
                <div className="flex items-center gap-4 mb-10">
                  <h3 className="text-2xl md:text-3xl text-ink-primary">Residence Amenities</h3>
                  <div className="flex-1 section-rule" />
                </div>
              </Reveal>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-12 gap-x-6">
                {project.villaAmenities.map((a, i) => (
                  <Reveal key={a.label} delay={i * 30}>
                    <div className="flex flex-col items-center text-center group cursor-default">
                      <div className="w-16 h-16 relative mb-4 transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-1">
                        <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/10 rounded-full blur-xl transition-all duration-500" />
                        <Image src={a.icon} alt={a.label} fill sizes="64px" className="object-contain relative" />
                      </div>
                      <div className="text-xs md:text-sm text-ink-secondary leading-snug group-hover:text-gold transition-colors">{a.label}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* F. GALLERY */}
      {project.gallery.length > 0 && (
        <section className="bg-white">
          <div className="container py-28 md:py-36">
            <div className="max-w-2xl mb-16">
              <Reveal>
                <div className="eyebrow mb-5 flex items-center gap-3">
                  <span className="gold-divider" /> <span>Gallery</span>
                </div>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.04] mb-5">
                  Moments from {project.name}.
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="text-ink-secondary leading-relaxed">Tap any image to view full-screen.</p>
              </Reveal>
            </div>

            <GalleryGrid images={project.gallery} projectName={project.name} />
          </div>
        </section>
      )}

      {/* G. FAQs */}
      {project.faqs.length > 0 && (
        <section className="bg-bg">
          <div className="container py-28 md:py-36 grid lg:grid-cols-12 gap-14">
            <div className="lg:col-span-4 lg:sticky lg:top-28 self-start">
              <Reveal>
                <div className="eyebrow mb-5 flex items-center gap-3">
                  <span className="gold-divider" /> <span>Notes &amp; FAQs</span>
                </div>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
                  Questions, <em className="not-italic text-shine">answered</em>.
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="text-ink-secondary leading-relaxed mt-6 max-w-md">
                  Anything we missed? Our relationship team is happy to assist with anything specific.
                </p>
              </Reveal>
              <Reveal delay={220}>
                <Link href={`/book-appointment?project=${project.slug}`} className="btn-outline mt-8 inline-flex">
                  Talk to Us
                </Link>
              </Reveal>
            </div>
            <div className="lg:col-span-8">
              <Reveal>
                <div className="divide-y divide-black/10 border-t border-b border-black/10">
                  {project.faqs.map((f, i) => (
                    <details key={i} className="group py-6 cursor-pointer">
                      <summary className="flex justify-between items-center gap-6 list-none">
                        <span className="text-lg md:text-xl text-ink-primary pr-4 group-hover:text-gold transition-colors">
                          {f.q}
                        </span>
                        <span className="faq-icon text-2xl font-light text-ink-muted transition-transform duration-300 group-hover:text-gold">+</span>
                      </summary>
                      <p className="mt-5 text-ink-secondary leading-relaxed text-sm md:text-base max-w-3xl">{f.a}</p>
                    </details>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* H. LOCATION */}
      {project.mapEmbed && (
        <section className="bg-white">
          <div className="container py-28 md:py-36 grid lg:grid-cols-12 gap-14 items-start">
            <div className="lg:col-span-4">
              <Reveal>
                <div className="eyebrow mb-5 flex items-center gap-3">
                  <span className="gold-divider" /> <span>Location</span>
                </div>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="text-4xl md:text-5xl leading-[1.08] mb-6">{project.location}</h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="text-ink-secondary leading-relaxed">
                  A well-connected neighbourhood with proximity to schools,
                  hospitals and the city&apos;s premier retail and dining.
                </p>
              </Reveal>
              <Reveal delay={220}>
                <Link href={`/book-appointment?project=${project.slug}`} className="btn-gold mt-8 inline-flex">
                  Schedule a Site Visit
                </Link>
              </Reveal>
            </div>
            <Reveal delay={200} direction="scale" className="lg:col-span-8">
              <div className="relative aspect-[16/10] bg-black/5 lift-on-hover">
                <iframe
                  src={project.mapEmbed}
                  title={`${project.name} location`}
                  className="absolute inset-0 w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* I. FINAL CTA */}
      <CTASection
        title={`Experience ${project.name} in person.`}
        description="Book a private preview with our relationship team."
      />
    </main>
  );
}
