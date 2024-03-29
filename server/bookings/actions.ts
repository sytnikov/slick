"use server";

import { createClient } from "@/utils/supabase/server";

const supabase = createClient();

export async function getBookingsForUsersShops(shopIds: number[]) {
  const { data: bookings } = await supabase
    .from("Bookings")
    .select("*")
    .in("shop_id", shopIds);

  return bookings || [];
}
