"use server";

import { CustomerReviewWithDetails } from "@/types";
import { createClient } from "@/utils/supabase/client";

export async function getRepairShopReviews(
  shopID: number,
): Promise<CustomerReviewWithDetails[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("Customer Reviews")
    .select(`*, user_id("*")`)
    .eq("repair_shop_id", shopID);

  if (error || !data) {
    console.error("Error fetching reviews:", error);
    return [];
  }

  return data;
}
