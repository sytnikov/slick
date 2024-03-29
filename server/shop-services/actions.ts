"use server";

import { createClient } from "@/utils/supabase/server";

const supabase = createClient();

export async function getShopServices(shopId: string) {
  const { data: shopServices } = await supabase
    .from("Shop Services")
    .select("*")
    .eq("shop_id", shopId);
  return shopServices || [];
}

export async function getServicesByIds(serviceIds: string[]) {
  const { data: allServices } = await supabase
    .from("Services")
    .select("*")
    .in("id", serviceIds);

  return allServices || [];
}
