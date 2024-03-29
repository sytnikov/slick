import { createClient } from "@/utils/supabase/server";

import { Service, ShopService } from "@/types";
import SingleServiceCard from "@/components/SingleServiceCard";

export default async function RepairShopPage({
  params,
}: {
  params: { id: number };
}) {
  const supabase = createClient();

  // TODO: Clean this up into either helper functions or a custom hook....

  const { data: shopServices } = await supabase
    .from("Shop Services")
    .select("*")
    .eq("shop_id", params.id);

  const serviceIds = shopServices.map((service) => service.service_id);

  const { data: allServices } = await supabase
    .from("Services")
    .select()
    .in("id", serviceIds);

  const { data: shop } = await supabase
    .from("Repair Shops")
    .select()
    .eq("id", params.id)
    .single();

  const combinedServices = shopServices?.map((shopService: ShopService) => {
    const service = allServices?.find(
      (service: Service) => service.id === shopService.service_id,
    );
    return {
      ...shopService,
      name: service?.name,
    };
  });

  return (
    <main className="flex w-full flex-1 flex-col items-center gap-20">
      <div className="animate-in flex max-w-4xl flex-1 flex-col gap-20 px-3 opacity-0">
        <main className="flex flex-1 flex-col justify-center">
          <h2 className="mb-4 text-4xl font-bold">{shop.name}</h2>
          {combinedServices?.map((service: ShopService & { name: string }) => (
            <SingleServiceCard
              key={service.id}
              serviceID={service.id}
              name={service.name}
              duration={service.duration}
              price={service.price}
              shopID={params.id}
              seats={shop.number_of_employees}
            />
          ))}
        </main>
      </div>
    </main>
  );
}
