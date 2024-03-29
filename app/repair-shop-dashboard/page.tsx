import Link from "next/link";
import { redirect } from "next/navigation";

import { getUser } from "@/server/users/actions";
import {
  getRepairShopsAssociatedWithUser,
} from "@/server/repair-shops/actions";
import {getBookingsForUsersShops} from "@/server/bookings/actions";

import { RepairShop } from "@/types";

export default async function RepairShopDashboard() {
  const user = await getUser();

  const repairShops = await getRepairShopsAssociatedWithUser(user.user_id);

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
      <div className="animate-in flex max-w-4xl flex-1 flex-col gap-20 px-3 opacity-0">
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
            <h1>Here are you bookings</h1>
            {userRepairShopBookings.map((booking) => (
              <div className={"border-2 p-4"} key={booking.id}>
                <h3>Booking at {booking.shop_id}</h3>
                <p>Booking date: {booking.booking_date}</p>
              </div>
            ))}
          </div>
          <div className={"mb-8 flex w-full justify-center"}>
            <Link className={"border-2 bg-blue-800 p-4"} href="/browse">
              Browse repair shops
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
