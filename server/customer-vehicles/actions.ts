"use server";

import { CustomerVehicle } from "@/types";
import { createClient } from "@/utils/supabase/client";

export async function getCustomerVehicles(
  userId: string,
): Promise<CustomerVehicle[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Customer Vehicles")
    .select("*")
    .eq("associated_user", userId);

  if (error) {
    console.error("Error fetching user vehicles:", error);
    return [];
  }

  return data;
}

export async function getCustomerVehicleById(
  vehicleId: number | string,
): Promise<CustomerVehicle | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Customer Vehicles")
    .select("*")
    .eq("id", vehicleId)
    .single();

  if (error) {
    console.error("Error fetching user vehicles:", error);
    return null;
  }

  return data;
}
