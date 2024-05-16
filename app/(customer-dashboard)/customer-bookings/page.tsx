import { redirect } from "next/navigation";

import { getUser } from "@/server/user-authentication/actions";
import { getCustomerBookingsWithDetails } from "@/server/bookings/actions";

import { BookingWithDetails } from "@/types";

export default async function CustomerBookings() {
  const user = await getUser();

  if (user == null) {
    return redirect("/login");
  }

  const customerBookings = await getCustomerBookingsWithDetails(user.user_id);

  return (
    <>
      <div className={"flex w-full flex-row justify-between"}>
        <p className={"mb-6 animate-fadeInUp text-3xl font-bold"}>Bookings</p>
      </div>
      <div className={"h-full w-full animate-fadeInUp "}>
        {customerBookings.map((booking: BookingWithDetails) => (
          <div className={"mb-4 border-2 p-4"} key={booking.id}>
            <h3>Booking at {booking.shop_id.name}</h3>
            <p>Booking date: {booking.booking_start_date}</p>
            <p>Service booked: {booking.shop_service_id.service_name}</p>
          </div>
        ))}
      </div>
    </>
  );
}
