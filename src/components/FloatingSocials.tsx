import { COMPANY } from "@/lib/company";

const SOCIAL_LINKS = [
  {
    href: COMPANY.contact.social.facebook,
    label: "Facebook",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M13.5 21V12.3h3.5l.5-3.4h-4V6.4c0-.9.2-1.5 1.5-1.5h2V1.4c-.4-.1-1.7-.1-3.2-.1-3.2 0-5.4 2-5.4 5.8v2.3H6.4v3.4h2.5V21h4.6Z" />
      </svg>
    )
  },
  {
    href: COMPANY.contact.social.instagram,
    label: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <path d="M16.5 7.5h.01" />
        <path d="M12 8.7a3.3 3.3 0 1 0 0 6.6 3.3 3.3 0 0 0 0-6.6Z" />
      </svg>
    )
  },
  {
    href: COMPANY.contact.social.linkedin,
    label: "LinkedIn",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M4.98 3.5C4.98 4.9 3.9 6 2.5 6S0 4.9 0 3.5 1.1 1 2.5 1s2.48 1.1 2.48 2.5ZM.25 8.25h4.5V24h-4.5V8.25Zm7.5 0h4.32v2.16h.06c.6-1.14 2.1-2.34 4.32-2.34 4.62 0 5.46 3.04 5.46 6.99V24H17.5v-7.2c0-1.72 0-3.94-2.4-3.94-2.4 0-2.78 1.88-2.78 3.82V24H7.75V8.25Z" />
      </svg>
    )
  }
];

export default function FloatingSocials() {
  return (
    <div className="fixed left-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex">
      <div className="flex flex-col items-center gap-3 rounded-full bg-black/55 p-3 backdrop-blur-md shadow-[0_15px_40px_rgba(0,0,0,0.35)]">
        {SOCIAL_LINKS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={item.label}
            className="group inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition duration-200 ease-out hover:border-gold hover:bg-gold/10 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            {item.icon}
          </a>
        ))}
      </div>
      <div className="h-24 w-px rounded-full bg-gradient-to-b from-white/70 to-white/0" />
    </div>
  );
}
