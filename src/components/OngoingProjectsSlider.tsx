"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ONGOING_PROJECTS = [
  {
    name: "Royal Mansions",
    slug: "royal-mansions",
    image: "/vedant/royalmanison/Society.jpg",
    specs: [
      { label: "Kitchen", value: "01" },
      { label: "Bedrooms", value: "05" },
      { label: "Balcony", value: "01" },
      { label: "Bathrooms", value: "04" },
      { label: "Gazebo Open Terrace", value: "01" },
    ],
  },
  {
    name: "Royal Heritage Villa",
    slug: "royal-heritage-villa",
    image: "/vedant/royalheritage/Society.jpg",
    specs: [
      { label: "Kitchen", value: "01" },
      { label: "Bedrooms", value: "05" },
      { label: "Balcony", value: "01" },
      { label: "Bathrooms", value: "04" },
      { label: "Gazebo Open Terrace", value: "01" },
    ],
  },
  // {
  //   name: "Park Royal",
  //   slug: "park-royal",
  //   image: "/vedant/royalpark/Society.jpg",
  //   specs: [
  //     { label: "Kitchen", value: "01" },
  //     { label: "Bedrooms", value: "04" },
  //     { label: "Balcony", value: "01" },
  //     { label: "Bathrooms", value: "03" },
  //     { label: "Gazebo Open Terrace", value: "01" },
  //   ],
  // },
  // {
  //   name: "Royal Crest",
  //   slug: "royal-crest",
  //   image: "/vedant/royalcrest/Society.jpg",
  //   specs: [
  //     { label: "Kitchen", value: "01" },
  //     { label: "Bedrooms", value: "04" },
  //     { label: "Balcony", value: "01" },
  //     { label: "Bathrooms", value: "03" },
  //     { label: "Gazebo Open Terrace", value: "01" },
  //   ],
  // },
];

export default function OngoingProjectsSlider() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + ONGOING_PROJECTS.length) % ONGOING_PROJECTS.length);
  const next = () => setCurrent((c) => (c + 1) % ONGOING_PROJECTS.length);

  const project = ONGOING_PROJECTS[current];

  return (
    <section className="relative overflow-hidden bg-[#1a1209]">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          key={project.slug}
          src={project.image}
          alt={project.name}
          fill
          sizes="100vw"
          className="object-cover transition-opacity duration-700"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative container py-20 md:py-28">
        {/* Section heading */}
        <div className="mb-10 md:mb-14">
          <div className="eyebrow !text-gold mb-3 flex items-center gap-3">
            <span className="gold-divider" /> On-Going Projects
          </div>
          <h2 className="text-4xl md:text-5xl text-white leading-[1.05] max-w-xl">
            Vedant Infra introduces brand new lavish homes for an inspiring lifestyle.
          </h2>
          <p className="text-white/70 mt-4 max-w-2xl leading-relaxed">
            We are driven by innovation and dedication that help us spread happiness by building
            beautiful homes tailored to specific needs.
          </p>
        </div>

        {/* Card + image row */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Info card */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl p-8 md:p-10 h-full flex flex-col justify-between shadow-2xl">
              <div>
                <h3 className="text-2xl md:text-3xl font-serif text-[#795532] mb-6 leading-tight">
                  {project.name}
                </h3>
                <div className="space-y-0 divide-y divide-gray-100">
                  {project.specs.map((s) => (
                    <div key={s.label} className="flex items-center justify-between py-3">
                      <span className="text-gray-600 text-sm md:text-base">{s.label}:</span>
                      <span className="font-semibold text-[#795532] text-sm md:text-base">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Link
                href={`/projects/${project.slug}`}
                className="mt-8 inline-block bg-[#795532] hover:bg-[#5e3f22] text-white text-xs tracking-[0.2em] uppercase px-7 py-3 transition-colors text-center"
              >
                View Project
              </Link>
            </div>
          </div>

          {/* Large project preview image */}
          <div className="lg:col-span-8 relative min-h-[360px] md:min-h-[480px] rounded-2xl overflow-hidden">
            <Image
              src={project.image}
              alt={project.name}
              fill
              sizes="(min-width: 1024px) 65vw, 100vw"
              className="object-cover"
            />
            {/* Prev / Next */}
            <div className="absolute bottom-5 right-6 flex items-center gap-6">
              <button
                onClick={prev}
                className="text-white/80 hover:text-white text-xs tracking-[0.2em] uppercase flex items-center gap-2 transition-colors"
                aria-label="Previous project"
              >
                ← Prev
              </button>
              <button
                onClick={next}
                className="text-white/80 hover:text-white text-xs tracking-[0.2em] uppercase flex items-center gap-2 transition-colors"
                aria-label="Next project"
              >
                Next →
              </button>
            </div>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center gap-2 mt-8">
          {ONGOING_PROJECTS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={[
                "h-1.5 rounded-full transition-all duration-300",
                i === current ? "w-8 bg-gold" : "w-2 bg-white/40",
              ].join(" ")}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
