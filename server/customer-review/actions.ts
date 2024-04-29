"use server";

import { CustomerReviewWithDetails } from "@/types";
import { createClient } from "@/utils/supabase/client";

export async function getRepairShopReviews(
  shopID: number,
): Promise<CustomerReviewWithDetails[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("Customer Reviews")
    .select("*")
    .eq("repair_shop_id", shopID);

  if (!data) {
    console.log("No reviews found for shop with ID:", shopID);
    return [];
  }

  const enhancedCustomerReviews = await Promise.all(
    data.map(async (review) => {
      // Fetch user profile
      const { data: userProfile, error: profileError } = await supabase
        .from("User Profiles")
        .select("first_name, surname")
        .eq("user_id", review.customer_id)
        .single();

      if (profileError) {
        console.error("Error fetching user profile:", profileError);
        return { ...review, customer_name: "Unknown Customer" };
      }

      return {
        ...review,
        customer_name: `${userProfile.first_name} ${userProfile.surname}`,
      };
    }),
  );

  if (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }

  return enhancedCustomerReviews;
}
