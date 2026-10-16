import { useEffect } from "react";

/* Su schermi stretti, dopo un tocco sulla mappa la scheda scorre in vista (come nella pagina). */
const panelScroll = { pending: false };
export const requestPanelScroll = () => {
    panelScroll.pending = true;
};
export function usePanelScroll() {
    useEffect(() => {
        if (!panelScroll.pending) return;
        panelScroll.pending = false;
        if (!window.matchMedia("(min-width: 64rem)").matches)
            document.getElementById("panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, []);
}
