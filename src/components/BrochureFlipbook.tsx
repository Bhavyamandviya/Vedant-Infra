"use client";

import { useEffect, useRef, useState, forwardRef } from "react";
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
  const bookRef = useRef<FlipBookHandle | null>(null);

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
      const maxBookWidth = Math.min(vw * 0.92, 1100);
      const maxBookHeight = vh * 0.82;
      const pageWidth = maxBookWidth / 2;
      const pageHeight = pageWidth * 1.41;
      if (pageHeight > maxBookHeight) {
        const h = maxBookHeight;
        const w = h / 1.41;
        setSize({ w, h });
      } else {
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

        for (let i = 1; i <= total; i++) {
          if (cancelled) return;
          const page = await pdf.getPage(i);
          const baseViewport = page.getViewport({ scale: 1 });
          const targetWidth = 900;
          const scale = targetWidth / baseViewport.width;
          const viewport = page.getViewport({ scale });
          const canvas = document.createElement("canvas");
          canvas.width = Math.ceil(viewport.width);
          canvas.height = Math.ceil(viewport.height);
          const ctx = canvas.getContext("2d");
          if (!ctx) continue;
          await page.render({ canvasContext: ctx, viewport }).promise;
          collected.push(canvas.toDataURL("image/jpeg", 0.85));
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

  return (
    <div
      className="fixed inset-0 z-[200] bg-[#1a1410]/97 backdrop-blur-md flex flex-col items-center justify-between py-6 animate-[fadeIn_240ms_ease]"
      role="dialog"
      aria-modal="true"
      style={{ animationFillMode: "both" }}
    >
      {/* Top bar */}
      <div className="w-full px-6 flex items-center justify-between">
        <div className="text-white/85 tracking-[0.18em] text-xs uppercase">
          <span className="text-gold">Brochure</span> <span className="opacity-60 mx-2">·</span> {title}
        </div>
        <div className="flex items-center gap-3">
          <a
            href={pdfUrl}
            download
            className="hidden sm:inline-flex text-[11px] tracking-[0.18em] uppercase text-white/85 border border-white/25 hover:bg-white hover:text-black transition px-4 py-2"
          >
            Download
          </a>
          <button
            aria-label="Close"
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-white/25 text-white hover:bg-white hover:text-black transition flex items-center justify-center"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /></svg>
          </button>
        </div>
      </div>

      {/* Book stage */}
      <div className="flex-1 w-full flex items-center justify-center px-2 md:px-6 relative">
        {errorMsg ? (
          <div className="text-center max-w-md">
            <div className="text-white/80 text-sm tracking-[0.2em] uppercase mb-3">Couldn&apos;t load brochure</div>
            <div className="text-white/50 text-xs mb-6">{errorMsg}</div>
            <a href={pdfUrl} target="_blank" rel="noopener" className="btn-outline-light !py-3 !px-5 text-[11px]">
              Open PDF instead
            </a>
          </div>
        ) : pages.length === 0 ? (
          <div className="text-center">
            <div className="text-white/80 text-sm tracking-[0.2em] uppercase mb-5">Preparing brochure</div>
            <div className="w-64 h-[2px] bg-white/15 overflow-hidden mx-auto">
              <div
                className="h-full bg-gold transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <div className="text-white/50 text-xs mt-3">{loadingProgress}%</div>
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
              maxWidth={2000}
              minHeight={300}
              maxHeight={2000}
              maxShadowOpacity={0.5}
              showCover={true}
              mobileScrollSupport={true}
              flippingTime={700}
              usePortrait={false}
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
      <div className="w-full px-6 flex items-center justify-center gap-6">
        {pages.length > 0 && (
          <>
            <div className="text-white/70 text-xs tracking-[0.18em] uppercase">
              Page {currentPage + 1} / {pages.length}
            </div>
            <div className="hidden md:block text-white/35 text-[10px] tracking-[0.22em] uppercase">
              ← → arrow keys · drag corner to flip
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
      `}</style>
    </div>
  );
}
