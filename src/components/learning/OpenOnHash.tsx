"use client";

import { useEffect } from "react";

/** Apre il riquadro <details> indicato dall'#ancora (anche dopo un cambio di scheda) e lo porta in vista. */
export default function OpenOnHash() {
    useEffect(() => {
        const open = () => {
            const id = decodeURIComponent(window.location.hash.slice(1));
            const el = id ? document.getElementById(id) : null;
            if (!(el instanceof HTMLDetailsElement)) return;
            el.open = true;
            el.scrollIntoView({ block: "start" });
        };
        open();
        window.addEventListener("hashchange", open);
        return () => window.removeEventListener("hashchange", open);
    }, []);
    return null;
}
