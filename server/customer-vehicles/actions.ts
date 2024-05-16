"use server";

import { revalidatePath } from "next/cache";

import { FormDataType } from "@/components/customer-dashboard/AddNewVehicleForm";
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

export async function addNewVehicle(
  formData: FormDataType,
  customerId: string,
) {
  const make = formData.make;
  const model = formData.model;
  const yearManufactured = formData.yearManufactured;
  const registrationNumber = formData.registrationNumber;
  const description = formData.description;

  const supabase = createClient();
  const { data, error } = await supabase
    .from("Customer Vehicles")
    .insert([
      {
        make: make,
        model: model,
        year_manufactured: yearManufactured,
        description: description,
        registration_number: registrationNumber,
        associated_user: customerId,
      },
    ])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/customer-vehicles");

  return data;
}

export async function updateVehicle(formData: FormDataType, vehicleId: number) {
  const make = formData.make;
  const model = formData.model;
  const yearManufactured = formData.yearManufactured;
  const registrationNumber = formData.registrationNumber;
  const description = formData.description;

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
    .eq("id", vehicleId)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/customer-vehicles");

  return data;
}

export async function deleteVehicle(vehicleId: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Customer Vehicles")
    .delete()
    .eq("id", vehicleId)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/customer-vehicles");

  return data;
}
