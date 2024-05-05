"use server";

import { redirect } from "next/navigation";

import { BookingWithDetails } from "@/types";
import { startOfMonth, parseISO, differenceInCalendarMonths } from "date-fns";

import { createClient } from "@/utils/supabase/client";

export async function getBookingsForRepairShop(
  shopID: number,
): Promise<BookingWithDetails[]> {
  const supabase = await createClient();
  const { data: bookings, error: bookingsError } = await supabase
    .from("Bookings")
    .select(`*, shop_service_id(*), user_id(*)`)
    .eq("shop_id", shopID);

  if (bookingsError || !bookings) {
    console.error("Error fetching bookings:", bookingsError);
    return [];
  }

  return bookings;
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

export async function getUserBookingsWithDetails(
  userID: string | number,
): Promise<BookingWithDetails[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Bookings")
    .select(`*, shop_service_id("*"), shop_id("*")`)
    .eq("user_id", userID);

  if (error) {
    console.error("Error fetching user bookings:", error);
    return [];
  }

  return data;
}

export async function makeBooking(formData: FormData) {
  const shopServiceID = formData.get("shop_service_id");
  const userID = formData.get("user_id");
  const bookingStart = formData.get("booking_start") as string;
  const bookingEnd = formData.get("booking_end") as string;
  const price = formData.get("price");
  const shopID = formData.get("shop_id");
  const vehicleID = formData.get("vehicle_id");

  const supabase = await createClient();

  const { data, error } = await supabase.from("Bookings").insert([
    {
      shop_service_id: shopServiceID,
      user_id: userID,
      booking_start_date: bookingStart,
      booking_end_date: bookingEnd,
      shop_id: shopID,
      price: price,
      vehicle_id: vehicleID !== "" ? vehicleID : null,
    },
  ]);

  if (error) {
    console.error("Error creating booking:", error);
    throw new Error(error.message);
  }

  return redirect("/booking-complete");
}
