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
    </html>
  );
}
