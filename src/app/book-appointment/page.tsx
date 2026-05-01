import Image from "next/image";
import Header from "@/components/Header";
import AppointmentForm from "@/components/AppointmentForm";
import { listProjectsForDropdown } from "@/lib/projects";

export const metadata = { title: "Book Appointment — Vedant Infra" };

export default async function BookAppointmentPage({
  searchParams
}: { searchParams: Promise<{ project?: string }> }) {
  const { project } = await searchParams;
  const projects = await listProjectsForDropdown();

  return (
    <main>
      <Header />

      <section className="pt-40 pb-16 bg-bg">
        <div className="container max-w-5xl">
          <div className="eyebrow mb-6">By Invitation</div>
          <h1 className="text-5xl md:text-6xl leading-[1.05]">Book a private appointment.</h1>
          <p className="text-ink-secondary text-lg mt-8 max-w-2xl leading-relaxed">
            Share a few details and our relationship team will arrange a site
            visit, a call or an in-studio consultation at your convenience.
          </p>
        </div>
      </section>

      <section className="bg-bg-elev">
        <div className="container py-20 md:py-28 grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7">
            <AppointmentForm projects={projects} defaultProject={project} />
          </div>

          <aside className="lg:col-span-5 lg:pl-6">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-10 bg-bg-elev">
              <Image src="/uploads/royal_mansions/grand_entry.jpg" alt="Vedant Infra" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </div>
          
          </aside>
        </div>
      </section>
    </main>
  );
}
