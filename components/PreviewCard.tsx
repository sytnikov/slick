import { RepairShop } from "@/types";
import Link from "next/link";

interface PreviewCardProps {
  repairShop: RepairShop | null;
}

export default function PreviewCard({ repairShop }: PreviewCardProps) {
  return repairShop ? (
    <div className={"flex flex-col gap-4 p-4 border-2"}>
      <h1>{repairShop.name}</h1>
      <Link href={`/repair-shops/${repairShop.id}`}>
        <button className={"btn btn-secondary"}>See details</button>
      </Link>
    </div>
  ) : null;
}
