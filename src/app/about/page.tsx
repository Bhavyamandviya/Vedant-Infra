import Image from "next/image";
import Header from "@/components/Header";
import CTASection from "@/components/CTASection";

export const metadata = { title: "About Us — Vedant Infra" };

const STATS = [
  { value: "20+", label: "Years of Practice" },
  { value: "150+", label: "Residences Delivered" },
  { value: "05", label: "Signature Communities" },
  { value: "2,000+", label: "Lives Touched" }
];

const TIMELINE = [
  { year: "2004", title: "A quiet beginning", body: "Vedant Infra is founded in Vadodara with a single, modest commission." },
  { year: "2011", title: "First gated community", body: "Our first landscaped villa community establishes the portfolio's character." },
  { year: "2017", title: "Park Royal", body: "A 4BHK + utility villa community anchored by generous gardens and a resident-only club." },
  { year: "2020", title: "Royal Crest", body: "A bungalow community that raises the bar for material palette and interior detailing." },
  { year: "2022", title: "Royal Heritage Villa", body: "French-inspired 5BHK villas for a discerning, like-minded extended community." },
  { year: "2024", title: "Royal Mansions", body: "Our ultra-luxury flagship — a Sky Sanctuary, two-building club and 5BHK villas at the pinnacle of what we build." }
];

const PROCESS = [
  { n: "01", title: "Commission", body: "We begin with a conversation — about family, about land, about how a home should feel to come back to." },
  { n: "02", title: "Design", body: "In collaboration with Ruchir Sheth, a considered architectural brief is developed for every plot." },
  { n: "03", title: "Build", body: "ZARNA Associates lead the structural discipline. Every site is personally supervised by our leadership." },
  { n: "04", title: "Steward", body: "We remain involved long after handover — because a great home is a long-term relationship." }
];

const AWARDS = [
  { year: "2024", title: "Luxury Villa Project of the Year", body: "Royal Heritage Villa recognised for architectural excellence." },
  { year: "2023", title: "Excellence in Residential Design", body: "Royal Mansions awarded for ultra-luxury residential design." },
  { year: "2022", title: "Emerging Developer of the Year", body: "Gujarat region — for consistent quality and delivery." },
  { year: "2021", title: "Design Leadership", body: "Park Royal — for community planning and landscape design." }
];

const VALUES = [
  { title: "Restraint", body: "We resist the fashionable. The homes we build are meant to read as well in 2046 as they do today." },
  { title: "Craft", body: "Specification is a discipline. We choose long-life materials and finishes — stone, hardwood, metal — and detail them carefully." },
  { title: "Privacy", body: "Each community is sized intentionally small, so neighbours become an extension of family." },
  { title: "Stewardship", body: "Our involvement doesn't end at handover. We maintain a lifelong relationship with every resident." }
];

export default function AboutPage() {
  return (
    <main>
      <Header />

      {/* INTRO */}
      <section className="pt-40 pb-16 bg-bg">
        <div className="container max-w-5xl">
          <div className="eyebrow mb-6">About Vedant Infra</div>
          <h1 className="text-5xl md:text-6xl leading-[1.05]">
            Quiet residences, built with deliberate restraint.
          </h1>
          <p className="text-ink-secondary text-lg mt-8 max-w-2xl leading-relaxed">
            For over two decades, Vedant Infra has built some of Vadodara's most
            considered addresses — each a study in craftsmanship, privacy and
            an enduring respect for the families we build for.
          </p>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-bg">
        <div className="container pb-28 md:pb-36">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-black/10 border border-black/10">
            {STATS.map((s) => (
              <div key={s.label} className="bg-bg p-10 md:p-12 text-center">
                <div className="font-serif text-4xl md:text-5xl text-ink-primary leading-none">{s.value}</div>
                <div className="eyebrow mt-4">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIRECTOR NOTE */}
      <section className="bg-white">
        <div className="container py-28 md:py-36 grid lg:grid-cols-12 gap-14 items-center">
          <div className="lg:col-span-7">
            <div className="eyebrow mb-5">A Note from the Director</div>
            <h2 className="text-4xl md:text-5xl leading-[1.08] mb-8 max-w-xl">
              Real estate, approached as architecture.
            </h2>
            <p className="text-ink-secondary leading-relaxed mb-5 max-w-xl">
              When we began Vedant Infra, our ambition was modest and specific:
              to build homes that would be appreciated not only today, but by
              the generation that inherited them. Every project since has been
              a patient conversation between land, light and the people who
              would live there.
            </p>
            <p className="text-ink-secondary leading-relaxed max-w-xl mb-5">
              We build few addresses — always by invitation, always with care.
              And we measure our success not by square feet delivered, but by
              the families who choose to move within our portfolio as life
              carries them to their next chapter.
            </p>
            <p className="text-ink-secondary leading-relaxed max-w-xl">
              Thank you for considering us.
            </p>
            <div className="mt-10">
              <div className="text-xl text-ink-primary">— Mr. Director</div>
              <div className="text-sm text-ink-muted mt-1">Managing Director, Vedant Infra</div>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden bg-black/5">
              <Image src="/uploads/royal_heritage_villa/branding.png" alt="Director" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-bg">
        <div className="container py-28 md:py-36">
          <div className="eyebrow mb-5">Values</div>
          <h2 className="text-4xl md:text-5xl leading-[1.08] mb-16 max-w-xl">
            What we believe. What we build.
          </h2>
          <div className="grid md:grid-cols-2 gap-px bg-black/10 border border-black/10">
            {VALUES.map((v) => (
              <div key={v.title} className="bg-bg p-10 md:p-14">
                <h3 className="text-2xl md:text-3xl leading-tight mb-5">{v.title}</h3>
                <p className="text-ink-secondary leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="bg-white">
        <div className="container py-28 md:py-36">
          <div className="eyebrow mb-5">A Short History</div>
          <h2 className="text-4xl md:text-5xl leading-[1.08] mb-16 max-w-2xl">Two decades, five landmark addresses.</h2>
          <div className="relative grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden lg:sticky lg:top-28 bg-black/5">
                <Image src="/uploads/royal_heritage_villa/slider_1.png" alt="Vedant Infra legacy" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              </div>
            </div>
            <ol className="lg:col-span-7 relative border-l border-black/15 pl-10 space-y-12">
              {TIMELINE.map((t) => (
                <li key={t.year} className="relative">
                  <span className="absolute -left-[2.6rem] top-2 w-3 h-3 rounded-full bg-gold" aria-hidden />
                  <div className="eyebrow mb-3">{t.year}</div>
                  <h3 className="text-2xl leading-tight mb-3">{t.title}</h3>
                  <p className="text-ink-secondary leading-relaxed max-w-lg">{t.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* RUCHIR SHETH */}
      <section className="bg-bg">
        <div className="container py-28 md:py-36 grid lg:grid-cols-12 gap-14 items-center">
          <div className="lg:col-span-5 lg:order-1 order-2">
            <div className="relative aspect-[4/5] overflow-hidden bg-white">
              <Image src="/logos_src/ruchi.png" alt="Ruchir Sheth" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-contain p-10" />
            </div>
          </div>
          <div className="lg:col-span-7 lg:order-2 order-1">
            <div className="eyebrow mb-5">Architect In Residence</div>
            <h2 className="text-4xl md:text-5xl leading-[1.08] mb-8 max-w-xl">Ruchir Sheth</h2>
            <p className="text-ink-secondary leading-relaxed mb-5 max-w-xl">
              Each Vedant Infra residence is designed in close collaboration
              with Ruchir Sheth, whose studio has shaped some of Gujarat's most
              distinguished private commissions.
            </p>
            <p className="text-ink-secondary leading-relaxed max-w-xl mb-5">
              His sensibility — a quiet modernism grounded in proportion and
              material — is the architectural voice of our portfolio.
            </p>
            <p className="text-ink-secondary leading-relaxed max-w-xl">
              The partnership, now into its second decade, has yielded all five
              of our signature communities and continues to define what a
              Vedant Infra home feels like.
            </p>
          </div>
        </div>
      </section>

      {/* ZARNA */}
      <section className="bg-white">
        <div className="container py-28 md:py-36 grid lg:grid-cols-12 gap-14 items-center">
          <div className="lg:col-span-7">
            <div className="eyebrow mb-5">Structural Consultants</div>
            <h2 className="text-4xl md:text-5xl leading-[1.08] mb-8 max-w-xl">ZARNA Associates</h2>
            <p className="text-ink-secondary leading-relaxed mb-5 max-w-xl">
              Our structural partner for every project, ZARNA Associates brings
              decades of engineering discipline to the homes we build. Their
              approach — earthquake-resistant pile frame construction, rigorous
              on-site supervision and meticulous material specifications —
              underwrites the longevity of every Vedant Infra residence.
            </p>
            <p className="text-ink-secondary leading-relaxed max-w-xl">
              What we promise a resident on paper, ZARNA ensures we deliver on
              site.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden bg-bg">
              <Image src="/logos_src/zarana.png" alt="ZARNA Associates" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-contain p-10" />
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-[#111] text-white">
        <div className="container py-28 md:py-36">
          <div className="eyebrow !text-white/70 mb-5">Our Process</div>
          <h2 className="text-4xl md:text-5xl leading-[1.08] mb-16 max-w-2xl">
            From brief to handover — and beyond.
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {PROCESS.map((p) => (
              <div key={p.n}>
                <div className="font-serif text-5xl text-gold leading-none mb-6">{p.n}</div>
                <h3 className="text-2xl mb-4 leading-tight">{p.title}</h3>
                <p className="text-white/75 text-sm leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AWARDS */}
      <section className="bg-bg">
        <div className="container py-28 md:py-36">
          <div className="eyebrow mb-5">Recognition</div>
          <h2 className="text-4xl md:text-5xl leading-[1.08] mb-16 max-w-xl">Awards & honours.</h2>
          <div className="grid md:grid-cols-2 gap-px bg-black/10 border border-black/10">
            {AWARDS.map((a) => (
              <div key={a.title} className="bg-bg p-10 md:p-12">
                <div className="eyebrow mb-4">{a.year}</div>
                <h3 className="text-2xl leading-tight mb-4">{a.title}</h3>
                <p className="text-ink-secondary text-sm leading-relaxed">{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Visit us by appointment." />
    </main>
  );
}
