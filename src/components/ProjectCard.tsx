import Link from "next/link";
import Image from "next/image";
import type { ProjectCardData } from "@/types";

export default function ProjectCard({ project }: { project: ProjectCardData }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-black/5">
        <Image
          src={project.thumbnail}
          alt={project.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
      </div>
      <div className="pt-6 pb-2">
        <div className="eyebrow mb-2">{project.location}</div>
        <h3 className="text-2xl md:text-[1.7rem] leading-tight text-ink-primary">
          {project.name}
        </h3>
        {project.tagline && (
          <div className="text-sm text-ink-muted mt-2">{project.tagline}</div>
        )}
        <div className="mt-5 inline-flex items-center gap-2 text-[0.72rem] tracking-[0.22em] uppercase text-ink-primary group-hover:text-gold transition-colors">
          View Project
          <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">→</span>
        </div>
      </div>
    </Link>
  );
}
