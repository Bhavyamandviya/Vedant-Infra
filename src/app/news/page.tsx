import Image from "next/image";
import Header from "@/components/Header";
import CTASection from "@/components/CTASection";

export const metadata = { title: "In the News — Vedant Infra" };

const ARTICLES = [
  {
    date: "March 2026",
    tag: "Feature",
    title: "Royal Mansions unveils a new chapter in ultra-luxury living.",
    excerpt: "Architectural Digest profiles our flagship villa project in Kalali, Vadodara.",
    image: "/uploads/royal_mansions/banner.png"
  },
  {
    date: "February 2026",
    tag: "Interview",
    title: "Ruchir Sheth on quiet modernism and the Vedant Infra portfolio.",
    excerpt: "A long-form conversation on restraint, proportion and private homes.",
    image: "/uploads/royal_heritage_villa/slider_1.png"
  },
  {
    date: "November 2025",
    tag: "Award",
    title: "Royal Heritage Villa honoured for architectural excellence.",
    excerpt: "A regional design jury recognises our French-inspired villa community.",
    image: "/uploads/royal_heritage_villa/club_house.jpg"
  },
  {
    date: "August 2025",
    tag: "Launch",
    title: "Park Royal opens private previews for select families.",
    excerpt: "Our 4BHK luxury villa community welcomes its first residents.",
    image: "/uploads/park_royal/MAIN1.jpg"
  }
];

export default function NewsPage() {
  return (
    <main>
      <Header />
      <section className="pt-40 pb-16 bg-bg">
        <div className="container max-w-5xl">
          <div className="eyebrow mb-6">In the News</div>
          <h1 className="text-5xl md:text-6xl leading-[1.05]">Press, features & recognition.</h1>
        </div>
      </section>

      <section className="bg-white pb-28 md:pb-36 pt-20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-14 lg:gap-16">
            {ARTICLES.map((a) => (
              <article key={a.title} className="group">
                <div className="relative aspect-[4/3] overflow-hidden mb-7 bg-black/5">
                  <Image src={a.image} alt={a.title} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]" />
                </div>
                <div className="flex items-center gap-4 eyebrow mb-4">
                  <span>{a.date}</span>
                  <span className="w-1 h-1 rounded-full bg-ink-muted" />
                  <span>{a.tag}</span>
                </div>
                <h2 className="text-2xl md:text-[1.7rem] leading-tight mb-4 max-w-md">{a.title}</h2>
                <p className="text-ink-secondary leading-relaxed max-w-md text-sm">{a.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Stay in the conversation." description="Join our newsletter for invitations and updates." ctaLabel="Visit Us" />
    </main>
  );
}
