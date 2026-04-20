import Link from "next/link";

interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  variant?: "light" | "dark";
}

export default function CTASection({
  eyebrow = "Private Consultation",
  title,
  description,
  ctaLabel = "Book Appointment",
  ctaHref = "/book-appointment",
  variant = "light"
}: Props) {
  const dark = variant === "dark";
  return (
    <section className={dark ? "bg-[#1a1a1a] text-white" : "bg-bg text-ink-primary"}>
      <div className="container py-28 md:py-36 text-center max-w-3xl">
        <div className={["eyebrow mb-6", dark ? "!text-white/70" : ""].join(" ")}>
          {eyebrow}
        </div>
        <h2 className="text-4xl md:text-5xl leading-[1.1] mb-6">{title}</h2>
        {description && (
          <p className={["text-base leading-relaxed mb-10 mx-auto max-w-xl", dark ? "text-white/75" : "text-ink-secondary"].join(" ")}>
            {description}
          </p>
        )}
        <Link href={ctaHref} className="btn-gold">{ctaLabel}</Link>
      </div>
    </section>
  );
}
