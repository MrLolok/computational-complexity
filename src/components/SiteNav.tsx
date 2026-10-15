"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NAV = [
    { href: "/", label: "Home" },
    { href: "/classi", label: "Classi", match: ["/classi", "/dp"] },
    { href: "/problemi", label: "Problemi" },
    { href: "/teoremi", label: "Teoremi" },
    { href: "/confronta", label: "Confronta" },
    { href: "/piani", label: "Gerarchia PH" },
    { href: "/quantistico", label: "Quantistico" },
    { href: "/esercizi", label: "Esercitati" },
    { href: "/tracce", label: "Tracce" },
    { href: "/mdt", label: "MdT" },
] as const;

const base = "min-h-11 font-ui text-base whitespace-nowrap px-3 py-2 -mb-px border-b-2 transition-colors";

function isActive(path: string, item: (typeof NAV)[number]) {
    const roots = "match" in item ? item.match : [item.href];
    return roots.some((r) => (r === "/" ? path === "/" : path === r || path.startsWith(r + "/")));
}

function Bar({ path }: { path: string | null }) {
    const nav = useRef<HTMLElement>(null);
    useEffect(() => {
        const reveal = () => {
            const el = nav.current;
            const active = el?.querySelector<HTMLElement>('[aria-current="page"]');
            if (el && active) el.scrollLeft = active.offsetLeft - (el.clientWidth - active.offsetWidth) / 2;
        };
        reveal();
        window.addEventListener("resize", reveal);
        return () => window.removeEventListener("resize", reveal);
    }, [path]);
    return (
        <nav
            ref={nav}
            aria-label="Sezioni"
            className="bg-bg/95 sticky top-[env(safe-area-inset-top,0px)] z-20 -mx-1 overflow-x-auto overscroll-x-contain backdrop-blur"
        >
            <ul className="border-line flex gap-1 border-b px-1">
                {NAV.map((item) => {
                    const on = path !== null && isActive(path, item);
                    return (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                aria-current={on ? "page" : undefined}
                                className={`${base} block ${on ? "border-accent text-ink" : "text-muted hover:text-ink border-transparent"}`}
                            >
                                {item.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

export function NavFallback() {
    return <Bar path={null} />;
}

export default function SiteNav() {
    return <Bar path={usePathname()} />;
}
