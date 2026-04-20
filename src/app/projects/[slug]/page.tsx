import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import CTASection from "@/components/CTASection";
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

  return (
    <main>
      <Header transparent />

      {/* A. HERO */}
      <section className="relative h-[88vh] min-h-[620px] w-full overflow-hidden">
        <Image
          src={project.hero}
          alt={project.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/60" />
        <div className="relative h-full flex flex-col justify-end pb-20 md:pb-28">
          <div className="container max-w-4xl">
            <div className="eyebrow !text-white/80 mb-5">{project.location}</div>
            <h1 className="text-white text-5xl md:text-7xl leading-[1.03]">{project.name}</h1>
            {project.tagline && (
              <p className="text-white/85 mt-5 text-lg max-w-xl">{project.tagline}</p>
            )}
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href={`/book-appointment?project=${project.slug}`} className="btn-gold">Book Appointment</Link>
              {project.brochure && (
                <a href={project.brochure} download className="btn-outline-light">Download Brochure</a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* B. OVERVIEW */}
      <section className="bg-bg">
        <div className="container py-28 md:py-36 grid lg:grid-cols-12 gap-14">
          <div className="lg:col-span-5">
            <div className="eyebrow mb-5">Project Overview</div>
            <h2 className="text-4xl md:text-5xl leading-[1.08] mb-8">An enduring address.</h2>
            <p className="text-ink-secondary leading-relaxed mb-5">{project.summary}</p>
            <p className="text-ink-secondary leading-relaxed mb-10">{project.description}</p>

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

            {project.brochure && (
              <a href={project.brochure} download className="btn-outline mt-10 inline-flex">Download Brochure</a>
            )}
          </div>

          <div className="lg:col-span-7 space-y-8">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image src={project.overview.topView} alt="Top view" fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
            </div>
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image src={project.overview.elevation} alt="Elevation" fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* LAYOUTS */}
      {project.overview.layouts.length > 0 && (
        <section className="bg-white">
          <div className="container py-24 md:py-32">
            <div className="eyebrow mb-5">Layouts</div>
            <h2 className="text-4xl md:text-5xl leading-[1.08] mb-16 max-w-2xl">Thoughtfully planned floor plates.</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {project.overview.layouts.map((l) => (
                <div key={l.src} className="group">
                  <div className="relative aspect-[4/3] overflow-hidden bg-black/5">
                    <Image src={l.src} alt={l.label} fill sizes="(min-width: 1024px) 30vw, 50vw" className="object-contain p-4" />
                  </div>
                  <div className="pt-4 eyebrow">{l.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* C. AMENITIES */}
      <section className="bg-bg">
        <div className="container py-28 md:py-36">
          <div className="eyebrow mb-5">World-class Amenities</div>
          <h2 className="text-4xl md:text-5xl leading-[1.08] mb-16 max-w-2xl">Curated conveniences, everyday privilege.</h2>

          <h3 className="text-2xl md:text-3xl mb-10">Project Amenities</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-12 gap-x-6 mb-24">
            {project.projectAmenities.map((a) => (
              <div key={a.label} className="flex flex-col items-center text-center">
                <div className="w-14 h-14 relative mb-4">
                  <Image src={a.icon} alt={a.label} fill sizes="56px" className="object-contain" />
                </div>
                <div className="text-xs md:text-sm text-ink-secondary leading-snug">{a.label}</div>
              </div>
            ))}
          </div>

          <h3 className="text-2xl md:text-3xl mb-10">Villa Amenities</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-12 gap-x-6">
            {project.villaAmenities.map((a) => (
              <div key={a.label} className="flex flex-col items-center text-center">
                <div className="w-14 h-14 relative mb-4">
                  <Image src={a.icon} alt={a.label} fill sizes="56px" className="object-contain" />
                </div>
                <div className="text-xs md:text-sm text-ink-secondary leading-snug">{a.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* D. GALLERY */}
      {project.gallery.length > 0 && (
        <section className="bg-white">
          <div className="container py-28 md:py-36">
            <div className="eyebrow mb-5">Gallery</div>
            <h2 className="text-4xl md:text-5xl leading-[1.08] mb-16 max-w-2xl">Moments from {project.name}.</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
              {project.gallery.map((src, i) => (
                <div key={src} className={["relative overflow-hidden", i % 5 === 0 ? "col-span-2 aspect-[16/10]" : "aspect-square"].join(" ")}>
                  <Image src={src} alt={`${project.name} gallery ${i + 1}`} fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover" />
                </div>
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
              <div className="eyebrow mb-5">Notes & FAQs</div>
              <h2 className="text-4xl md:text-5xl leading-[1.08]">Questions, answered.</h2>
            </div>
            <div className="lg:col-span-8">
              <div className="divide-y divide-black/10 border-t border-b border-black/10">
                {project.faqs.map((f, i) => (
                  <details key={i} className="group py-6 cursor-pointer">
                    <summary className="flex justify-between items-center gap-6 list-none">
                      <span className="text-lg md:text-xl text-ink-primary pr-4">{f.q}</span>
                      <span className="text-2xl font-light text-ink-muted transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-5 text-ink-secondary leading-relaxed text-sm md:text-base">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* F. LOCATION */}
      {project.mapEmbed && (
        <section className="bg-white">
          <div className="container py-28 md:py-36 grid lg:grid-cols-12 gap-14 items-start">
            <div className="lg:col-span-4">
              <div className="eyebrow mb-5">Location</div>
              <h2 className="text-4xl md:text-5xl leading-[1.08] mb-6">{project.location}</h2>
              <p className="text-ink-secondary leading-relaxed">
                A well-connected neighbourhood with proximity to schools,
                hospitals and the city's premier retail and dining.
              </p>
            </div>
            <div className="lg:col-span-8">
              <div className="relative aspect-[16/10] bg-black/5">
                <iframe
                  src={project.mapEmbed}
                  title={`${project.name} location`}
                  className="absolute inset-0 w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
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
