import Image from "next/image";
import CardStatusBadge from "./CardStatusBadge";
import CardServiceList from "./CardServiceList";
import Link from "next/link";

interface RepairShopCardProps {
  shopID: number;
  name: string;
  description: string;
  status: string;
}

export default function RepairShopCard({
  shopID,
  name,
  status,
  description,
}: RepairShopCardProps) {
  return (
    <Link href={`/repair-shops/${shopID}`}>
      <div className="card mr-6 h-full overflow-hidden rounded-xl border-2 border-gray-100 bg-white">
        <div className={"relative"}>
          <Image
            src="https://placehold.co/600x400"
            alt="Shop image"
            width={800}
            height={500}
          />
          <div className={"absolute right-5 top-5"}>
            <CardStatusBadge status={status as any} />
          </div>
        </div>
        <div className="h-full p-4">
          <h2 className="mb-4 text-xl font-semibold">{name}</h2>
          <div className={"mb-3"}>
            <CardServiceList shopID={shopID} />
          </div>
          <p className={"font-light opacity-50"}>{description}</p>
        </div>
      </div>
    </Link>
  );
}
