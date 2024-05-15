import PageLayout from "@/components/layouts/PageLayout";

import {
  getShopById,
  getSpecificShopServices,
} from "@/server/repair-shops/actions";

import RepairShopHeader from "@/components/shop-page/RepairShopHeader";
import RepairShopServices from "@/components/shop-page/RepairShopServices";
import RepairShopReview from "@/components/shop-page/RepairShopReview";
import RepairShopLocationMap from "@/components/shop-page/RepairShopLocationMap";

export const revalidate = 0;

export default async function RepairShopPage({
  params,
}: {
  params: { id: number };
}) {
  const shop = await getShopById(params.id);
  const services = await getSpecificShopServices(shop.id);

  return (
    <PageLayout>
      <main className="flex w-full max-w-[70%] flex-1 flex-col items-center">
        <RepairShopHeader
          shopID={shop.id}
          shopName={shop.name}
          shopCity={shop.city}
        />
        <div
          className={
            "flex w-full flex-col items-start justify-start gap-4 pb-8 pt-8"
          }
        >
          <h1 className={"text-4xl"}>About us</h1>
          <div className={"w-[65%]"}>
            <p className={"text-xl opacity-75"}>{shop.description}</p>
          </div>
        </div>
        <div className={"borxpder-b-2 w-full border-gray-200"} />
        <RepairShopServices shopServices={services} repairShop={shop} />
        <RepairShopReview shopID={shop.id} />
        <RepairShopLocationMap shop={shop} />
      </main>
    </PageLayout>
  );
}
