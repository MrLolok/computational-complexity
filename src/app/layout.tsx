import type { Metadata } from "next";
import { Suspense } from "react";
import { Cormorant_Garamond, Crimson_Pro, Jost, JetBrains_Mono } from "next/font/google";
import "katex/dist/katex.min.css";
import "./globals.css";
import StoreProvider from "@/store/StoreProvider";
import SiteNav, { NavFallback } from "@/components/SiteNav";
import { ui } from "@/lib/ui";

const cormorant = Cormorant_Garamond({ variable: "--font-cormorant", subsets: ["latin"], weight: ["500", "600", "700"] });
const crimson = Crimson_Pro({ variable: "--font-crimson", subsets: ["latin"] });
const jost = Jost({ variable: "--font-jost", subsets: ["latin"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Gerarchia delle classi", template: "%s · Gerarchia delle classi" },
  description:
    "Ripasso interattivo di Computational Complexity: la gerarchia delle classi, i problemi del corso, i teoremi e le tracce d'esame da svolgere.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="it"
      className={`${cormorant.variable} ${crimson.variable} ${jost.variable} ${jetbrains.variable} h-full antialiased scheme-dark`}
    >
      <body className="min-h-full bg-bg text-ink font-body text-[1.07rem] leading-relaxed [font-variant-numeric:lining-nums]">
        <StoreProvider>
          <div className="mx-auto flex min-h-screen w-full max-w-[1240px] flex-col gap-6 px-[max(16px,env(safe-area-inset-left,0px))] pb-10 pt-8 sm:px-6">
            <header className="flex flex-col gap-2">
              <span className={ui.eyebrow}>Computational Complexity · ripasso interattivo</span>
              <h1 className={ui.h1}>Classi, problemi e teoremi</h1>
              <p className={ui.lede}>
                Una sola mappa per il ripasso: la gerarchia delle classi, i problemi del corso sistemati classe per classe, i
                teoremi che li collegano e le tracce d&apos;esame da svolgere. Tutto viene da dispensa, slide e appunti del corso;
                quello che viene da fuori è marcato con ✱.
              </p>
            </header>
            <Suspense fallback={<NavFallback />}>
              <SiteNav />
            </Suspense>
            <main className="flex min-w-0 flex-1 flex-col gap-6">{children}</main>
            <footer className="mt-6 flex flex-wrap gap-x-5 gap-y-1 border-t border-line pt-4 font-ui text-sm text-muted">
              <span>Fonti: dispensa, slide e appunti del corso.</span>
              <span>
                ✱ e <span className={ui.pillExt}>esterno</span> = fuori dalle fonti.
              </span>
              <a href="/fonti" className="text-accent underline underline-offset-2">
                Come è stato verificato
              </a>
            </footer>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
