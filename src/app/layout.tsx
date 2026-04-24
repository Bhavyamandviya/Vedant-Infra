import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import FirstVisitPopup from "@/components/FirstVisitPopup";
import IntroLoader from "@/components/IntroLoader";

export const metadata: Metadata = {
  title: "Vedant Infra — Luxury Residences in Vadodara",
  description:
    "Vedant Infra crafts considered homes and landmark residential communities in Vadodara. Discover our latest launches and completed projects.",
  icons: {
    icon: "/logos_src/vedant_logo.png"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-bg text-ink-primary">
        <IntroLoader />
        {children}
        <Footer />
        <FirstVisitPopup />
      </body>
      <script
      src="https://nlabs-neurons.vercel.app/scripts/rag-agent-widget.js"
      data-api-key="aepk_2xt1Dcw5XG5WUZtyb3SdzPhdtwhznMZq"
      data-project-agent-id="4c1e593f-02c9-4553-8352-735b20e7e5b7"
      async
></script>
    </html>
  );
}
