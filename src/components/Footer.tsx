import Link from "next/link";
import Image from "next/image";
import NewsletterForm from "./NewsletterForm";
import FooterBrochures from "./FooterBrochures";
import { COMPANY } from "@/lib/company";

const LEGAL = [
  { href: "/legal/privacy", label: "Privacy Policy" },
  { href: "/legal/terms", label: "Terms" },
  { href: "/legal/refund", label: "Refund Policy" },
  { href: "/legal/account-delete", label: "Account Delete Policy" },
  { href: "/legal/disclaimer", label: "Disclaimer" }
];

export default function Footer() {
  return (
    <footer className="bg-[#0e0c0a] text-white">
      <div className="container py-20 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4 flex flex-col gap-6">
          <Image src="/logos_src/vedant_white_logo.png" alt="Vedant Infra" width={170} height={50} />
          <p className="text-white/75 text-sm leading-relaxed max-w-sm">
            Crafting considered homes and landmark communities in Vadodara for
            families that value quiet excellence.
          </p>
          <div className="text-sm text-white/80 space-y-2">
            <div className="leading-relaxed">{COMPANY.contact.address}</div>
            <div><a href={`tel:${COMPANY.contact.phone.replace(/\s/g, "")}`} className="hover:text-gold transition-colors">{COMPANY.contact.phone}</a></div>
            <div><a href={`mailto:${COMPANY.contact.email}`} className="hover:text-gold transition-colors">{COMPANY.contact.email}</a></div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="eyebrow !text-white/70 mb-5">Explore</div>
          <ul className="space-y-3 text-sm text-white/85">
            <li><Link href="/projects" className="hover:text-gold">All Projects</Link></li>
            <li><Link href="/about" className="hover:text-gold">About Us</Link></li>
            <li><Link href="/awards" className="hover:text-gold">Awards</Link></li>
            <li><Link href="/book-appointment" className="hover:text-gold">Book Appointment</Link></li>
          </ul>

          <div className="eyebrow !text-white/70 mb-4 mt-10">Brochures</div>
          <FooterBrochures />
        </div>

        <div className="lg:col-span-5">
          <div className="eyebrow !text-white/70 mb-5">Newsletter</div>
          <p className="text-sm text-white/75 mb-5 max-w-md">
            Receive updates on new launches and invitations to private previews.
          </p>
          <NewsletterForm />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container py-7 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/70">
            {LEGAL.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-white">{item.label}</Link>
            ))}
          </div>
          <div className="flex items-center gap-5 text-xs text-white/70">
            <a href={COMPANY.contact.social.facebook} target="_blank" rel="noopener" className="hover:text-gold">Facebook</a>
            <a href={COMPANY.contact.social.instagram} target="_blank" rel="noopener" className="hover:text-gold">Instagram</a>
            <a href={COMPANY.contact.social.linkedin} target="_blank" rel="noopener" className="hover:text-gold">LinkedIn</a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-white/60">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
            <span>Architect by <span className="text-white/85">Ruchir Sheth</span></span>
            <span>Structure by <span className="text-white/85">ZARNA Associates</span></span>
          </div>
          <div>© 2026 Vedant Infra. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
