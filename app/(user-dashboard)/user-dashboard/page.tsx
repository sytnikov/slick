import Link from "next/link";
import { redirect } from "next/navigation";

import { BookingWithDetails } from "@/types";
import { Button } from "@/components/ui/button";
import {
  getUser,
  getUsersBookings,
} from "@/server/user-authentication/actions";

export default async function UserDashboard() {
  const user = await getUser();
  const userBookings = await getUsersBookings();

  if (!user) {
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
            Welcome user: {user.first_name} {user.surname}
          </h1>

          <h3>Here are your bookings: </h3>
          {userBookings.map((booking: BookingWithDetails) => (
            <div className={"border-2 p-4"} key={booking.id}>
              <h3>Booking at {booking.shop_name}</h3>
              <p>Booking date: {booking.booking_start_date}</p>
              <p>Service booking: {booking.service_booked}</p>
            </div>
          ))}
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
