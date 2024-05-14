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

export async function addNewVehicle(formData: FormData, customerId: string) {
  const make = formData.get("make");
  const model = formData.get("model");
  const yearManufactured = formData.get("yearManufactured");
  const description = formData.get("description");
  const registrationNumber = formData.get("registrationNumber");

  const supabase = createClient();
  const { data, error } = await supabase.from("Customer Vehicles").insert([
    {
      make: make,
      model: model,
      year_manufactured: yearManufactured,
      description: description,
      registration_number: registrationNumber,
      associated_user: customerId,
    },
  ]);

  if (error) {
    throw new Error(error.message);
  }

  console.log(data);

  return data;
}

export async function updateVehicle(formData: FormData) {
  const make = formData.get("make");
  const model = formData.get("model");
  const yearManufactured = formData.get("yearManufactured");
  const description = formData.get("description");
  const registrationNumber = formData.get("registrationNumber");
  const vehicleId = formData.get("vehicle_id");

  const supabase = createClient();
  const { data, error } = await supabase
    .from("Customer Vehicles")
    .update({
      make: make,
      model: model,
      year_manufactured: yearManufactured,
      description: description,
      registration_number: registrationNumber,
    })
    .eq("id", vehicleId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
