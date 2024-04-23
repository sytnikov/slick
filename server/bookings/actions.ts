"use server";

import { RepairShopBooking } from "@/types";
import { createClient } from "@/utils/supabase/client";

export async function getBookingsForUserShop(
  shopId: number,
): Promise<RepairShopBooking[]> {
  const supabase = await createClient();
  const { data: bookings, error: bookingError } = await supabase
    .from("Bookings")
    .select(
      `
      *,
      shop_service_id (
        *,
        service_id (name)
      )
    `,
    )
    .eq("shop_id", shopId);

  if (bookingError || !bookings || bookings.length === 0) {
    console.error(
      "Failed to fetch bookings or no bookings found:",
      bookingError,
    );
    return [];
  }

  const userIds = bookings.map((booking) => booking.user_id);

  const { data: userProfiles, error: userProfilesError } = await supabase
    .from("User Profiles")
    .select("user_id, first_name, surname")
    .in("user_id", userIds);

  if (userProfilesError) {
    console.error("Failed to fetch user profiles:", userProfilesError);
    return [];
  }

  const userIdToName = userProfiles.reduce((acc, profile) => {
    //@ts-ignore
    acc[profile.user_id] = `${profile.first_name} ${profile.surname}`;
    return acc;
  }, {});

  // Map each booking to include detailed information including customer name
  const bookingWithDetails = bookings.map((booking) => {
    const shopService = booking.shop_service_id;
    const service = shopService.service_id;
    //@ts-ignore
    const customerName = userIdToName[booking.user_id] || "Unknown Customer";

    return {
      id: booking.id,
      shop_id: booking.shop_id,
      booking_date: booking.booking_start_date,
      service_booked: service.name || "Unknown Service",
      service_price: shopService.price || 0,
      customer_name: customerName,
    };
  });

  return bookingWithDetails;
}
