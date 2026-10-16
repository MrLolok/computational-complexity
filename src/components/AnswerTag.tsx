import type { Choice } from "@/lib/answer";

import MathHtml from "@/components/MathHtml";
import { ui } from "@/lib/tokens";

/** etichetta SÌ / NO / altro di una risposta */
export default function AnswerTag({ k, children }: { k: Choice; children?: string }) {
    return (
        <span
            className={`mr-1.5 rounded-sm box-decoration-clone px-2 py-px font-mono text-xs font-semibold ${ui.yn[k]}`}
        >
            <MathHtml html={children ?? ""} terms={false} />
        </span>
    );
}
