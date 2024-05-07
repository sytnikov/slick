import { getShopsByFilter } from "@/server/repair-shops/actions";

import BrowseMap from "@/components/browse-map/BrowseMap";

import PageLayout from "@/components/layouts/PageLayout";
import BrowseSearch from "@/components/browse-page/BrowseSearch";
import RepairShopCard from "@/components/cards/RepairShopCard";
import NoResults from "@/components/browse-page/NoResults";

import { RepairShop } from "@/types";

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
                    imageURL={shop.banner_img_url}
                  />
                </div>
              ))
            ) : (
              <NoResults />
            )}
          </div>
        </div>
        <div className={"relative min-h-screen min-w-[50%] "}>
          <BrowseMap shops={shops} />
        </div>
      </main>
    </PageLayout>
  );
}
