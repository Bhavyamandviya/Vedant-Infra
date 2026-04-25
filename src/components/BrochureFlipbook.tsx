"use client";

import { useEffect, useRef, useState, forwardRef } from "react";
import { createPortal } from "react-dom";
import HTMLFlipBook from "react-pageflip";

interface Props {
  pdfUrl: string;
  title: string;
  onClose: () => void;
}

interface FlipBookHandle {
  pageFlip: () => {
    flipNext: () => void;
    flipPrev: () => void;
    turnToPage: (i: number) => void;
    getPageCount: () => number;
  };
}

// pdfjs is loaded from CDN to avoid Next.js / webpack ESM-CJS interop issues with pdfjs-dist v5.
const PDFJS_VERSION = "4.8.69"; // stable, well-tested v4 series
const PDFJS_LIB_URL = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.min.mjs`;
const PDFJS_WORKER_URL = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.worker.min.mjs`;

interface PdfJsLib {
  GlobalWorkerOptions: { workerSrc: string };
  getDocument: (src: string) => { promise: Promise<PdfDocument> };
}
interface PdfDocument {
  numPages: number;
  getPage: (n: number) => Promise<PdfPage>;
}
interface PdfPage {
  getViewport: (opts: { scale: number }) => { width: number; height: number };
  render: (opts: { canvasContext: CanvasRenderingContext2D; viewport: { width: number; height: number } }) => { promise: Promise<void> };
}

declare global {
  interface Window {
    __pdfjsLibPromise?: Promise<PdfJsLib>;
  }
}

function loadPdfJs(): Promise<PdfJsLib> {
  if (typeof window === "undefined") return Promise.reject(new Error("ssr"));
  if (window.__pdfjsLibPromise) return window.__pdfjsLibPromise;
  window.__pdfjsLibPromise = (async () => {
    // dynamic import of remote ESM module
    const mod = await import(/* webpackIgnore: true */ PDFJS_LIB_URL);
    const lib = mod as unknown as PdfJsLib;
    lib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_URL;
    return lib;
  })();
  return window.__pdfjsLibPromise;
}

const Page = forwardRef<HTMLDivElement, { src?: string; pageNumber: number; total: number }>(
  function Page({ src, pageNumber, total }, ref) {
    return (
      <div ref={ref} className="bg-white shadow-2xl overflow-hidden">
        <div className="relative w-full h-full flex items-center justify-center bg-white">
          {src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={src} alt={`Page ${pageNumber}`} className="w-full h-full object-contain" draggable={false} />
          ) : (
            <div className="text-ink-muted text-xs tracking-[0.2em] uppercase">Loading…</div>
          )}
          <div className="absolute bottom-2 left-0 right-0 text-center text-[10px] tracking-[0.2em] uppercase text-ink-muted/70">
            {pageNumber} / {total}
          </div>
        </div>
      </div>
    );
  }
);

export default function BrochureFlipbook({ pdfUrl, title, onClose }: Props) {
  const [pages, setPages] = useState<string[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [size, setSize] = useState({ w: 500, h: 700 });
  const [mounted, setMounted] = useState(false);
  const bookRef = useRef<FlipBookHandle | null>(null);

  // Portal needs document — only mount on client
  useEffect(() => { setMounted(true); }, []);

  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  // Responsive book size
  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const isMobile = vw < 768;
      // Reserve room for top bar + bottom bar + comfortable padding
      const chromeY = isMobile ? 130 : 150;
      // On mobile show portrait (single page), on tablet/desktop show two-page spread
      if (isMobile) {
        const maxW = vw * 0.94;
        const maxH = vh - chromeY;
        let w = maxW;
        let h = w * 1.41;
        if (h > maxH) {
          h = maxH;
          w = h / 1.41;
        }
        setSize({ w, h });
      } else {
        const maxBookWidth = Math.min(vw * 0.96, 1600);
        const maxBookHeight = vh - chromeY;
        let pageWidth = maxBookWidth / 2;
        let pageHeight = pageWidth * 1.41;
        if (pageHeight > maxBookHeight) {
          pageHeight = maxBookHeight;
          pageWidth = pageHeight / 1.41;
        }
        setSize({ w: pageWidth, h: pageHeight });
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Render PDF pages
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const pdfjs = await loadPdfJs();
        const loadingTask = pdfjs.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;
        const total = pdf.numPages;
        const collected: string[] = [];

        // Render at high resolution so text stays crisp when the book is large.
        // Bigger viewports get bigger renders; cap to avoid OOM on huge PDFs.
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const targetWidth = Math.min(Math.max(window.innerWidth * 0.9, 1400), 2200) * dpr;

        for (let i = 1; i <= total; i++) {
          if (cancelled) return;
          const page = await pdf.getPage(i);
          const baseViewport = page.getViewport({ scale: 1 });
          const scale = targetWidth / baseViewport.width;
          const viewport = page.getViewport({ scale });
          const canvas = document.createElement("canvas");
          canvas.width = Math.ceil(viewport.width);
          canvas.height = Math.ceil(viewport.height);
          const ctx = canvas.getContext("2d");
          if (!ctx) continue;
          await page.render({ canvasContext: ctx, viewport }).promise;
          collected.push(canvas.toDataURL("image/jpeg", 0.9));
          // Only update progress here — DON'T setPages mid-loop:
          // each setPages remounts HTMLFlipBook (because children count changes)
          // which causes a visible blink/flicker per page.
          setLoadingProgress(Math.round((i / total) * 100));
        }
        // Mount the flipbook once, with all pages ready.
        if (!cancelled) setPages(collected);
      } catch (err) {
        console.error("PDF render error:", err);
        setErrorMsg(err instanceof Error ? err.message : "Failed to render PDF");
      }
    })();
    return () => { cancelled = true; };
  }, [pdfUrl]);

  const flipPrev = () => bookRef.current?.pageFlip?.().flipPrev();
  const flipNext = () => bookRef.current?.pageFlip?.().flipNext();

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") flipPrev();
      else if (e.key === "ArrowRight") flipNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!mounted) return null;

  const isMobilePortrait = typeof window !== "undefined" && window.innerWidth < 768;

  const overlay = (
    <div
      className="brochure-overlay fixed inset-0 z-[2147483647] flex flex-col items-center justify-between py-4 md:py-6 animate-[brochure-fade_280ms_ease]"
      role="dialog"
      aria-modal="true"
      style={{ animationFillMode: "both" }}
    >
      {/* Atmospheric gold spotlight (purely decorative) */}
      <div aria-hidden className="brochure-glow" />

      {/* Top bar */}
      <div className="relative w-full px-4 md:px-8 flex items-center justify-between gap-3 pb-4 md:pb-5 border-b border-white/[0.06]">
        <div className="tracking-[0.28em] text-[10px] md:text-[11px] uppercase truncate min-w-0 flex-1 flex items-center gap-3">
          <span className="hidden md:inline-block w-7 h-px bg-gold/70" />
          <span className="text-gold font-medium">Brochure</span>
          <span className="text-white/30 hidden sm:inline">/</span>
          <span className="text-white/80 hidden sm:inline truncate font-light tracking-[0.2em]">{title}</span>
        </div>
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          <a
            href={pdfUrl}
            download
            aria-label="Download PDF"
            className="brochure-btn group inline-flex items-center gap-1.5 text-[9px] md:text-[10px] tracking-[0.2em] uppercase font-medium px-2.5 md:px-3.5 h-8 md:h-9"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover:translate-y-0.5">
              <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="hidden md:inline">Download</span>
          </a>
          <button
            aria-label="Close"
            onClick={onClose}
            className="brochure-btn brochure-btn-circle group w-8 h-8 md:w-9 md:h-9 shrink-0 flex items-center justify-center"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover:rotate-90">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Book stage */}
      <div className="relative flex-1 w-full flex items-center justify-center px-2 md:px-6">
        {errorMsg ? (
          <div className="text-center max-w-md">
            <div className="text-white/80 text-sm tracking-[0.2em] uppercase mb-3">Couldn&apos;t load brochure</div>
            <div className="text-white/50 text-xs mb-6">{errorMsg}</div>
            <a href={pdfUrl} target="_blank" rel="noopener" className="btn-outline-light !py-3 !px-5 text-[11px]">
              Open PDF instead
            </a>
          </div>
        ) : pages.length === 0 ? (
          <div className="text-center flex flex-col items-center">
            {/* Rotating gold ring */}
            <div className="relative w-20 h-20 mb-8">
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-[spin_2.4s_linear_infinite]">
                <defs>
                  <linearGradient id="goldArc" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#db9d23" stopOpacity="0" />
                    <stop offset="60%" stopColor="#f4d27c" stopOpacity="1" />
                    <stop offset="100%" stopColor="#db9d23" stopOpacity="1" />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
                <circle
                  cx="50" cy="50" r="44"
                  fill="none"
                  stroke="url(#goldArc)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeDasharray="200 276"
                />
              </svg>
              {/* Center monogram */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-gold font-serif text-2xl tracking-wider opacity-90">V</span>
              </div>
            </div>

            <div className="text-[10px] tracking-[0.32em] uppercase text-white/45 mb-3">Vedant Infra</div>
            <h3 className="font-serif italic text-2xl md:text-3xl text-white/90 mb-1">Preparing your brochure</h3>
            <div className="text-[11px] tracking-[0.22em] uppercase text-white/40 mb-8">A moment, please</div>

            {/* Progress */}
            <div className="w-72 max-w-[80vw] h-px bg-white/10 overflow-hidden mx-auto relative">
              <div
                className="h-full bg-gradient-to-r from-gold via-[#f4d27c] to-gold transition-all duration-500 ease-out shadow-[0_0_8px_rgba(244,210,124,0.5)]"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <div className="text-white/55 text-[10px] tracking-[0.4em] mt-4 font-light">
              {String(loadingProgress).padStart(2, "0")} <span className="text-white/25">%</span>
            </div>
          </div>
        ) : (
          <>
            {/* Prev */}
            <button
              aria-label="Previous page"
              onClick={flipPrev}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/25 text-white hover:bg-white hover:text-black transition flex items-center justify-center z-10"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>

            <HTMLFlipBook
              ref={(el: unknown) => { bookRef.current = el as FlipBookHandle | null; }}
              width={size.w}
              height={size.h}
              size="fixed"
              minWidth={200}
              maxWidth={2200}
              minHeight={300}
              maxHeight={2400}
              maxShadowOpacity={0.5}
              showCover={true}
              mobileScrollSupport={true}
              flippingTime={700}
              usePortrait={isMobilePortrait}
              startPage={0}
              drawShadow={true}
              startZIndex={0}
              autoSize={false}
              clickEventForward={true}
              useMouseEvents={true}
              swipeDistance={30}
              showPageCorners={true}
              disableFlipByClick={false}
              className=""
              style={{}}
              onFlip={(e: { data: number }) => setCurrentPage(e.data)}
            >
              {pages.map((src, i) => (
                <Page key={i} src={src} pageNumber={i + 1} total={pages.length} />
              ))}
            </HTMLFlipBook>

            {/* Next */}
            <button
              aria-label="Next page"
              onClick={flipNext}
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/25 text-white hover:bg-white hover:text-black transition flex items-center justify-center z-10"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </>
        )}
      </div>

      {/* Bottom bar */}
      <div className="relative w-full px-6 pt-4 md:pt-5 border-t border-white/[0.06] flex items-center justify-center gap-5">
        {pages.length > 0 && (
          <>
            <div className="flex items-center gap-3 text-[10px] md:text-[11px] tracking-[0.28em] uppercase font-light">
              <span className="text-gold">{String(currentPage + 1).padStart(2, "0")}</span>
              <span className="w-6 h-px bg-white/20" />
              <span className="text-white/50">{String(pages.length).padStart(2, "0")}</span>
            </div>
            <span className="hidden md:inline text-white/15">·</span>
            <div className="hidden md:block text-white/35 text-[10px] tracking-[0.28em] uppercase font-light">
              <kbd className="text-white/55 mx-1">←</kbd>
              <kbd className="text-white/55 mx-1">→</kbd>
              arrow keys
              <span className="text-white/15 mx-3">/</span>
              drag corner to flip
            </div>
          </>
        )}
      </div>
    </div>
  );

  return createPortal(overlay, document.body);
}
