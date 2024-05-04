import { getShopById } from "@/server/repair-shops/actions";
import { getUser } from "@/server/user-authentication/actions";
import { getShopServiceById } from "@/server/shop-services/actions";
import {
  getUserVehicles,
  getVehicleById,
} from "@/server/customer-vehicles/actions";

import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layouts/PageLayout";
import SelectVehicle from "@/components/booking/SelectVehicle";

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
  const slot = searchParams.slot;
  const service = await getShopServiceById(searchParams.service);
  const userVehicles = await getUserVehicles(user.user_id);
  const selectedVehicleId = searchParams.vehicle;

  const vehicleInformation = await getVehicleById(selectedVehicleId);

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
          <h1 className={"mb-4 text-2xl"}>You booking at {shop.name}</h1>
          <p>Booking time: {slot}</p>
          <p>Service being booked: {service.service_name}</p>
          <p>Service provider: {shop.name}</p>
          <p className={"mt-4 opacity-50"}>
            Would you like to specifify which vehicle?
          </p>
          {selectedVehicleId && (
            <p>
              Selected vehicle: {vehicleInformation?.make}{" "}
              {vehicleInformation?.model}
            </p>
          )}
          <SelectVehicle userVehicles={userVehicles} />
          <div
            className={"mt-8 flex w-full flex-row items-center justify-center"}
          >
            <Button>Submit</Button>
          </div>
        </form>
      </main>
    </PageLayout>
  );
}
