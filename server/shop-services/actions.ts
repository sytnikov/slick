"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/client";
import { formatDateTime } from "@/utils/booking-system/date-utils";
import { ShopService } from "@/types";

export async function getServicesByIds(
  serviceIds: string[],
): Promise<ShopService[]> {
  const supabase = await createClient();
  const { data: allServices } = await supabase
    .from("Services")
    .select("*")
    .in("id", serviceIds);

  return allServices || [];
}

export async function getShopServiceById(
  serviceId: string,
): Promise<ShopService> {
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
  const price = formData.get("price");
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
      price: price,
    },
  ]);

  if (error) {
    throw new Error(error.message);
  }

  return redirect("/user-dashboard");
}

export async function updateShopService(formData: FormData) {
  const serviceName = formData.get("service_name");
  const price = formData.get("price");
  const duration = formData.get("duration");
  const serviceID = formData.get("service_id");

  console.log("forData", formData);

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("Shop Services")
    .update({
      service_name: serviceName,
      duration: duration,
      price: price,
    })
    .eq("id", serviceID);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteShopService(formData: FormData) {
  const serviceId = formData.get("service_id");

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("Shop Services")
    .delete()
    .eq("id", serviceId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function addNewService(formData: FormData) {
  const serviceName = formData.get("service_name");
  const price = formData.get("price");
  const duration = formData.get("duration");
  const shopID = formData.get("shop_id");

  const supabase = await createClient();
  const { data, error } = await supabase.from("Shop Services").insert([
    {
      service_name: serviceName,
      price: price,
      duration: duration,
      shop_id: shopID,
    },
  ]);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
