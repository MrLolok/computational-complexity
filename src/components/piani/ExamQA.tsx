import type { ReactNode } from "react";
import Rich from "@/components/Rich";
import type { ExamQuestion } from "@/data/examQuestions";

const det = "border-b border-line py-2 [&>summary]:cursor-pointer [&>summary]:text-base [&>summary]:marker:text-muted";
const ans = "mt-2 flex flex-col gap-1 text-base";

/** una domanda delle tracce: si apre per vedere risposta e motivo */
export function ExamQA({ t }: { t: ExamQuestion }) {
  return (
    <details className={det}>
      <summary>
        <Rich as="span" html={t.q} />
      </summary>
      <div className={ans}>
        <Rich html={t.a} />
        <Rich html={t.e} />
      </div>
    </details>
  );
}

/** domanda scritta a mano (stesso aspetto) */
export function QA({ q, children }: { q: ReactNode; children: ReactNode }) {
  return (
    <details className={det}>
      <summary>{q}</summary>
      <div className={ans}>{children}</div>
    </details>
  );
}
