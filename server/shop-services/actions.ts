"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/client";
import { formatDateTime } from "@/utils/booking-system/date-utils";

import { ShopServiceWithDetails } from "@/types";

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

export async function getSingleShopServicTitle(
  id: string,
): Promise<ShopServiceWithDetails> {
  const supabase = await createClient();
  const { data: service } = await supabase
    .from("Services")
    .select("*")
    .eq("id", id)
    .single();
  return service.name;
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

export async function getShopServices(shopId: number) {
  const supabase = await createClient();
  const { data: shopServices } = await supabase
    .from("Shop Services")
    .select("*")
    .eq("shop_id", shopId);

  return shopServices || [];
}

export async function makeBooking(formData: FormData) {
  const shopServiceID = formData.get("shop_service_id");
  const userID = formData.get("user_id");
  const bookingStart = formatDateTime(formData.get("booking_start") as string);
  const shopID = formData.get("shop_id");
  const duration = formData.get("duration");

  const supabase = await createClient();

  const { error } = await supabase.from("Bookings").insert([
    {
      shop_service_id: shopServiceID,
      user_id: userID,
      booking_start_date: bookingStart,
      shop_id: shopID,
      duration: duration,
    },
  ]);

  if (error) {
    throw new Error(error.message);
  }

  return redirect("/user-dashboard");
}
