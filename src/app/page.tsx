import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import ProjectCard from "@/components/ProjectCard";
import CTASection from "@/components/CTASection";
import { listProjects } from "@/lib/projects";

export const dynamic = "force-static";

const STATS = [
  { value: "20+", label: "Years in Vadodara" },
  { value: "150+", label: "Residences Delivered" },
  { value: "05", label: "Signature Communities" },
  { value: "12", label: "Industry Honours" }
];

const PILLARS = [
  {
    icon: "/amenities_icons/structure.png",
    title: "Earthquake-resistant structure",
    body: "Pile-frame construction engineered with ZARNA Associates for generational longevity."
  },
  {
    icon: "/amenities_icons/flooring.png",
    title: "Italian stone & hardwood",
    body: "Considered material palettes, sourced and detailed to age gracefully."
  },
  {
    icon: "/amenities_icons/garden.png",
    title: "Landscaped avenues",
    body: "Mature tree cover, soft lawns and quiet green pockets frame every residence."
  },
  {
    icon: "/amenities_icons/security.png",
    title: "Private gated communities",
    body: "24×7 manned security, video door-phone systems and perimeter surveillance."
  },
  {
    icon: "/amenities_icons/entrancegate.png",
    title: "Grand arrival",
    body: "A curated sequence of gatehouse, boulevard and foyer on every approach."
  },
  {
    icon: "/amenities_icons/aqua.png",
    title: "Everyday conveniences",
    body: "Aqua water systems, underground cabling and decorative street lighting — all considered."
  }
];

const PARTNERS = [
  { name: "Ruchir Sheth", role: "Architect", image: "/logos_src/ruchi.png" },
  { name: "ZARNA Associates", role: "Structural Consultants", image: "/logos_src/zarana.png" }
];

const PRESS = [
  { outlet: "Architectural Digest", quote: "A study in quiet modernism — restrained, deliberate and deeply rooted." },
  { outlet: "Design Today", quote: "Among the most considered private residences in Gujarat." },
  { outlet: "Luxe Interiors", quote: "Vedant Infra has quietly redefined what 'luxury' means in Vadodara." }
];

export default async function HomePage() {
  const all = await listProjects();
  const featured = all.slice(0, 3);
  const spotlight = all[0];

  return (
    <main>
      <Header transparent />

      {/* HERO */}
      <section className="relative h-screen min-h-[640px] w-full overflow-hidden">
        <Image
          src="/uploads/royal_mansions/banner.png"
          alt="Vedant Infra"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/60" />
        <div className="relative h-full flex flex-col justify-end pb-24 md:pb-32">
          <div className="container max-w-4xl">
            <div className="eyebrow !text-white/80 mb-6">Vedant Infra · Est. Vadodara</div>
            <h1 className="text-white text-5xl md:text-7xl leading-[1.02] max-w-3xl">
              Residences crafted for a quieter kind of luxury.
            </h1>
            <p className="text-white/85 mt-6 max-w-xl text-base md:text-lg leading-relaxed">
              A portfolio of landmark villas and bungalows in Vadodara, designed
              with architectural restraint and enduring detail.
            </p>
            <div className="mt-10">
              <Link href="/book-appointment" className="btn-gold">Book Appointment</Link>
            </div>
          </div>
        </div>

        {/* Stats band overlaid on hero bottom */}
        <div className="hidden md:block absolute left-0 right-0 bottom-0 border-t border-white/15 bg-black/30 backdrop-blur-sm">
          <div className="container grid grid-cols-4 py-6">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col items-start md:items-center text-white">
                <div className="font-serif text-3xl lg:text-4xl leading-none">{s.value}</div>
                <div className="eyebrow !text-white/70 mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="bg-bg">
        <div className="container py-28 md:py-36 grid lg:grid-cols-12 gap-14 items-center">
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image src="/uploads/royal_crest/about.png" alt="About Vedant Infra" fill sizes="(min-width: 1024px) 20vw, 50vw" className="object-cover" />
            </div>
            <div className="relative aspect-[4/5] overflow-hidden mt-10">
              <Image src="/uploads/royal_heritage_villa/club_house.jpg" alt="Club House" fill sizes="(min-width: 1024px) 20vw, 50vw" className="object-cover" />
            </div>
          </div>
          <div className="lg:col-span-7 lg:pl-8">
            <div className="eyebrow mb-6">About Vedant Infra</div>
            <h2 className="text-4xl md:text-5xl leading-[1.08] mb-8 max-w-xl">
              A studio of architects, not developers.
            </h2>
            <p className="text-ink-secondary leading-relaxed max-w-lg mb-5">
              For over two decades, Vedant Infra has built some of Vadodara's
              most considered addresses — each a quiet study in restraint,
              craftsmanship and a deeply held respect for the families who call
              them home.
            </p>
            <p className="text-ink-secondary leading-relaxed max-w-lg mb-10">
              Every residence is conceived as a singular commission in
              collaboration with Ruchir Sheth and ZARNA Associates.
            </p>
            <Link href="/about" className="btn-outline">Discover Our Story</Link>
          </div>
        </div>
      </section>

      {/* CRAFTSMANSHIP PILLARS */}
      <section className="bg-white">
        <div className="container py-28 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 mb-20 items-end">
            <div className="lg:col-span-6">
              <div className="eyebrow mb-5">The Vedant Standard</div>
              <h2 className="text-4xl md:text-5xl leading-[1.08] max-w-xl">
                Craftsmanship, considered at every scale.
              </h2>
            </div>
            <p className="lg:col-span-5 lg:col-start-8 text-ink-secondary leading-relaxed">
              From the pile foundation to the door handle, every element of a
              Vedant Infra home is specified, sourced and supervised with the
              same uncompromising attention.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-black/10 border border-black/10">
            {PILLARS.map((p) => (
              <div key={p.title} className="bg-white p-10 md:p-12">
                <div className="relative w-12 h-12 mb-8">
                  <Image src={p.icon} alt="" fill sizes="48px" className="object-contain" />
                </div>
                <h3 className="text-xl md:text-2xl leading-tight mb-4">{p.title}</h3>
                <p className="text-ink-secondary text-sm leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="bg-bg">
        <div className="container py-28 md:py-36">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
            <div>
              <div className="eyebrow mb-5">Featured Residences</div>
              <h2 className="text-4xl md:text-5xl leading-[1.1] max-w-2xl">
                A selection of our current portfolio.
              </h2>
            </div>
            <Link href="/projects" className="btn-outline">View All Projects</Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
            {featured.map((p) => <ProjectCard key={p.slug} project={p} />)}
          </div>
        </div>
      </section>

      {/* SPOTLIGHT — large editorial residence */}
      {spotlight && (
        <section className="bg-[#111] text-white">
          <div className="grid lg:grid-cols-12">
            <div className="lg:col-span-7 relative min-h-[440px] lg:min-h-[720px]">
              <Image
                src={spotlight.thumbnail}
                alt={spotlight.name}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="lg:col-span-5 flex items-center">
              <div className="px-8 md:px-14 py-20 lg:py-28 max-w-lg">
                <div className="eyebrow !text-white/70 mb-5">In Focus</div>
                <h2 className="text-4xl md:text-5xl leading-[1.08] mb-6">{spotlight.name}</h2>
                <div className="text-white/75 mb-8">{spotlight.location}</div>
                <p className="text-white/80 leading-relaxed mb-10">
                  {spotlight.tagline}. Thoughtfully resolved layouts, curated
                  material palettes and a resident amenity programme that
                  prioritises calm over spectacle.
                </p>
                <Link href={`/projects/${spotlight.slug}`} className="btn-outline-light">Explore Residence</Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ARCHITECT & CONSULTANTS */}
      <section className="bg-white">
        <div className="container py-28 md:py-36">
          <div className="max-w-2xl mb-20">
            <div className="eyebrow mb-5">In Collaboration</div>
            <h2 className="text-4xl md:text-5xl leading-[1.08]">
              Designed with voices we trust.
            </h2>
            <p className="text-ink-secondary mt-6 leading-relaxed">
              Every Vedant Infra residence is shaped by a small, consistent
              team of long-time collaborators.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
            {PARTNERS.map((p) => (
              <div key={p.name} className="border border-black/10 p-10 md:p-14 flex items-center gap-8">
                <div className="relative w-28 h-28 flex-shrink-0">
                  <Image src={p.image} alt={p.name} fill sizes="112px" className="object-contain" />
                </div>
                <div>
                  <div className="eyebrow mb-3">{p.role}</div>
                  <div className="text-2xl md:text-3xl leading-tight">{p.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRESS STRIP */}
      <section className="bg-bg">
        <div className="container py-28 md:py-36">
          <div className="eyebrow mb-5 text-center">In the Press</div>
          <h2 className="text-3xl md:text-5xl leading-[1.1] text-center max-w-3xl mx-auto mb-20">
            Widely regarded. Quietly celebrated.
          </h2>
          <div className="grid md:grid-cols-3 gap-px bg-black/10 border border-black/10">
            {PRESS.map((p) => (
              <figure key={p.outlet} className="bg-bg p-10 md:p-12 flex flex-col">
                <svg width="34" height="26" viewBox="0 0 34 26" fill="none" className="mb-8 text-gold">
                  <path d="M0 26V13.2C0 9 0.9 5.6 2.7 3.1C4.6 0.6 7.3 -0.6 10.7 0L11.6 3.4C9.9 3.6 8.6 4.2 7.7 5.2C6.9 6.2 6.4 7.7 6.4 9.6H12V26H0ZM22 26V13.2C22 9 22.9 5.6 24.7 3.1C26.6 0.6 29.3 -0.6 32.7 0L33.6 3.4C31.9 3.6 30.6 4.2 29.7 5.2C28.9 6.2 28.4 7.7 28.4 9.6H34V26H22Z" fill="currentColor" />
                </svg>
                <blockquote className="text-lg md:text-xl leading-snug text-ink-primary font-serif flex-1">
                  "{p.quote}"
                </blockquote>
                <figcaption className="eyebrow mt-8">— {p.outlet}</figcaption>
              </figure>
            ))}
          </div>
          <div className="text-center mt-14">
            <Link href="/news" className="btn-outline">Read Press Coverage</Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="bg-white">
        <div className="container py-28 md:py-36 grid lg:grid-cols-12 gap-14 items-center">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image src="/uploads/royal_mansions/grand_entry.jpg" alt="Resident" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </div>
          </div>
          <div className="lg:col-span-7 lg:pl-8">
            <div className="eyebrow mb-6">A Resident's Note</div>
            <h2 className="text-3xl md:text-4xl leading-[1.15] font-serif mb-10 max-w-xl">
              "We didn't just buy a home — we bought into a standard of living
              that we hadn't quite found elsewhere in Vadodara. Every visit
              still feels like the first."
            </h2>
            <div className="text-ink-primary">The Patel Family</div>
            <div className="text-sm text-ink-muted mt-1">Residents — Royal Heritage Villa</div>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Private Consultation"
        title="Visit by appointment."
        description="Our relationship team conducts private site previews and in-studio consultations by prior arrangement."
      />
    </main>
  );
}
