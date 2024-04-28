import { getAllRepairShops } from "@/server/repair-shops/actions";

import BrowseMap from "@/components/browse-map/BrowseMap";

import BrowsePageShopList from "@/components/browse-page/BrowsePageShopList";

export default async function Browse() {
  const shops = await getAllRepairShops();

  return (
    <main>
      <div className="grid grid-cols-6 p-2">
        <BrowsePageShopList shops={shops} />
        <div className={"relative col-span-3 h-full"}>
          <BrowseMap shops={shops} />
        </div>
      </div>
    </main>
  );
}
