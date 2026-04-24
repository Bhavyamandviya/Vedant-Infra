"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const BrochureFlipbook = dynamic(() => import("./BrochureFlipbook"), { ssr: false });

interface Props {
  pdfUrl: string;
  title: string;
  variant?: "gold" | "outline" | "outline-light";
  label?: string;
  className?: string;
}

export default function BrochureButton({
  pdfUrl,
  title,
  variant = "outline",
  label = "View Brochure",
  className = "",
}: Props) {
  const [open, setOpen] = useState(false);

  const cls =
    variant === "gold"
      ? "btn-gold"
      : variant === "outline-light"
      ? "btn-outline-light"
      : "btn-outline";

  return (
    <>
      <button onClick={() => setOpen(true)} className={`${cls} ${className}`}>
        {label}
      </button>
      {open && (
        <BrochureFlipbook
          pdfUrl={pdfUrl}
          title={title}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
