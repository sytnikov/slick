"use server";

import { createClient } from "@/utils/supabase/server";

const supabase = createClient();

export async function getShopById(shopId: string) {
  const { data: shop } = await supabase
    .from("Repair Shops")
    .select("*")
    .eq("id", shopId)
    .single();
  return shop;
}

export async function getAllRepairShops() {
  const { data: repairShops } = await supabase.from("Repair Shops").select("*");
  return repairShops || [];
}

export async function getRepairShopsAssociatedWithUser(id: string) {
  const { data: repairShops } = await supabase
    .from("Repair Shops")
    .select("*")
    .eq("associated_user", id);

  return repairShops || [];
}
