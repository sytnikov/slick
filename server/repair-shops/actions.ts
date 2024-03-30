"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const supabase = createServerComponentClient({ cookies });

export async function getShopById(shopId: number) {
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
