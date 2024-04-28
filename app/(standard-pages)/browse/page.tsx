import { getShopsByFilter } from "@/server/repair-shops/actions";

import BrowseMap from "@/components/browse-map/BrowseMap";

import BrowseSearch from "@/components/browse-page/BrowseSearch";
import RepairShopCard from "@/components/cards/RepairShopCard";

import { RepairShop } from "@/types";

export default async function Browse({
  searchParams,
}: {
  searchParams: { city: string; service: string; status: string };
}) {
  const { city } = searchParams;
  const { service } = searchParams;
  const { status } = searchParams;

  const shops = await getShopsByFilter({ city, service, status });

  return (
    <main className="grid grid-cols-6 p-2">
      <div className="relative col-span-3 min-h-screen bg-gray-100">
        <BrowseSearch />
        <div
          className={
            "flex max-h-screen flex-row flex-wrap overflow-auto pl-4 pr-4 pt-4"
          }
        >
          {shops.map((shop: RepairShop) => (
            <div className={"mb-4 w-1/2"} key={shop.id}>
              <RepairShopCard
                shopID={shop.id}
                name={shop.name}
                status={shop.status}
                description={shop.description}
              />
            </div>
          ))}
        </div>
      </div>
      <div className={"relative col-span-3 h-full"}>
        <BrowseMap shops={shops} />
      </div>
    </main>
  );
}
