"use server";

import { RepairShop, ShopServiceWithDetails } from "@/types";

import { createClient } from "@/utils/supabase/client";

export async function getAllRepairShops(): Promise<RepairShop[]> {
  const supabase = await createClient();
  const { data: repairShops } = await supabase.from("Repair Shops").select("*");
  return repairShops || [];
}

export async function getShopById(shopId: number): Promise<RepairShop> {
  const supabase = await createClient();
  const { data: shop } = await supabase
    .from("Repair Shops")
    .select("*")
    .eq("id", shopId)
    .single();
  return shop;
}

export async function getSpecificShopServices(
  shopId: number,
): Promise<ShopServiceWithDetails[]> {
  const supabase = await createClient();
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
