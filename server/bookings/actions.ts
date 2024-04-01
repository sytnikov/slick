"use server";

import { RepairShopBooking } from "@/types";

import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export async function getBookingsForUsersShops(
  shopIds: number[],
): Promise<RepairShopBooking[]> {
  const { data: bookings } = await supabase
    .from("Bookings")
    .select("*")
    .in("shop_id", shopIds);

  if (!bookings || bookings.length === 0) {
    throw new Error("No bookings found.");
  }

  const shopServiceIds = bookings.map((booking) => booking.shop_service_id);
  const { data: shopServices } = await supabase
    .from("Shop Services")
    .select("*")
    .in("id", shopServiceIds);

  if (!shopServices) {
    throw new Error("No shop services found.");
  }

  const serviceIds = shopServices.map((ss) => ss.service_id);
  const { data: services } = await supabase
    .from("Services")
    .select("*")
    .in("id", serviceIds);

  const { data: shops } = await supabase
    .from("Repair Shops")
    .select("*")
    .in("id", shopIds);

  if (!shops) {
    throw new Error("No shops found.");
  }

  const userIds = bookings.map((booking) => booking.user_id);
  const { data: userProfiles } = await supabase
    .from("User Profiles")
    .select("*")
    .in("user_id", userIds);

  const bookingWithDetails = bookings.map((booking) => {
    const shopService = shopServices.find(
      (shopService) => shopService.id === booking.shop_service_id,
    );
    const service = services?.find((s) => s.id === shopService?.service_id);
    const shop = shops.find((shop) => shop.id === booking.shop_id);
    const userProfile = userProfiles?.find(
      (user) => user.user_id === booking.user_id,
    );

    const customerName = userProfile
      ? `${userProfile.first_name} ${userProfile.surname}`
      : "Unknown Customer";

    return {
      id: booking.id,
      shop_id: booking.shop_id,
      booking_date: booking.booking_start_date,
      shop_name: shop?.name || "Unknown Shop",
      service_booked: service?.name || "Unknown Service",
      customer_name: customerName,
    };
  });

  return bookingWithDetails;
}
