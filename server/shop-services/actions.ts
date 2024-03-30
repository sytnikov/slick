"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const supabase = createServerComponentClient({ cookies });

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
