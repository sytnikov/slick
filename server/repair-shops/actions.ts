"use server";

import { RepairShop, ShopService } from "@/types";

import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

export async function getAllRepairShops(): Promise<RepairShop[]> {
  const supabase = await createClient();
  const { data: repairShops } = await supabase.from("Repair Shops").select("*");
  return repairShops || [];
}

export async function getShopById(shopId: number): Promise<RepairShop> {
  const supabase = await createClient();
  const { data: shop } = await supabase
    .from("Repair Shops")
    .select("*")
    .eq("id", shopId)
    .single();
  return shop;
}

export async function getSpecificShopServices(
  shopId: number,
): Promise<ShopService[]> {
  const supabase = await createClient();
  const { data: shopServices } = await supabase
    .from("Shop Services")
    .select("*")
    .eq("shop_id", shopId);
  return shopServices || [];
}

export async function getShopsMonthlyEarnings(shopId: number) {
  const supabase = await createClient();

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const { data: bookings, error: bookingError } = await supabase
    .from("Bookings")
    .select("*, shop_service_id (price)")
    .eq("shop_id", shopId)
    .gte(
      "booking_start_date",
      new Date(currentYear, currentMonth, 1).toISOString(),
    )
    .lt(
      "booking_start_date",
      new Date(currentYear, currentMonth + 1, 1).toISOString(),
    );

  if (bookingError) {
    console.error("Error fetching bookings:", bookingError);
    return 0;
  }

  const totalEarnings = bookings.reduce(
    (acc, booking) => acc + booking.price,
    0,
  );

  return totalEarnings;
}

export async function saveChangesMadeToRepairShop(
  formData: FormData,
  shopID: number,
) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("Repair Shops")
    .update({
      name: formData.get("name"),
      description: formData.get("description"),
      street_address: formData.get("street_address"),
      postal_code: formData.get("postal_code"),
      city: formData.get("city"),
      opening_time: formData.get("opening_time"),
      closing_time: formData.get("closing_time"),
      number_of_employees: formData.get("number_of_employees"),
    })
    .eq("id", shopID);

  if (error) {
    console.error("Error updating user profile:", error);
    return false;
  }

  return data;
}

export async function getAllCities(): Promise<string[]> {
  try {
    const supabase = createClient();
    const { data: repairShops, error } = await supabase
      .from("Repair Shops")
      .select("city");

    if (error) throw error;
    if (!repairShops) return [];

    const cities = repairShops.map((shop) => shop.city);
    return Array.from(new Set(cities));
  } catch (error) {
    console.error("Error fetching cities:", error);
    return [];
  }
}

// get all status types, no duplicates

export async function getAllStatuses(): Promise<string[]> {
  try {
    const supabase = createClient();
    const { data: repairShops, error } = await supabase
      .from("Repair Shops")
      .select("status");

    if (error) throw error;
    if (!repairShops) return [];

    const statuses = repairShops.map((shop) => shop.status);
    return Array.from(new Set(statuses));
  } catch (error) {
    console.error("Error fetching statuses:", error);
    return [];
  }
}

export async function getShopsByFilter(filters: {
  city?: string;
  status?: string;
  name?: string;
  service?: string;
}): Promise<RepairShop[]> {
  const supabase = createClient();

  let repairShopQuery = supabase.from("Repair Shops").select("*");

  if (filters.city) {
    repairShopQuery = repairShopQuery.eq("city", filters.city);
  }

  if (filters.status) {
    repairShopQuery = repairShopQuery.eq("status", filters.status);
  }

  if (filters.name) {
    repairShopQuery = repairShopQuery.ilike("name", `%${filters.name}%`);
  }

  if (filters.service) {
    const { data: shopServices, error } = await supabase
      .from("Shop Services")
      .select("shop_id")
      .eq("service_name", filters.service);

    if (error) {
      console.error("Error fetching shop services:", error);
      return [];
    }

    const shopIds = shopServices.map((service) => service.shop_id);
    repairShopQuery = repairShopQuery.in("id", shopIds);
  }

  const { data: repairShops, error } = await repairShopQuery;

  if (error) {
    console.error("Error fetching repair shops:", error);
    return [];
  }

  return repairShops || [];
}

export async function getShopBannerImageUrl(shopId: number): Promise<string> {
  const supabase = createClient();
  const { data: shop, error } = await supabase
    .from("Repair Shops")
    .select("banner_img_url")
    .eq("id", shopId)
    .single();

  if (error || !shop || !shop.banner_img_url) {
    return "";
  }

  return `${process.env.NEXT_PUBLIC_SUPABASE_BUCKET_URL}/Shop%20Banners/${encodeURIComponent(shop.banner_img_url)}`;
}

export async function createRepairShop(
  formData: FormData,
): Promise<RepairShop> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("Repair Shops").insert({
    associated_user: formData.get("associated_user"),
    name: formData.get("name"),
    description: formData.get("description"),
    street_address: formData.get("street_address"),
    postal_code: formData.get("postal_code"),
    city: formData.get("city"),
    opening_time: formData.get("opening_time"),
    closing_time: formData.get("closing_time"),
    number_of_employees: formData.get("number_of_employees"),
  });

  if (error) {
    console.error("Error creating repair shop:", error);
    return {} as RepairShop;
  }

  return redirect("/shop-dashboard");
}
