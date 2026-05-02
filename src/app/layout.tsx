import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import FirstVisitPopup from "@/components/FirstVisitPopup";
import FloatingSocials from "@/components/FloatingSocials";
import IntroLoader from "@/components/IntroLoader";
import ScrollIndicator from "@/components/ScrollIndicator";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export const metadata: Metadata = {
  title: "Vedant Infra — Luxury Residences in Vadodara",
  description:
    "Vedant Infra crafts considered homes and landmark residential communities in Vadodara. Discover our latest launches and completed projects.",
  icons: {
    icon: "/logos_src/vedant_logo.png"
  }
};

// Inline script — runs before first paint, applies the saved theme
// so there's no flash of the default Onyx palette on reload.
const themeBootstrap = `
(function(){
  try {
    var t = localStorage.getItem('vi-theme');
    if (t && t !== 'forest') document.documentElement.setAttribute('data-theme', t);
  } catch(e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body className="min-h-screen bg-bg text-ink-primary">
        <IntroLoader />
        <FloatingSocials />
        <ScrollIndicator />
        {children}
        <Footer />
        <FirstVisitPopup />
        <ThemeSwitcher />
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
