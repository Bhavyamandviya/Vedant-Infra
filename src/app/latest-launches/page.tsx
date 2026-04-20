import Header from "@/components/Header";
import ProjectCard from "@/components/ProjectCard";
import CTASection from "@/components/CTASection";
import { listProjects } from "@/lib/projects";

export const metadata = { title: "Latest Launches — Vedant Infra" };

export default async function LatestLaunchesPage() {
  const projects = await listProjects("latest");
  return (
    <main>
      <Header />
      <section className="pt-40 pb-16 bg-bg">
        <div className="container">
          <div className="eyebrow mb-6">Currently Available</div>
          <h1 className="text-5xl md:text-6xl leading-[1.05] max-w-3xl">Latest launches.</h1>
        </div>
      </section>
      <section className="bg-white pb-28 md:pb-36 pt-20">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
            {projects.map((p) => <ProjectCard key={p.slug} project={p} />)}
          </div>
        </div>
      </section>
      <CTASection title="Request a private preview." />
    </main>
  );
}
