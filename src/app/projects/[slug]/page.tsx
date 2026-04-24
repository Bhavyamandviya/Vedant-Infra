import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import CTASection from "@/components/CTASection";
import VideoHero from "@/components/VideoHero";
import Reveal from "@/components/motion/Reveal";
import Parallax from "@/components/motion/Parallax";
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
      <div className="eyebrow !text-white/80 mb-5 anim-fade-up" style={{ animationDelay: "200ms" }}>
        {project.location}
      </div>
      <h1 className="text-white text-5xl md:text-7xl lg:text-[5.2rem] leading-[1.03] anim-fade-up" style={{ animationDelay: "350ms" }}>
        {project.name}
      </h1>
      {project.tagline && (
        <p className="text-white/85 mt-5 text-lg max-w-xl anim-fade-up" style={{ animationDelay: "500ms" }}>
          {project.tagline}
        </p>
      )}
      <div className="mt-10 flex flex-wrap gap-4 anim-fade-up" style={{ animationDelay: "650ms" }}>
        <Link href={`/book-appointment?project=${project.slug}`} className="btn-gold">Book Appointment</Link>
        {project.brochure && (
          <a href={project.brochure} target="_blank" rel="noopener" className="btn-outline-light">Download Brochure</a>
        )}
      </div>
    </div>
  );

  return (
    <main>
      <Header transparent />

      {/* A. HERO — video for Royal Mansions, image for others */}
      {project.heroVideo ? (
        <VideoHero src={project.heroVideo} poster={project.hero}>
          {HeroContent}
        </VideoHero>
      ) : (
        <section className="relative h-[88vh] min-h-[620px] w-full overflow-hidden">
          <div className="absolute inset-0 kenburns">
            <Image src={project.hero} alt={project.name} fill priority sizes="100vw" className="object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/60" />
          <div className="relative h-full flex flex-col justify-end pb-20 md:pb-28">
            <div className="container">{HeroContent}</div>
          </div>
        </section>
      )}

      {/* B. OVERVIEW */}
      <section className="bg-bg">
        <div className="container py-28 md:py-36 grid lg:grid-cols-12 gap-14">
          <div className="lg:col-span-5">
            <Reveal><div className="eyebrow mb-5">Project Overview</div></Reveal>
            <Reveal delay={80}><h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-8">An enduring address.</h2></Reveal>
            <Reveal delay={160}><p className="text-ink-secondary leading-relaxed mb-5">{project.summary}</p></Reveal>
            <Reveal delay={220}><p className="text-ink-secondary leading-relaxed mb-10">{project.description}</p></Reveal>

            <Reveal delay={280}>
              <div className="space-y-3 text-sm border-t border-black/10 pt-6">
                {project.type && (
                  <div className="flex justify-between gap-4">
                    <span className="eyebrow">Type</span>
                    <span className="text-ink-primary">{project.type}</span>
                  </div>
                )}
                {project.architect && (
                  <div className="flex justify-between gap-4">
                    <span className="eyebrow">Architect</span>
                    <span className="text-ink-primary">{project.architect}</span>
                  </div>
                )}
                {project.rera && (
                  <div className="flex justify-between gap-4">
                    <span className="eyebrow">RERA</span>
                    <span className="text-ink-primary text-right break-all">{project.rera}</span>
                  </div>
                )}
                <div className="flex justify-between gap-4">
                  <span className="eyebrow">Location</span>
                  <span className="text-ink-primary">{project.location}</span>
                </div>
              </div>
            </Reveal>

            {project.brochure && (
              <Reveal delay={340}>
                <a href={project.brochure} target="_blank" rel="noopener" className="btn-outline mt-10 inline-flex">Download Brochure</a>
              </Reveal>
            )}
          </div>

          <div className="lg:col-span-7 space-y-8">
            <Reveal direction="scale">
              <Parallax speed={0.08} className="relative aspect-[16/10]">
                <Image src={project.overview.topView} alt="Top view" fill sizes="55vw" className="object-cover" />
              </Parallax>
            </Reveal>
            <Reveal direction="scale" delay={100}>
              <Parallax speed={-0.06} className="relative aspect-[16/9]">
                <Image src={project.overview.elevation} alt="Elevation" fill sizes="55vw" className="object-cover" />
              </Parallax>
            </Reveal>
          </div>
        </div>
      </section>

      {/* LAYOUTS */}
      {project.overview.layouts.length > 0 && (
        <section className="bg-white">
          <div className="container py-24 md:py-32">
            <Reveal><div className="eyebrow mb-5">Layouts</div></Reveal>
            <Reveal delay={80}><h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-16 max-w-2xl">Thoughtfully planned floor plates.</h2></Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {project.overview.layouts.map((l, i) => (
                <Reveal key={l.src} delay={i * 60}>
                  <div className="group">
                    <div className="relative aspect-[4/3] overflow-hidden bg-black/5 transition-shadow group-hover:shadow-xl">
                      <Image src={l.src} alt={l.label} fill sizes="30vw" className="object-contain p-4 transition-transform duration-700 group-hover:scale-[1.05]" />
                    </div>
                    <div className="pt-4 eyebrow">{l.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* C. AMENITIES */}
      <section className="bg-bg">
        <div className="container py-28 md:py-36">
          <Reveal><div className="eyebrow mb-5">World-class Amenities</div></Reveal>
          <Reveal delay={80}><h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-16 max-w-2xl">Curated conveniences, everyday privilege.</h2></Reveal>

          <Reveal><h3 className="text-2xl md:text-3xl mb-10">Project Amenities</h3></Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-12 gap-x-6 mb-24">
            {project.projectAmenities.map((a, i) => (
              <Reveal key={a.label} delay={i * 40}>
                <div className="flex flex-col items-center text-center group cursor-default">
                  <div className="w-14 h-14 relative mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1">
                    <Image src={a.icon} alt={a.label} fill sizes="56px" className="object-contain" />
                  </div>
                  <div className="text-xs md:text-sm text-ink-secondary leading-snug group-hover:text-gold transition-colors">{a.label}</div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal><h3 className="text-2xl md:text-3xl mb-10">Villa Amenities</h3></Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-12 gap-x-6">
            {project.villaAmenities.map((a, i) => (
              <Reveal key={a.label} delay={i * 40}>
                <div className="flex flex-col items-center text-center group cursor-default">
                  <div className="w-14 h-14 relative mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1">
                    <Image src={a.icon} alt={a.label} fill sizes="56px" className="object-contain" />
                  </div>
                  <div className="text-xs md:text-sm text-ink-secondary leading-snug group-hover:text-gold transition-colors">{a.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* D. GALLERY */}
      {project.gallery.length > 0 && (
        <section className="bg-white">
          <div className="container py-28 md:py-36">
            <Reveal><div className="eyebrow mb-5">Gallery</div></Reveal>
            <Reveal delay={80}><h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-16 max-w-2xl">Moments from {project.name}.</h2></Reveal>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
              {project.gallery.map((src, i) => (
                <Reveal key={src} delay={i * 60} direction="scale">
                  <div className={["relative overflow-hidden group", i % 5 === 0 ? "col-span-2 aspect-[16/10]" : "aspect-square"].join(" ")}>
                    <Image src={src} alt={`${project.name} gallery ${i + 1}`} fill sizes="33vw" className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* E. FAQs */}
      {project.faqs.length > 0 && (
        <section className="bg-bg">
          <div className="container py-28 md:py-36 grid lg:grid-cols-12 gap-14">
            <div className="lg:col-span-4">
              <Reveal><div className="eyebrow mb-5">Notes & FAQs</div></Reveal>
              <Reveal delay={80}><h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.05]">Questions, answered.</h2></Reveal>
            </div>
            <div className="lg:col-span-8">
              <Reveal>
                <div className="divide-y divide-black/10 border-t border-b border-black/10">
                  {project.faqs.map((f, i) => (
                    <details key={i} className="group py-6 cursor-pointer">
                      <summary className="flex justify-between items-center gap-6 list-none">
                        <span className="text-lg md:text-xl text-ink-primary pr-4 group-hover:text-gold transition-colors">{f.q}</span>
                        <span className="text-2xl font-light text-ink-muted transition-transform group-open:rotate-45 group-hover:text-gold">+</span>
                      </summary>
                      <p className="mt-5 text-ink-secondary leading-relaxed text-sm md:text-base">{f.a}</p>
                    </details>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* F. LOCATION */}
      {project.mapEmbed && (
        <section className="bg-white">
          <div className="container py-28 md:py-36 grid lg:grid-cols-12 gap-14 items-start">
            <div className="lg:col-span-4">
              <Reveal><div className="eyebrow mb-5">Location</div></Reveal>
              <Reveal delay={80}><h2 className="text-4xl md:text-5xl leading-[1.08] mb-6">{project.location}</h2></Reveal>
              <Reveal delay={160}>
                <p className="text-ink-secondary leading-relaxed">
                  A well-connected neighbourhood with proximity to schools,
                  hospitals and the city's premier retail and dining.
                </p>
              </Reveal>
            </div>
            <Reveal delay={200} direction="scale" className="lg:col-span-8">
              <div className="relative aspect-[16/10] bg-black/5">
                <iframe src={project.mapEmbed} title={`${project.name} location`} className="absolute inset-0 w-full h-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* G. FINAL CTA */}
      <CTASection
        title={`Experience ${project.name} in person.`}
        description="Book a private preview with our relationship team."
      />
    </main>
  );
}
