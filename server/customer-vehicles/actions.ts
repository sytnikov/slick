"use server";

import { CustomerVehicle } from "@/types";
import { createClient } from "@/utils/supabase/client";

export async function getUserVehicles(
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

export async function getVehicleById(
  vehicleId: string,
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

// this isn't used anywhere at the moment, more of just a proof of concept...
export async function getUserProfileFromVehicleID() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Customer Vehicles")
    .select(`*, associated_user("*")`);

  if (error) {
    console.error("Error fetching user vehicles:", error);
    return null;
  }

  return data;
}
