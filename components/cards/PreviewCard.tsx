import Link from "next/link";
import { RepairShop } from "@/types";

interface PreviewCardProps {
  repairShop: RepairShop | null;
}

export default function PreviewCard({ repairShop }: PreviewCardProps) {
  return repairShop ? (
    <Link
      href={`/repair-shops/${repairShop.id}`}
      className={
        "inline-block text-nowrap rounded-md bg-black p-2 text-center text-white"
      }
    >
      <p className={"text-2xs font-bold"}>{repairShop.name}</p>
    </Link>
  ) : null;
}
