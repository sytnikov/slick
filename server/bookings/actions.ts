"use server";

import { BookingWithDetails } from "@/types";
import { startOfMonth, parseISO, differenceInCalendarMonths } from "date-fns";
import { generatePast12Months } from "@/utils/booking-system/date-utils";

import { createClient } from "@/utils/supabase/client";

export async function getBookingsForRepairShop(
  shopID: number,
): Promise<BookingWithDetails[]> {
  const supabase = await createClient();
  const { data: bookings, error: bookingsError } = await supabase
    .from("Bookings")
    .select("*")
    .eq("shop_id", shopID);

  if (bookingsError || !bookings) {
    console.error("Error fetching bookings:", bookingsError);
    return [];
  }

  const enhancedBookings = await Promise.all(
    bookings.map(async (booking) => {
      // Fetch service name
      const { data: shopService, error: serviceError } = await supabase
        .from("Shop Services")
        .select("service_name")
        .eq("id", booking.shop_service_id)
        .single();

      if (serviceError) {
        console.error("Error fetching service details:", serviceError);
        return { ...booking, service_booked: "Unknown Service" };
      }

      // Fetch user profile
      const { data: userProfile, error: profileError } = await supabase
        .from("User Profiles")
        .select("first_name, surname")
        .eq("user_id", booking.user_id)
        .single();

      if (profileError) {
        console.error("Error fetching user profile:", profileError);
        return { ...booking, customer_name: "Unknown Customer" };
      }

      // Fetch repair shop details

      const { data: repairShop, error: shopError } = await supabase
        .from("Repair Shops")
        .select("name")
        .eq("id", shopID)
        .single();

      if (shopError) {
        console.error("Error fetching repair shop details:", shopError);
        return { ...booking, shop_name: "Unknown Shop" };
      }

      return {
        ...booking,
        shop_name: repairShop ? repairShop.name : "Shop details not found",
        service_booked: shopService
          ? shopService.service_name
          : "Service details not found",
        customer_name: userProfile
          ? `${userProfile.first_name} ${userProfile.surname}`
          : "Profile details not found",
      };
    }),
  );

  return enhancedBookings;
}

export async function calculateBookingRevenuesForPastYear(
  bookings: BookingWithDetails[],
) {
  const now = new Date();
  const currentMonthStart = startOfMonth(now);

  const bookingRevenue = Array(12).fill(0);

  bookings.forEach((booking) => {
    const bookingDate = parseISO(booking.booking_start_date);
    const bookingMonthStart = startOfMonth(bookingDate);

    const monthDiff = differenceInCalendarMonths(
      currentMonthStart,
      bookingMonthStart,
    );

    if (monthDiff >= 0 && monthDiff < 12) {
      bookingRevenue[11 - monthDiff] += booking.price;
    }
  });

  // the only reason for reversing the array is to display the months in the correct order
  return bookingRevenue.reverse();
}
