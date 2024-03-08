import { createClient } from "@/utils/supabase/server";

import BrowseSearch from "@/components/BrowseSearch";
import RepairShopCard from "@/components/RepairShopCard";
import BrowseMap from "@/components/browse-map/BrowseMap";

import { RepairShop } from "@/types";

export default async function Browse() {
  const supabase = createClient();
  const { data: shops } = await supabase.from("Repair Shops").select();

  return (
    <main>
      <div className="grid grid-cols-6 ">
        <div className="col-span-2 flex items-start flex-col pl-4 pt-4">
          <div className={"animate-in h-screen gap-4 overflow-y-scroll"}>
            <h1 className={"text-2xl mb-6"}>Browse repair shops</h1>
            <div className={"flex flex-row flex-wrap"}>
              {shops?.map((shop: RepairShop) => (
                <div className={"w-1/2 mb-4"} key={shop.id}>
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
              "animate-in absolute top-5 left-0 right-0 mx-auto z-10 max-w-[65%]"
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
