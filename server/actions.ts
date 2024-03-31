"use server";

import { redirect } from "next/navigation";

import {
  BookingWithDetails,
  RepairShop,
  RepairShopBooking,
  ShopServiceWithDetails,
  UserProfile,
} from "@/types";

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

export async function getSpecificShopServices(
  shopId: number,
): Promise<ShopServiceWithDetails[]> {
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

export async function getServicesByIds(
  serviceIds: string[],
): Promise<ShopServiceWithDetails[]> {
  const { data: allServices } = await supabase
    .from("Services")
    .select("*")
    .in("id", serviceIds);

  return allServices || [];
}

export async function getShopById(shopId: number): Promise<RepairShop> {
  const { data: shop } = await supabase
    .from("Repair Shops")
    .select("*")
    .eq("id", shopId)
    .single();
  return shop;
}

export async function getAllRepairShops(): Promise<RepairShop[]> {
  const { data: repairShops } = await supabase.from("Repair Shops").select("*");
  console.log("getting all repair shops");
  return repairShops || [];
}

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
