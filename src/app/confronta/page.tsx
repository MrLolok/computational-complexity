import type { Metadata } from "next";
import ComparePicker from "@/components/classes/ComparePicker";
import CompareVerdict from "@/components/classes/CompareVerdict";

export const metadata: Metadata = { title: "Confronta" };

export default function Page() {
  return (
    <ComparePicker a="DP" b="NPcapcoNP">
      <CompareVerdict a="DP" b="NPcapcoNP" />
    </ComparePicker>
  );
}
