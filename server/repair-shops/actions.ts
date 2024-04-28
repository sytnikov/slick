"use server";

import { RepairShop, ShopService } from "@/types";

import { createClient } from "@/utils/supabase/client";

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
