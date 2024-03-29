"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import { UserProfile } from "@/types";

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
  return repairshops || [];
}

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

// this function isn't used anywhere at the moment but we can use it to get the user profile details later on

export async function getUserProfileDetail(
  userProfile: UserProfile,
  detail: keyof UserProfile,
): Promise<UserProfile[keyof UserProfile]> {
  return userProfile[detail];
}

export async function getUser(): Promise<UserProfile> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/login");
  }
  const { data: userProfile } = await supabase
    .from("User Profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  return userProfile;
}

export async function getRepairShopsAssociatedWithUser(id: string) {
  const { data: repairShops } = await supabase
    .from("Repair Shops")
    .select("*")
    .eq("associated_user", id);

  return repairShops || [];
}

export async function getBookingsForUsersShops(shopIds: number[]) {
  const { data: bookings } = await supabase
    .from("Bookings")
    .select("*")
    .in("shop_id", shopIds);

  return bookings || [];
}
