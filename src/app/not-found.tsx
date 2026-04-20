import Link from "next/link";
import Header from "@/components/Header";

export default function NotFound() {
  return (
    <main>
      <Header />
      <section className="min-h-screen flex items-center justify-center bg-bg pt-24">
        <div className="container max-w-xl text-center">
          <div className="eyebrow mb-6">404</div>
          <h1 className="text-5xl md:text-6xl leading-[1.05] mb-6">Page not found.</h1>
          <p className="text-ink-secondary mb-10">The page you're looking for doesn't exist or has been moved.</p>
          <Link href="/" className="btn-gold">Return Home</Link>
        </div>
      </section>
    </main>
  );
}
