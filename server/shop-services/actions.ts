"use server";

import { createClient } from "@/utils/supabase/server";

const supabase = createClient();

export async function getSpecificShopServices(shopId: number) {
  const { data: shopServices } = await supabase
    .from("Shop Services")
    .select("*")
    .eq("shop_id", shopId);

  if (!shopServices) {
    throw new Error("No shop services found.");
  }

  return shopServices || [];
}

export async function getServicesByIds(serviceIds: string[]) {
  const { data: allServices } = await supabase
    .from("Services")
    .select("*")
    .in("id", serviceIds);

  return allServices || [];
}
