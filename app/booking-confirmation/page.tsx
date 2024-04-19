import { getShopById } from "@/server/repair-shops/actions";
import { getUser } from "@/server/user-authentication/actions";

import {
  getShopServiceById,
  createNewBooking,
} from "@/server/shop-services/actions";

export default async function BookingConfirmation({ searchParams }: any) {
  const shop = await getShopById(searchParams.shop);
  const user = await getUser();
  const service = await getShopServiceById(searchParams.service);

  const handleBookingConfirmation = async (formData: FormData) => {
    "use server";
    await createNewBooking(formData);
  };

  return (
    <main className={"flex-1"}>
      <div className={"flex h-screen items-center justify-center"}>
        <div className={"flex flex-col items-center"}>
          {/* <h1 className={"mb-4 text-2xl"}>
            Booking confirmation for {user.first_name}
          </h1>
          <p>Booking time: {searchParams.slot}</p>
          <p>Shop: {shop.name}</p>
          <p>
            Address: {shop.street_address}, {shop.city}, {shop.postal_code}
          </p>
          <>
            Service being booked: {service.name} for {service.price} euros
          </> */}
          <form
            action={handleBookingConfirmation}
            className={"flex flex-col border-2"}
          >
            <input
              type="text"
              title={"shop service"}
              value={searchParams.service}
            />
            <input type="text" title={"use id"} value={user.id} />
            <input
              type="text"
              title={"booking start"}
              value={"2024-04-05 14:00:00+00:00"}
            />
            <input type="text" title={"shop id"} value={searchParams.shop} />
            <input type="text" title={"duration"} value={service.duration} />
            <button type="submit" className={"bg-black p-2 text-white"}>
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
