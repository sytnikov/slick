import { getAllRepairShops } from "@/server/users/actions";

import BrowseSearch from "@/components/BrowseSearch";
import RepairShopCard from "@/components/RepairShopCard";
import BrowseMap from "@/components/browse-map/BrowseMap";

import { RepairShop } from "@/types";

export default async function Browse() {
  const shops = await getAllRepairShops();

  return (
    <main>
      <div className="grid grid-cols-6 ">
        <div className="col-span-2 flex flex-col items-start pl-4 pt-4">
          <div className={"animate-in h-screen gap-4 overflow-y-scroll"}>
            <h1 className={"mb-6 text-2xl"}>Browse repair shops</h1>
            <div className={"flex flex-row flex-wrap"}>
              {shops.map((shop: RepairShop) => (
                <div className={"mb-4 w-1/2"} key={shop.id}>
                  <RepairShopCard
                    name={shop.name}
                    status={shop.status}
                    description={shop.description}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={"relative col-span-4 h-screen"}>
          <div
            className={
              "animate-in absolute left-0 right-0 top-5 z-10 mx-auto max-w-[65%]"
            }
          >
            <BrowseSearch />
          </div>
          {shops && <BrowseMap shops={shops} />}
        </div>
      </div>
    </main>
  );
}
