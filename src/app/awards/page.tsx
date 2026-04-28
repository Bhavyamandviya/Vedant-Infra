import Image from "next/image";
import Header from "@/components/Header";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/motion/Reveal";
import Marquee from "@/components/motion/Marquee";
import { TROPHIES } from "@/lib/company";

export const metadata = { title: "Awards & Recognition — Vedant Infra" };

const HONOURS = [
  { year: "2024", title: "Luxury Villa Project of the Year", body: "Royal Heritage Villa recognised for architectural excellence." },
  { year: "2023", title: "Excellence in Residential Design", body: "Royal Mansions awarded for ultra-luxury residential design." },
  { year: "2022", title: "Emerging Developer of the Year", body: "Gujarat region — for consistent quality and delivery." },
  { year: "2021", title: "Design Leadership", body: "Park Royal — for community planning and landscape design." },
  { year: "2020", title: "Quality Construction", body: "Royal Crest — recognised for construction standards and finish." },
  { year: "2019", title: "Resident Satisfaction", body: "Across the Vedant Infra portfolio — for after-sales stewardship." }
];

export default function AwardsPage() {
  return (
    <main>
      <Header />

      <section className="pt-40 pb-12 bg-bg">
        <div className="container max-w-5xl">
          <Reveal><div className="eyebrow mb-6">Recognition</div></Reveal>
          <Reveal delay={80}>
            <h1 className="text-5xl md:text-7xl leading-[1.03]">
              A trophy cabinet built, quietly, over two decades.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-ink-secondary text-lg mt-8 max-w-2xl leading-relaxed">
              We rarely talk about awards. But every honour received reflects
              the standards our team holds itself to — quietly, consistently,
              and on every project we build.
            </p>
          </Reveal>
        </div>
      </section>

      {/* MARQUEE TROPHIES */}
      <section className="bg-bg pb-20">
        <Marquee
          speed={55}
          items={TROPHIES.map((src, i) => (
            <div key={i} className="relative w-[240px] md:w-[280px] aspect-[3/4] overflow-hidden bg-bg-elev shadow-sm rounded-2xl">
              <Image src={src} alt={`Award ${i + 1}`} fill sizes="280px" className="object-cover" />
            </div>
          ))}
        />
      </section>

      {/* TROPHY GALLERY GRID */}
      <section className="bg-bg-elev">
        <div className="container py-28 md:py-36">
          <Reveal><div className="eyebrow mb-5">The Cabinet</div></Reveal>
          <Reveal delay={80}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-16 max-w-2xl">
              Every piece, earned.
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7">
            {TROPHIES.map((src, i) => (
              <Reveal key={src} delay={(i % 8) * 60} direction="scale">
                <div className="group relative aspect-[3/4] overflow-hidden bg-bg rounded-2xl">
                  <Image
                    src={src}
                    alt={`Trophy ${i + 1}`}
                    fill
                    sizes="(min-width: 1024px) 22vw, 50vw"
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="eyebrow !text-white/85 mb-1">Honour</div>
                    <div className="text-sm">From the Vedant Infra archive</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HONOURS LIST */}
      <section className="bg-bg">
        <div className="container py-28 md:py-36">
          <Reveal><div className="eyebrow mb-5">Selected Honours</div></Reveal>
          <Reveal delay={80}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-16 max-w-xl">
              Selected recognition.
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-px bg-gold/10 border border-gold/10">
            {HONOURS.map((a, i) => (
              <Reveal key={a.title} delay={(i % 4) * 80} className="bg-bg p-10 md:p-12">
                <div className="eyebrow mb-4">{a.year}</div>
                <h3 className="text-2xl leading-tight mb-4">{a.title}</h3>
                <p className="text-ink-secondary text-sm leading-relaxed">{a.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Be part of the next chapter." description="Schedule a private consultation with our relationship team." />
    </main>
  );
}
