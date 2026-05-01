import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import ProjectCard from "@/components/ProjectCard";
import CTASection from "@/components/CTASection";
import { listProjects } from "@/lib/projects";

export const metadata = { title: "Our Projects — Vedant Infra" };

export default async function ProjectsPage() {
  const projects = await listProjects();
  const hero = projects[3];
  return (
    <main>
      <Header />

      <section className="pt-40 pb-16 bg-bg">
        <div className="container">
          <div className="eyebrow mb-6">Our Portfolio</div>
          <h1 className="text-5xl md:text-6xl leading-[1.05] max-w-3xl">
            Landmark residences, crafted with deliberate restraint.
          </h1>
          <p className="text-ink-secondary text-lg mt-8 max-w-2xl leading-relaxed">
            Five signature communities across Kalali, Vadodara — each
            architected by Ruchir Sheth, engineered by ZARNA Associates and
            delivered under the personal supervision of our leadership.
          </p>
        </div>
      </section>

      {/* FEATURED BANNER */}
      {hero && (
        <section className="bg-bg">
          <div className="container">
            <Link href={`/projects/${hero.slug}`} className="group block">
              <div className="relative aspect-[21/9] overflow-hidden bg-bg-elev rounded-3xl">
                <Image
                  src={hero.thumbnail}
                  alt={hero.name}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
                <div className="absolute left-0 bottom-0 p-10 md:p-16 max-w-3xl">
                  <div className="eyebrow !text-white/80 mb-5">Featured Residence</div>
                  <h2 className="text-white text-4xl md:text-6xl leading-[1.05]">{hero.name}</h2>
                  {hero.tagline && <div className="text-white/85 mt-4">{hero.tagline}</div>}
                  <div className="text-white/70 text-sm mt-2">{hero.location}</div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* INFINITE SCROLL RAIL */}
      <section className="bg-bg-elev pb-28 md:pb-36 pt-28 overflow-hidden">
        <div className="container">
          <div className="flex items-end justify-between mb-12 gap-6 flex-wrap">
            <div>
              <div className="eyebrow mb-4">All Residences</div>
              <h2 className="text-4xl md:text-5xl leading-tight max-w-xl">
                The complete portfolio.
              </h2>
            </div>
            <div className="text-sm text-ink-muted">
              {projects.length} communities
            </div>
          </div>
        </div>

        <div className="relative">
          {/* Left fade */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-24"
            style={{
              background:
                "linear-gradient(to left, transparent, var(--c-bg-elev) 80%)",
            }}
          />
          {/* Right fade */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 bottom-0 right-0 z-10 w-24"
            style={{
              background:
                "linear-gradient(to right, transparent, var(--c-bg-elev) 80%)",
            }}
          />

          <div className="flex">
            <div
              className="flex gap-8 lg:gap-12 animate-marquee"
              style={{ willChange: "transform" }}
            >
              {/* First copy */}
              {projects.map((p) => (
                <div
                  key={`a-${p.slug}`}
                  className="shrink-0 w-[280px] md:w-[320px] lg:w-[360px]"
                >
                  <ProjectCard project={p} />
                </div>
              ))}
              {/* Second copy — makes the loop invisible */}
              {projects.map((p) => (
                <div
                  key={`b-${p.slug}`}
                  className="shrink-0 w-[280px] md:w-[320px] lg:w-[360px]"
                >
                  <ProjectCard project={p} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LOCATION STORY */}
      <section className="bg-bg">
        <div className="container py-28 md:py-36 grid lg:grid-cols-12 gap-14 items-center">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/uploads/royal_mansions/sitemap.png"
                alt="Kalali, Vadodara"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-7 lg:pl-8">
            <div className="eyebrow mb-6">The Neighbourhood</div>
            <h2 className="text-4xl md:text-5xl leading-[1.08] mb-8 max-w-xl">Rooted in Kalali.</h2>
            <p className="text-ink-secondary leading-relaxed mb-5 max-w-lg">
              All of our communities are situated in Kalali, one of Vadodara's
              most peaceful and well-appointed residential neighbourhoods.
            </p>
            <p className="text-ink-secondary leading-relaxed max-w-lg">
              Well-connected to the city's premier schools, hospitals and
              retail, yet set quietly apart from the bustle — an address that
              our residents return to with relief each evening.
            </p>
          </div>
        </div>
      </section>

      <CTASection
        title="Discover your next address."
        description="Schedule a private preview with our relationship team."
      />
    </main>
  );
}