"use server";

import { createClient } from "@/utils/supabase/client";

export async function addRepairShopToFavorites(
  shopID: number,
  customerID: string,
) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Customer Favorites")
    .insert([{ shop_id: shopID, user_id: customerID }]);

  if (error) {
    console.error("Error adding to favorites:", error);
    return null;
  }

  return data;
}

// remove shop from favorites

export async function removeRepairShopFromFavorites(
  shopID: number,
  customerID: string,
) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Customer Favorites")
    .delete()
    .eq("shop_id", shopID)
    .eq("user_id", customerID);

  if (error) {
    console.error("Error removing from favorites:", error);
    return null;
  }

  return data;
}

export async function getCustomerFavorites(customerID: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Customer Favorites")
    .select("*")
    .eq("user_id", customerID);

  if (error) {
    console.error("Error getting favorites:", error);
    return null;
  }

  return data;
}
