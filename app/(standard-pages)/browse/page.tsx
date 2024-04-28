import { getShopsByFilter } from "@/server/repair-shops/actions";

import BrowseMap from "@/components/browse-map/BrowseMap";

import BrowseSearch from "@/components/browse-page/BrowseSearch";
import RepairShopCard from "@/components/cards/RepairShopCard";

import { RepairShop } from "@/types";
import ClearFiltersButton from "@/components/browse-page/ClearFiltersButton";

export default async function Browse({
  searchParams,
}: {
  searchParams: { city: string; service: string; status: string; name: string };
}) {
  const { city } = searchParams;
  const { service } = searchParams;
  const { status } = searchParams;
  const { name } = searchParams;

  const shops = await getShopsByFilter({ city, service, status, name });

  return (
    <main className="flex min-w-full flex-row items-start justify-start p-2">
      <div className="min-h-screen min-w-[50%]">
        <BrowseSearch shops={shops} />
        <div
          className={
            "flex max-h-screen flex-row flex-wrap overflow-auto pl-4 pr-4 pt-4"
          }
        >
          {shops.length > 0 ? (
            shops.map((shop: RepairShop) => (
              <div className={"mb-4 w-1/2"} key={shop.id}>
                <RepairShopCard
                  shopID={shop.id}
                  name={shop.name}
                  status={shop.status}
                  description={shop.description}
                />
              </div>
            ))
          ) : (
            <div
              className={
                "flex h-full w-full flex-col items-center justify-center gap-4 text-lg"
              }
            >
              No shops found
              <div>
                <ClearFiltersButton buttonVariant={"secondary"} />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={"relative min-h-screen min-w-[50%] "}>
        <BrowseMap shops={shops} />
      </div>
    </main>
  );
}
