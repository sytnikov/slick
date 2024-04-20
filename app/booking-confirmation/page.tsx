import { redirect } from "next/navigation";
import { formatDateTime } from "@/utils/booking-system/date-utils";

import { createClient } from "@/utils/supabase/server";

import { getShopById } from "@/server/repair-shops/actions";
import { getUser } from "@/server/user-authentication/actions";

import {
  getShopServiceById,
  getSingleShopServicTitle,
} from "@/server/shop-services/actions";

import { SubmitButton } from "@/components/SubmitButton";

export default async function BookingConfirmation({ searchParams }: any) {
  const shop = await getShopById(searchParams.shop);
  const user = await getUser();
  const service = await getShopServiceById(searchParams.service);

  const shopServiceTitle = getSingleShopServicTitle(searchParams.service);

  const createNewBooking = async (formData: FormData) => {
    "use server";

    const supabase = await createClient();

    const shopServiceID = formData.get("shop_service_id") as string;
    const userID = formData.get("user_id") as string;
    const bookingStart = formatDateTime(
      formData.get("booking_start") as string,
    );
    const shopID = formData.get("shop_id") as string;
    const duration = formData.get("duration") as string;

    await supabase.from("Bookings").insert({
      shop_service_id: shopServiceID,
      user_id: userID,
      booking_start_date: bookingStart,
      shop_id: shopID,
      duration: duration,
    });

    return redirect("/user-dashboard");
  };

  return (
    <main className={"flex-1"}>
      <div className={"flex h-screen items-center justify-center"}>
        <div className={"flex flex-col items-center"}>
          <h1 className={"mb-4 text-2xl"}>
            Booking confirmation for {user.first_name}
          </h1>
          <p>Booking time: {searchParams.slot}</p>
          <p>Shop: {shop.name}</p>
          <p>
            Address: {shop.street_address}, {shop.city}, {shop.postal_code}
          </p>
          <>
            Service being booked: {shopServiceTitle} for {service.price} euros
          </>
          *
          <form className={"flex flex-col border-2"}>
            <p>shop service id</p>
            <input
              title={""}
              type="text"
              name={"shop_service_id"}
              value={searchParams.service}
            />
            <p>user id</p>
            <input
              title={""}
              type="text"
              name={"user_id"}
              value={user.user_id}
            />
            <p>booking start</p>
            <input
              title={""}
              type="text"
              name={"booking_start"}
              value={searchParams.slot}
            />
            <p>shop id</p>
            <input
              title={""}
              type="text"
              name={"shop_id"}
              value={searchParams.shop}
            />
            <p>booking duration</p>
            <input
              title={""}
              type="text"
              name={"duration"}
              value={service.duration}
            />
            <SubmitButton
              formAction={createNewBooking}
              className="mb-2 h-10 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
              pendingText="Signing up..."
            >
              Make booking
            </SubmitButton>
          </form>
        </div>
      </div>
    </main>
  );
}
