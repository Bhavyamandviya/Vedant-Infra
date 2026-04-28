import { promises as fs } from "node:fs";
import path from "node:path";
import type { ProjectCardData, ProjectContent } from "@/types";

const CONTENT_DIR = path.join(process.cwd(), "project-content");

const SLUGS = [
  "park-royal",
  "royal-crest",
  "royal-heritage-villa",
  "royal-mansions",
  "royal-green-park"
];

export async function getProjectSlugs(): Promise<string[]> {
  return [...SLUGS];
}

export async function getProjectContent(slug: string): Promise<ProjectContent | null> {
  const file = path.join(CONTENT_DIR, `${slug}.docs`);
  try {
    const raw = await fs.readFile(file, "utf8");
    return JSON.parse(raw) as ProjectContent;
  } catch {
    return null;
  }
}

export async function listProjects(filter?: "latest" | "completed"): Promise<ProjectCardData[]> {
  const slugs = await getProjectSlugs();
  const items: ProjectCardData[] = [];
  for (const slug of slugs) {
    const p = await getProjectContent(slug);
    if (!p) continue;
    if (filter && p.status !== filter) continue;
    items.push({
      slug: p.slug,
      name: p.name,
      tagline: p.tagline,
      location: p.location,
      thumbnail: p.thumbnail,
      status: p.status,
      bookingAvailable: p.bookingAvailable
    });
  }
  return items;
}

export async function listProjectsForDropdown(): Promise<{ slug: string; name: string }[]> {
  const slugs = await getProjectSlugs();
  const items: { slug: string; name: string }[] = [];
  for (const slug of slugs) {
    const p = await getProjectContent(slug);
    if (p) items.push({ slug: p.slug, name: p.name });
  }
  return items;
}
