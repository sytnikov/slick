import { getShopsByFilter } from "@/server/repair-shops/actions";

import BrowseMap from "@/components/browse-map/BrowseMap";

import BrowsePageShopList from "@/components/browse-page/BrowsePageShopList";

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
      <BrowsePageShopList shops={shops} />
      <div className={"relative col-span-3 h-full"}>
        <BrowseMap shops={shops} />
      </div>
    </main>
  );
}
