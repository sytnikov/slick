"use server";

import { createClient } from "@/utils/supabase/client";
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

export async function getShopServices(shopId: number): Promise<ShopService[]> {
  const supabase = await createClient();
  const { data: shopServices } = await supabase
    .from("Shop Services")
    .select("*")
    .eq("shop_id", shopId);

  return shopServices || [];
}

export async function updateShopService(formData: FormData) {
  const serviceName = formData.get("service_name");
  const price = formData.get("price");
  const duration = formData.get("duration");
  const serviceID = formData.get("service_id");

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

  const { data: existingServices, error: getServiceError } = await supabase
    .from("Shop Services")
    .select("*")
    .eq("service_name", serviceName)
    .eq("shop_id", shopID);

  if (getServiceError) {
    throw new Error(getServiceError.message);
  }

  if (existingServices.length > 0) {
    throw new Error("A service with this name already exists.");
  }

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

  console.log("new service added: ", data);
  return data;
}
