"use server";

import { redirect } from "next/navigation";

import { RepairShop, UserProfile } from "@/types";

import { createClient } from "@/utils/supabase/server";

export async function getUser(): Promise<UserProfile | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return null;
  }
  const { data: userProfile } = await supabase
    .from("User Profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  return userProfile;
}

export async function getRepairShopAssociatedWithUser(): Promise<RepairShop> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/login");
  }
  const { data: repairShop } = await supabase
    .from("Repair Shops")
    .select("*")
    .eq("associated_user", user.id);

  if (!repairShop) {
    throw new Error("No repair shop found.");
  }

  return repairShop[0] || null;
}
