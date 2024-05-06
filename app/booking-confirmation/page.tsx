import { redirect } from "next/navigation";

import { getShopById } from "@/server/repair-shops/actions";
import { getUser } from "@/server/user-authentication/actions";
import { getShopServiceById } from "@/server/shop-services/actions";
import { makeBooking } from "@/server/bookings/actions";
import {
  getCustomerVehicles,
  getCustomerVehicleById,
} from "@/server/customer-vehicles/actions";

import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layouts/PageLayout";
import SelectVehicle from "@/components/booking/SelectVehicle";
import calculateBookingEndDate from "@/utils/booking-system/date-utils";

export default async function BookingConfirmation({
  searchParams,
}: {
  searchParams: {
    service: string;
    slot: string;
    shop: number;
    vehicle: string;
  };
}) {
  const shop = await getShopById(searchParams.shop);
  const user = await getUser();
  const slot = searchParams.slot.slice(0, 23);
  const service = await getShopServiceById(searchParams.service);

  if (user == null) {
    return redirect("/login");
  }

  const userVehicles = await getCustomerVehicles(user.user_id);
  const selectedVehicleId = searchParams.vehicle;

  const selectedVehicleDetails =
    await getCustomerVehicleById(selectedVehicleId);

  const createNewBooking = async (formData: FormData) => {
    "use server";
    await makeBooking(formData);
  };

  return (
    <PageLayout>
      <main
        className={
          "screen flex h-screen w-full flex-col items-center justify-center gap-12"
        }
      >
        <h1 className={"text-3xl"}>Hey, you're almost there</h1>
        <form
          className={
            "mx-auto flex w-[50%] flex-col items-center justify-center rounded-xl bg-gray-100 p-12"
          }
        >
          <input
            type="text"
            title={""}
            name={"shop_id"}
            value={shop.id}
            hidden
          />
          <input
            type="text"
            title={""}
            name={"shop_service_id"}
            value={service.id}
            hidden
          />
          <input
            type="text"
            title={""}
            name={"user_id"}
            value={user.user_id}
            hidden
          />
          <input
            type="text"
            title={""}
            name={"booking_start"}
            value={slot}
            hidden
          />
          <input
            type="text"
            title={""}
            name={"booking_end"}
            value={calculateBookingEndDate(slot, service.duration)}
            hidden
          />
          <input
            type="text"
            title={""}
            name={"vehicle_id"}
            value={selectedVehicleId}
            hidden
          />
          <input
            type="text"
            title={""}
            name={"price"}
            value={service.price}
            hidden
          />
          <h1 className={"mb-4 text-2xl"}>You booking at {shop.name}</h1>
          <p>Booking time: {slot}</p>
          <p>Booking duration: {service.duration}</p>
          <p>Booking end: {calculateBookingEndDate(slot, service.duration)}</p>
          <p>Service being booked: {service.service_name}</p>
          <p>Service provider: {shop.name}</p>
          <p>
            Selected vehicle:
            {selectedVehicleId
              ? `${selectedVehicleDetails?.make} ${selectedVehicleDetails?.model}`
              : "No vehicle selected"}
          </p>
          <p className={"mt-4 opacity-50"}>
            Would you like to specifify which vehicle?
          </p>

          <SelectVehicle userVehicles={userVehicles} />
          <div
            className={"mt-8 flex w-full flex-row items-center justify-center"}
          >
            <Button formAction={createNewBooking}>Submit</Button>
          </div>
        </form>
      </main>
    </PageLayout>
  );
}
