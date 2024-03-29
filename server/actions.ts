"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

// this is where we should move all of the server actions for the sake of our mental health!

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
  const { data: repairshops } = await supabase.from("Repair Shops").select("*");
  return repairshops;
}
