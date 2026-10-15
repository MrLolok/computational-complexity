import { redirect } from "next/navigation";

/** Mantiene i vecchi collegamenti: DP ora fa parte delle classi. */
export default function Page() {
    redirect("/classi/DP");
}
