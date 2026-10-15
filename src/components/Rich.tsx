"use client";

import type { MouseEvent } from "react";

import { useRouter } from "next/navigation";

import { fillChips } from "@/lib/rich";

type Props = { html: string; className?: string; as?: "div" | "p" | "span" | "li" | "td" };

/**
 * Mostra un testo dei dati (HTML scritto da noi, non dell'utente) e fa navigare
 * senza ricaricare i link interni che contiene (gettoni delle classi, /dp, /confronta/…).
 */
export default function Rich({ html, className, as: Tag = "div" }: Props) {
    const router = useRouter();
    const onClick = (e: MouseEvent) => {
        const a = (e.target as HTMLElement).closest("a");
        const href = a?.getAttribute("href");
        if (!a || !href || !href.startsWith("/") || e.metaKey || e.ctrlKey) return;
        e.preventDefault();
        router.push(href);
    };
    return <Tag className={className} onClick={onClick} dangerouslySetInnerHTML={{ __html: fillChips(html) }} />;
}
