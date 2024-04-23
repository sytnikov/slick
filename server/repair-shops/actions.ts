"use server";

import { RepairShop, ShopServiceWithDetails } from "@/types";

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
): Promise<ShopServiceWithDetails[]> {
  const supabase = await createClient();
  const { data: shopServices } = await supabase
    .from("Shop Services")
    .select("*")
    .eq("shop_id", shopId);

  if (!shopServices || shopServices.length === 0) {
    throw new Error("No shop services found.");
  }

  const serviceIds = shopServices.map((service) => service.service_id);

  const { data: allServices } = await supabase
    .from("Services")
    .select("*")
    .in("id", serviceIds);

  if (!allServices) {
    throw new Error("Service details could not be fetched.");
  }

  const servicesWithDetails = shopServices.map((shopService) => {
    const serviceDetails = allServices.find(
      (service) => service.id === shopService.service_id,
    );

    return {
      ...shopService,
      duration: shopService.duration,
      price: shopService.price,
      name: serviceDetails?.name,
    };
  });

  return servicesWithDetails;
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

  if (!bookings || bookings.length === 0) {
    console.log("No bookings found for the current month.");
    return 0;
  }

  let totalEarnings = 0;
  bookings.forEach((booking) => {
    if (booking.shop_service_id && booking.shop_service_id.price) {
      totalEarnings += booking.shop_service_id.price;
    }
  });

  return totalEarnings;
}
