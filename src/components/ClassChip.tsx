import Link from "next/link";
import { NAME, type ClassId } from "@/data/classes";
import { classColor, ui } from "@/lib/ui";

export default function ClassChip({ id }: { id: ClassId }) {
  return (
    <Link href={`/classi/${id}`} className={ui.chip} style={classColor(id)} dangerouslySetInnerHTML={{ __html: NAME[id] }} />
  );
}
