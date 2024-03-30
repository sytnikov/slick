"use server";

import { ShopServiceWithDetails } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const supabase = createServerComponentClient({ cookies });

export async function getSpecificShopServices(
  shopId: number,
): Promise<ShopServiceWithDetails[]> {
  const { data: shopServices } = await supabase
    .from("Shop Services")
    .select("*")
    .eq("shop_id", shopId);

  if (!shopServices || shopServices.length === 0) {
    throw new Error("No shop services found.");
  }

  const serviceIds = shopServices.map((service) => service.service_id);

  const { data: allServices } = await supabase
    .from("Services")
    .select("*")
    .in("id", serviceIds);

  if (!allServices) {
    throw new Error("Service details could not be fetched.");
  }

  const servicesWithDetails = shopServices.map((shopService) => {
    const serviceDetails = allServices.find(
      (service) => service.id === shopService.service_id,
    );

    return {
      ...shopService,
      duration: shopService.duration,
      price: shopService.price,
      name: serviceDetails?.name,
    };
  });

  return servicesWithDetails;
}

export async function getServicesByIds(
  serviceIds: string[],
): Promise<ShopServiceWithDetails[]> {
  const { data: allServices } = await supabase
    .from("Services")
    .select("*")
    .in("id", serviceIds);

  return allServices || [];
}
