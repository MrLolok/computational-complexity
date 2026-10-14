import type { Metadata } from "next";
import { Suspense } from "react";
import localFont from "next/font/local";
import "katex/dist/katex.min.css";
import "./globals.css";
import StoreProvider from "@/store/StoreProvider";
import SiteNav, { NavFallback } from "@/components/SiteNav";
import ContextHelp from "@/components/learning/ContextHelp";

const cereal = localFont({
  variable: "--font-cereal",
  display: "swap",
  src: [
    {
      path: "../../public/fonts/AirbnbCereal_W_Bk.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/AirbnbCereal_W_Md.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/AirbnbCereal_W_Bd.otf",
      weight: "700",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: {
    default: "Computational Complexity",
    template: "%s · Computational Complexity",
  },
  description:
    "Ripasso interattivo di Computational Complexity: la gerarchia delle classi, i problemi del corso, i teoremi e le tracce d'esame da svolgere.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="it"
      className={`${cereal.variable} h-full antialiased scheme-dark`}
    >
      {/* browser extensions (e.g. ColorZilla's cz-shortcut-listen) inject attributes on <body> before hydration */}
      <body
        suppressHydrationWarning
        className="min-h-full bg-bg text-ink font-body text-[1rem] leading-relaxed tracking-[-0.01em] [font-variant-numeric:lining-nums]"
      >
        <StoreProvider>
          <div className="mx-auto flex min-h-screen w-full max-w-[1240px] flex-col gap-6 px-[max(16px,env(safe-area-inset-left,0px))] pb-10 pt-8 sm:px-6">
            <a href="#contenuto" className="skip-link">Vai al contenuto</a>
            <Suspense fallback={<NavFallback />}>
              <SiteNav />
            </Suspense>
            <main id="contenuto" className="flex min-w-0 flex-1 flex-col gap-6">
              <ContextHelp>{children}</ContextHelp>
            </main>
            <footer className="mt-6 flex flex-wrap gap-x-5 gap-y-1 border-t border-line pt-4 font-ui text-sm text-muted">
              <span>Fonti: dispensa, slide e appunti del corso.</span>
              <span>✱ = integrazione esterna al corso.</span>
              <a
                href="/fonti"
                className="text-accent underline underline-offset-2"
              >
                Fonti e verifiche
              </a>
            </footer>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
