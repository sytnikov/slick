"use server";

import { cookies } from "next/headers";

import { BookingWithDetails, RepairShopBooking } from "@/types";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@/utils/supabase/server";

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

// this isn't great, but we'll get back to this later...

export async function getUsersBookings(
  userId: string,
): Promise<BookingWithDetails[]> {
  const { data: bookings } = await supabase
    .from("Bookings")
    .select("*")
    .eq("user_id", userId);

  if (!bookings) {
    throw new Error("No bookings found.");
  }

  const shopIds = bookings.map((booking) => booking.shop_id);
  const { data: shops } = await supabase
    .from("Repair Shops")
    .select("id, name")
    .in("id", shopIds);

  if (!shops) {
    throw new Error("No shops found.");
  }

  const serviceIds = bookings.map((booking) => booking.shop_service_id);
  const { data: services } = await supabase
    .from("Services")
    .select("id, name")
    .in("id", serviceIds);

  if (!services) {
    throw new Error("No services found.");
  }

  const shopLookup = shops.reduce((acc, shop) => {
    // @ts-ignore
    acc[shop.id] = shop.name;
    return acc;
  }, {});

  const serviceLookup = services.reduce((acc, service) => {
    // @ts-ignore
    acc[service.id] = service.name;
    return acc;
  }, {});

  const bookingsWithDetails = bookings.map((booking) => ({
    ...booking,
    // @ts-ignore
    shopName: shopLookup[booking.shop_id],
    // @ts-ignore
    serviceName: serviceLookup[booking.shop_service_id],
  }));

  return bookingsWithDetails;
}
