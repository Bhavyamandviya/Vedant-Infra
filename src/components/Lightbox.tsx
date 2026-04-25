"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface LightboxImage {
  src: string;
  label?: string;
}

interface Props {
  images: LightboxImage[];
  index: number;
  onClose: () => void;
  onIndexChange?: (i: number) => void;
}

/**
 * Premium lightbox with zoom + pan + keyboard nav.
 * - Wheel / pinch to zoom (1x → 5x)
 * - Click+drag to pan when zoomed
 * - Double-click to toggle 1x ↔ 2.5x
 * - Arrow keys / on-screen arrows to navigate
 * - ESC to close
 */
export default function Lightbox({ images, index, onClose, onIndexChange }: Props) {
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => { setMounted(true); }, []);

  const reset = useCallback(() => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  }, []);

  const goPrev = useCallback(() => {
    if (!onIndexChange) return;
    onIndexChange((index - 1 + images.length) % images.length);
    reset();
  }, [index, images.length, onIndexChange, reset]);

  const goNext = useCallback(() => {
    if (!onIndexChange) return;
    onIndexChange((index + 1) % images.length);
    reset();
  }, [index, images.length, onIndexChange, reset]);

  // Lock body scroll when open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
      else if (e.key === "+" || e.key === "=") setScale((s) => Math.min(s + 0.5, 5));
      else if (e.key === "-") setScale((s) => Math.max(s - 0.5, 1));
      else if (e.key === "0") reset();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, goPrev, goNext, reset]);

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = -e.deltaY * 0.005;
    setScale((s) => Math.min(Math.max(s + delta, 1), 5));
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY, tx: translate.x, ty: translate.y };
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setTranslate({
      x: dragStart.current.tx + (e.clientX - dragStart.current.x),
      y: dragStart.current.ty + (e.clientY - dragStart.current.y),
    });
  };
  const onMouseUp = () => setIsDragging(false);

  const onDoubleClick = () => {
    if (scale > 1) reset();
    else setScale(2.5);
  };

  const current = images[index];
  if (!current || !mounted) return null;

  const overlay = (
    <div
      className="fixed inset-0 z-[2147483647] bg-black/95 backdrop-blur-sm flex items-center justify-center select-none animate-[brochure-fade_220ms_ease]"
      style={{ animationFillMode: "both" }}
      role="dialog"
      aria-modal="true"
    >
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 px-6 py-5 flex items-center justify-between z-10">
        <div className="text-white/80 text-xs tracking-[0.18em] uppercase">
          {current.label || `Plan ${index + 1}`} <span className="opacity-50 ml-3">{index + 1} / {images.length}</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            aria-label="Zoom out"
            onClick={() => setScale((s) => Math.max(s - 0.5, 1))}
            className="w-9 h-9 rounded-full border border-white/25 text-white hover:bg-white hover:text-black transition flex items-center justify-center text-lg leading-none"
          >−</button>
          <div className="text-white/70 text-xs w-12 text-center">{Math.round(scale * 100)}%</div>
          <button
            aria-label="Zoom in"
            onClick={() => setScale((s) => Math.min(s + 0.5, 5))}
            className="w-9 h-9 rounded-full border border-white/25 text-white hover:bg-white hover:text-black transition flex items-center justify-center text-lg leading-none"
          >+</button>
          <button
            aria-label="Reset"
            onClick={reset}
            className="w-9 h-9 rounded-full border border-white/25 text-white hover:bg-white hover:text-black transition flex items-center justify-center text-xs"
          >1:1</button>
          <button
            aria-label="Close"
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-white/25 text-white hover:bg-white hover:text-black transition flex items-center justify-center ml-2"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /></svg>
          </button>
        </div>
      </div>

      {/* Prev / Next */}
      {images.length > 1 && (
        <>
          <button
            aria-label="Previous"
            onClick={goPrev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/25 text-white hover:bg-white hover:text-black transition flex items-center justify-center z-10"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button
            aria-label="Next"
            onClick={goNext}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/25 text-white hover:bg-white hover:text-black transition flex items-center justify-center z-10"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </>
      )}

      {/* Image stage */}
      <div
        className="w-full h-full flex items-center justify-center overflow-hidden"
        onWheel={onWheel}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onDoubleClick={onDoubleClick}
        style={{ cursor: scale > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in" }}
      >
        <div
          className="relative transition-transform duration-200 ease-out will-change-transform"
          style={{
            transform: `translate3d(${translate.x}px, ${translate.y}px, 0) scale(${scale})`,
            transitionDuration: isDragging ? "0ms" : "200ms",
            width: "min(92vw, 1400px)",
            height: "min(82vh, 900px)",
          }}
        >
          <Image
            key={current.src}
            src={current.src}
            alt={current.label || `Image ${index + 1}`}
            fill
            sizes="92vw"
            className="object-contain pointer-events-none animate-[fadeIn_300ms_ease]"
            priority
            draggable={false}
          />
        </div>
      </div>

      {/* Hint */}
      <div className="absolute bottom-5 left-0 right-0 text-center text-[10px] tracking-[0.22em] uppercase text-white/40">
        Scroll to zoom · Drag to pan · Esc to close
      </div>
    </div>
  );

  return createPortal(overlay, document.body);
}
