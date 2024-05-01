import { getShopById } from "@/server/repair-shops/actions";
import { getUser } from "@/server/user-authentication/actions";

import {
  getShopServiceById,
  makeBooking,
} from "@/server/shop-services/actions";

import { SubmitButton } from "@/components/buttons/SubmitButton";
import PageLayout from "@/components/layouts/PageLayout";

export default async function BookingConfirmation({ searchParams }: any) {
  const shop = await getShopById(searchParams.shop);
  const user = await getUser();
  const service = await getShopServiceById(searchParams.service);

  const createNewBooking = async (formData: FormData) => {
    "use server";
    await makeBooking(formData);
  };

  return (
    <PageLayout>
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
              Service being booked: {service.service_name} for {service.price}{" "}
              euros
            </>
            *
            <form className={"flex flex-col border-2"}>
              <p>shop service id</p>
              <input
                title={""}
                type="text"
                name={"shop_service_id"}
                value={searchParams.service}
                readOnly={true}
              />
              <p>user id</p>
              <input
                title={""}
                type="text"
                name={"user_id"}
                value={user.user_id}
                readOnly={true}
              />
              <p>booking start</p>
              <input
                title={""}
                type="text"
                name={"booking_start"}
                value={searchParams.slot}
                readOnly={true}
              />
              <p>shop id</p>
              <input
                title={""}
                type="text"
                name={"shop_id"}
                value={searchParams.shop}
                readOnly={true}
              />
              <p>booking duration</p>
              <input
                title={""}
                type="text"
                name={"duration"}
                value={service.duration}
                readOnly={true}
              />
              <p>booking price</p>
              <input
                title={""}
                type="text"
                name={"price"}
                value={service.price}
                readOnly={true}
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
    </PageLayout>
  );
}
