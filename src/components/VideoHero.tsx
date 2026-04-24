"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  src: string;
  poster?: string;
  children: React.ReactNode;
  overlayClassName?: string;
  className?: string;
}

export default function VideoHero({ src, poster, children, overlayClassName, className }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const tryPlay = () => v.play().catch(() => {});
    tryPlay();
  }, []);

  function toggleMute() {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
  }

  return (
    <section className={`relative h-screen min-h-[640px] w-full overflow-hidden ${className ?? ""}`}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className={`absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-black/70 pointer-events-none ${overlayClassName ?? ""}`} />
      <div className="relative h-full flex flex-col justify-end pb-24 md:pb-32">
        <div className="container">{children}</div>
      </div>

      <div className="absolute right-5 bottom-6 md:right-8 md:bottom-8 flex items-center gap-2 z-10">
        <button
          aria-label={playing ? "Pause video" : "Play video"}
          onClick={togglePlay}
          className="w-10 h-10 rounded-full border border-white/30 bg-black/30 backdrop-blur text-white flex items-center justify-center hover:bg-gold hover:border-gold transition-colors"
        >
          {playing ? (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><rect x="2" y="1" width="3" height="10"/><rect x="7" y="1" width="3" height="10"/></svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><polygon points="2,1 11,6 2,11" /></svg>
          )}
        </button>
        <button
          aria-label={muted ? "Unmute" : "Mute"}
          onClick={toggleMute}
          className="w-10 h-10 rounded-full border border-white/30 bg-black/30 backdrop-blur text-white flex items-center justify-center hover:bg-gold hover:border-gold transition-colors"
        >
          {muted ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
          )}
        </button>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 bottom-6 hidden md:flex flex-col items-center text-white/75 z-10">
        <div className="text-[0.6rem] tracking-[0.3em] uppercase mb-2">Scroll</div>
        <div className="w-[1px] h-8 bg-white/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gold" style={{ animation: "shimmer-line 2.2s ease-in-out infinite" }} />
        </div>
      </div>
    </section>
  );
}
