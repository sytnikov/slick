import { getAllRepairShops } from "@/server/repair-shops/actions";

import BrowseMap from "@/components/browse-map/BrowseMap";

import BrowsePageShopList from "@/components/browse-page/BrowsePageShopList";

export default async function Browse({
  searchParams,
}: {
  searchParams: { city: string; service: string };
}) {
  const { city } = searchParams;
  const { service } = searchParams;

  const shops = await getAllRepairShops();

  return (
    <>
      <main className="grid grid-cols-6 p-2">
        <BrowsePageShopList shops={shops} />
        <div className={"relative col-span-3 h-full"}>
          <BrowseMap shops={shops} />
        </div>
      </main>
    </>
  );
}
