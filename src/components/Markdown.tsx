import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import rehypeGlossary from "@/lib/rehypeGlossary";

/** Markdown con formule KaTeX ($…$, $$…$$) e tabelle, stilizzato solo con Tailwind. */
export default function Markdown({ children, className = "" }: { children: string; className?: string }) {
    return (
        <div
            className={`[&_a]:text-accent [&_pre]:bg-sunk [&_th]:font-ui [&_th]:text-muted [&_th]:border-line [&_td]:border-line [&_h2]:font-head [&_h3]:font-head [&_blockquote]:border-line-strong [&_blockquote]:text-muted flex flex-col gap-2 [&_.katex-display]:overflow-x-auto [&_.katex-display]:overflow-y-hidden [&_a]:underline [&_blockquote]:border-l-2 [&_blockquote]:pl-3 [&_code]:font-mono [&_code]:text-sm [&_h2]:text-2xl [&_h3]:text-xl [&_li]:my-0.5 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:max-w-prose [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:p-3 [&_pre]:text-sm [&_strong]:font-medium [&_table]:w-full [&_table]:border-collapse [&_table]:text-base [&_td]:border-b [&_td]:p-2 [&_td]:align-top [&_td]:wrap-normal [&_td_.katex]:whitespace-nowrap [&_th]:border-b [&_th]:p-2 [&_th]:text-left [&_th]:text-xs [&_th]:font-medium [&_th]:tracking-wider [&_th]:wrap-normal [&_th]:uppercase [&_th_.katex]:normal-case [&_ul]:list-disc [&_ul]:pl-5 ${className}`}
        >
            <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex, rehypeGlossary]}
                components={{
                    table: ({ children }) => (
                        <div
                            role="region"
                            aria-label="Tabella"
                            tabIndex={0}
                            className="min-w-0 overflow-x-auto overscroll-x-contain"
                        >
                            <table>{children}</table>
                        </div>
                    ),
                }}
            >
                {children}
            </ReactMarkdown>
        </div>
    );
}
