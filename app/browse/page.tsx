import { getShopsByFilter } from "@/server/repair-shops/actions";

import BrowseMap from "@/components/browse-map/BrowseMap";

import PageLayout from "@/components/layouts/PageLayout";
import BrowseSearch from "@/components/browse-page/BrowseSearch";

import { RepairShop } from "@/types";
import RepairShopList from "@/components/browse-page/RepairShopList";

export const revalidate = 0;

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
    <PageLayout>
      <main className="flex min-w-full flex-row items-start justify-start">
        <div className="min-h-screen min-w-[50%]">
          <BrowseSearch shops={shops} />
          <RepairShopList shops={shops} />
        </div>
        <div className={"relative min-h-screen min-w-[50%] "}>
          <BrowseMap shops={shops} />
        </div>
      </main>
    </PageLayout>
  );
}
