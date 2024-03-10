import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import { Booking, BookingWithShopDetails } from "@/types";

export default async function UserDashboard() {
  const supabase = createClient();

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

  const { data: shopServices } = await supabase
    .from("Shop Services")
    .select("*")
    .eq(
      "id",
      bookings?.map((booking: Booking) => booking.shop_service_id)
    );

  const { data: services } = await supabase
    .from("Services")
    .select("*")
    .eq(
      "id",
      shopServices?.map((shopService) => shopService.service_id)
    );

  const { data: repairShops } = await supabase
    .from("Repair Shops")
    .select("*")
    .eq(
      "id",
      bookings?.map((booking: Booking) => booking.shop_id)
    );

  const bookingWithRepairShopDetails = bookings?.map((booking: Booking) => {
    const shop = repairShops?.find(
      (repairShop) => repairShop.id === booking.shop_id
    );
    const shopService = shopServices?.find(
      (shopService) => shopService.id === booking.shop_service_id
    );
    const service = services?.find(
      (service) => service.id === shopService?.service_id
    );
    return {
      ...booking,
      shop: {
        ...shop,
        service: {
          ...service,
          ...shopService,
        },
      },
    };
  });

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full">
        <div className="py-6 font-bold bg-purple-950 text-center">
          This is a protected page that you can only see as an authenticated
          user
        </div>
      </div>
      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <main className="flex-1 flex flex-col gap-6">
          <h1 className={"text-center text-2xl"}>Welcome user: {user.email}</h1>

          <h3>Here are your bookings: </h3>
          {bookingWithRepairShopDetails?.map(
            (booking: BookingWithShopDetails) => (
              <div key={booking.id} className={"border-2 p-4"}>
                <h3>Booking at {booking.shop.name}</h3>
                <p>Service: {booking.shop.service.name}</p>
                <p>Time: {booking.booking_date}</p>
              </div>
            )
          )}
          <div className={"w-full flex justify-center mb-8"}>
            <Link href="/browse">
              <button className={"btn btn-primary text-white"}>
                Browse repair shops
              </button>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
