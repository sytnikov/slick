import Link from "next/link";
import { redirect } from "next/navigation";

import { RepairShop } from "@/types";
import { Button } from "@/components/ui/button";
import {
  getUser,
  getRepairShopsAssociatedWithUser,
  getBookingsForUsersShops,
} from "@/server/actions";

export default async function RepairShopDashboard() {
  const user = await getUser();

  const repairShops = await getRepairShopsAssociatedWithUser();

  const usersShopIds = repairShops.map((shop: RepairShop) => shop.id);
  const userRepairShopBookings = await getBookingsForUsersShops(usersShopIds);

  if (!user.shop_owner) {
    return redirect("/login");
  }

  return (
    <div className="flex w-full flex-1 flex-col items-center gap-20">
      <div className="w-full">
        <div className="bg-purple-950 py-6 text-center font-bold text-white">
          This is a protected page that you can only see as an authenticated
          user
        </div>
      </div>
      <div className="flex max-w-4xl flex-1 animate-fadeInUp flex-col gap-20 px-3 opacity-0">
        <main className="flex flex-1 flex-col gap-6">
          <h1 className={"text-center text-2xl"}>
            {user.first_name} {user.surname}
          </h1>
          <p>{user.phone_number}</p>
          <div>
            <h1>Here are your repairshops</h1>
            {repairShops.map((repairshop: RepairShop) => (
              <div className={"mt-4 border-2 p-6"} key={repairshop.id}>
                <div>
                  <h1>{repairshop.name}</h1>
                  <p>{repairshop.description}</p>
                  <p>{repairshop.street_address}</p>
                </div>
              </div>
            ))}
          </div>
          <div>
            <h1>Here are upcoming bookings for your shops: </h1>
            {userRepairShopBookings.map((booking) => (
              <div className={"border-2 p-4"} key={booking.id}>
                <h3>Booking at {booking.shop_name}</h3>
                <p>Service booked: {booking.service_booked}</p>
                <p>Booking date: {booking.booking_date}</p>
                <p>Customer: {booking.customer_name}</p>
              </div>
            ))}
          </div>
          <div className={"mb-8 flex w-full justify-center"}>
            <Button asChild variant="default" size="lg">
              <Link href="/browse">Browse Shops</Link>
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
