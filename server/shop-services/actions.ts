"use server";

import { createClient } from "@/utils/supabase/client";

import { ShopServiceWithDetails } from "@/types";
import { format } from "path";

export async function getServicesByIds(
  serviceIds: string[],
): Promise<ShopServiceWithDetails[]> {
  const supabase = await createClient();
  const { data: allServices } = await supabase
    .from("Services")
    .select("*")
    .in("id", serviceIds);

  return allServices || [];
}

export async function getShopServiceById(
  serviceId: string,
): Promise<ShopServiceWithDetails> {
  const supabase = await createClient();
  const { data: service } = await supabase
    .from("Shop Services")
    .select("*")
    .eq("id", serviceId)
    .single();

  return service || {};
}

export async function createNewBooking(formData: FormData): Promise<void> {
  const supabase = await createClient();
  await supabase.from("Bookings").insert({
    formData,
  });

  console.log("Booking created with info: ", formData.values);
}
