"use server";

import { createClient } from "@/utils/supabase/server";

import { ShopServiceWithDetails } from "@/types";

const supabase = createClient();

export async function getServicesByIds(
  serviceIds: string[],
): Promise<ShopServiceWithDetails[]> {
  const { data: allServices } = await supabase
    .from("Services")
    .select("*")
    .in("id", serviceIds);

  return allServices || [];
}
