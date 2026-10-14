import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeGlossary from "@/lib/rehypeGlossary";
import { readableMath } from "@/lib/mathNotation";

/** Markdown con formule KaTeX ($…$, $$…$$) e tabelle, stilizzato solo con Tailwind. */
export default function Markdown({ children, className = "" }: { children: string; className?: string }) {
  return (
    <div className={`flex flex-col gap-2 [&_p]:max-w-[72ch] [&_strong]:font-semibold [&_a]:text-accent [&_a]:underline [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-0.5 [&_code]:font-mono [&_code]:text-[0.86em] [&_pre]:bg-sunk [&_pre]:rounded-lg [&_pre]:p-3 [&_pre]:overflow-x-auto [&_pre]:text-[0.85rem] [&_table]:w-full [&_table]:border-collapse [&_table]:text-[0.92rem] [&_th]:text-left [&_th]:font-ui [&_th]:text-[0.72rem] [&_th]:uppercase [&_th]:tracking-wider [&_th]:text-muted [&_th]:font-medium [&_th]:border-b [&_th]:border-line [&_th]:p-2 [&_td]:border-b [&_td]:border-line [&_td]:p-2 [&_td]:align-top [&_h2]:font-head [&_h2]:text-[1.4rem] [&_h3]:font-head [&_h3]:text-[1.2rem] [&_blockquote]:border-l-2 [&_blockquote]:border-line-strong [&_blockquote]:pl-3 [&_blockquote]:text-muted [&_.katex-display]:overflow-x-auto [&_.katex-display]:overflow-y-hidden ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex, rehypeGlossary]}>
        {readableMath(children)}
      </ReactMarkdown>
    </div>
  );
}
