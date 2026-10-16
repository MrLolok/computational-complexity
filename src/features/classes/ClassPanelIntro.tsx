import ClassChip from "@/components/ClassChip";
import Tex from "@/components/Tex";
import { ui } from "@/lib/tokens";

/** scheda iniziale, senza classe scelta */
export default function ClassPanelIntro() {
    return (
        <>
            <h2 className={ui.h3}>Scegli una classe nella mappa</h2>
            <div className="text-muted mt-3 flex flex-col gap-3 text-sm">
                <p>
                    Leggi le inclusioni dal basso verso l&apos;alto. Apri una classe per intuizione, definizione ed
                    esempio.
                </p>
                <p>
                    <Tex>{String.raw`\subseteq`}</Tex> = contenuta; <Tex>{String.raw`\subsetneq`}</Tex> = contenuta e
                    diversa. Usa le opzioni sopra la mappa per separazioni e questioni aperte.
                </p>
                <p>
                    Un buon punto di partenza: <ClassChip id="P" /> <ClassChip id="NP" /> <ClassChip id="coNP" />
                </p>
            </div>
        </>
    );
}
