"use server";

import { createClient } from "@/utils/supabase/client";

import { ShopServiceWithDetails } from "@/types";

export async function getServicesByIds(
  serviceIds: string[],
): Promise<ShopServiceWithDetails[]> {
  const supabase = await createClient();
  const { data: allServices } = await supabase
    .from("Services")
    .select("*")
    .in("id", serviceIds);

  return allServices || [];
}

export async function getSingleShopServicTitle(
  id: string,
): Promise<ShopServiceWithDetails> {
  const supabase = await createClient();
  const { data: service } = await supabase
    .from("Services")
    .select("*")
    .eq("id", id)
    .single();
  return service.name;
}

export async function getShopServiceById(
  serviceId: string,
): Promise<ShopServiceWithDetails> {
  const supabase = await createClient();
  const { data: service } = await supabase
    .from("Shop Services")
    .select("*")
    .eq("id", serviceId)
    .single();

  return service || {};
}
