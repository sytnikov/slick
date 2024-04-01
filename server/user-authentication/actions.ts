"use server";

import { redirect } from "next/navigation";

import { BookingWithDetails, UserProfile } from "@/types";

import { createClient } from "@/utils/supabase/server";

const supabase = createClient();

export async function getUser(): Promise<UserProfile> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/login");
  }
  const { data: userProfile } = await supabase
    .from("User Profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  return userProfile;
}

export async function getRepairShopsAssociatedWithUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/login");
  }
  const { data: repairShops } = await supabase
    .from("Repair Shops")
    .select("*")
    .eq("associated_user", user.id);

  return repairShops || [];
}

// this is ugly, but we'll get back to this later...

export async function getUsersBookings(): Promise<BookingWithDetails[]> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/login");
  }
  const { data: bookings } = await supabase
    .from("Bookings")
    .select("*")
    .eq("user_id", user.id);

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
