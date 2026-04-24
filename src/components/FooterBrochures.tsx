"use client";

import BrochureButton from "./BrochureButton";

const ITEMS = [
  { url: "/brochures/royal_mansions.pdf", title: "Royal Mansions" },
  { url: "/brochures/royal_heritage_villa.pdf", title: "Royal Heritage Villa" },
  { url: "/brochures/park_royal.pdf", title: "Park Royal" },
  { url: "/brochures/royal_crest.pdf", title: "Royal Crest" },
];

export default function FooterBrochures() {
  return (
    <ul className="space-y-3 text-sm text-white/85">
      {ITEMS.map((b) => (
        <li key={b.url}>
          <BrochureButton
            pdfUrl={b.url}
            title={b.title}
            label={b.title}
            className="!p-0 !border-0 !bg-transparent !text-white/85 hover:!text-gold !text-sm !tracking-normal !normal-case !font-normal"
          />
        </li>
      ))}
    </ul>
  );
}
