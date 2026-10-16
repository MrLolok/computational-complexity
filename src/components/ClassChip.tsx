import type { ClassId } from "@/data/classes/classes";

import Link from "next/link";

import { NAME } from "@/data/classes/classes";
import { classColor, ui } from "@/lib/tokens";

export default function ClassChip({ id }: { id: ClassId }) {
    return (
        <Link
            href={`/classi/${id}`}
            data-term={id}
            className={ui.chip}
            style={classColor(id)}
            dangerouslySetInnerHTML={{ __html: NAME[id] }}
        />
    );
}
