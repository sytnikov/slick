import Link from "next/link";
import { redirect } from "next/navigation";

import { getCustomerBookingsWithDetails } from "@/server/bookings/actions";
import { getUserProfileAvatar } from "@/server/user-profiles/actions";
import { getUser } from "@/server/user-authentication/actions";

import UploadUserAvatar from "@/components/dashboard/UploadUserAvatar";

import { BookingWithDetails } from "@/types";

export default async function UserDashboard() {
  const user = await getUser();

  if (user == null) {
    return redirect("/login");
  }

  const uploadedImage = await getUserProfileAvatar(user.id);
  const customerBookings = await getCustomerBookingsWithDetails(user.user_id);

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex w-full flex-1 flex-col items-center gap-20">
      <div className="w-full">
        <div className="bg-green-950 py-6 text-center font-bold text-white">
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
          {customerBookings.map((booking: BookingWithDetails) => (
            <div className={"border-2 p-4"} key={booking.id}>
              <h3>Booking at {booking.shop_id.name}</h3>
              <p>Booking date: {booking.booking_start_date}</p>
              <p>Service booking: {booking.shop_service_id.service_name}</p>
            </div>
          ))}
          <div className={"flex flex-row gap-8"}>
            <Link href="/browse">
              <div>Browse Shops</div>
            </Link>
            <Link href="/">
              <div>Home</div>
            </Link>
          </div>
          <UploadUserAvatar userId={user.id} uploadedImage={uploadedImage} />
        </main>
      </div>
    </div>
  );
}
