import Link from "next/link";

/**
 * Floating "Internal Preview" chip shown on each home-design preview route.
 * Links back to the chooser so the client can navigate between variants.
 */
export default function DesignBadge({
  label,
  name,
}: {
  label: string;
  name: string;
}) {
  return (
    <Link
      href="/home-designs"
      className="fixed bottom-6 left-6 z-40 group flex items-center gap-3 bg-black/80 backdrop-blur text-white border border-white/15 hover:border-gold transition-colors px-4 py-3"
      style={{ borderRadius: 0 }}
    >
      <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
      <div className="leading-tight">
        <div className="text-[9px] tracking-[0.28em] uppercase text-white/60">
          {label} · Internal Preview
        </div>
        <div className="text-[12px] tracking-[0.18em] uppercase text-white group-hover:text-gold transition-colors">
          {name} · See All Designs
        </div>
      </div>
    </Link>
  );
}
