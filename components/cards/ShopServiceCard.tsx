import { getUser } from "@/server/user-authentication/actions";
import SelectTimeModal from "../booking/SelectTimeModal";

import { BookingWithDetails, RepairShop, ShopService } from "@/types";
import PopUpDrawer from "../sign-in/PopUpDrawer";
import SmallLoginForm from "../sign-in/SmallLoginForm";

interface ShopServiceCardProps {
  service: ShopService;
  repairShop: RepairShop;
  bookings: BookingWithDetails[];
}

export default async function ShopServiceCard({
  service,
  repairShop,
  bookings,
}: ShopServiceCardProps) {
  const user = await getUser();

  const shopOwner = user?.shop_owner;

  return (
    <div
      className={
        "flex w-full flex-row items-center justify-between rounded-md border-b-2 border-gray-200 bg-white pb-4 pt-4"
      }
      key={service.id}
    >
      <div className={"flex flex-col"}>
        <h3 className={"text-xl"}>{service.service_name}</h3>
        <div className={"flex flex-row items-start justify-start gap-2 "}>
          <p>Price: </p>
          <p>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "EUR",
            }).format(service.price)}
          </p>
        </div>
      </div>
      {user ? (
        shopOwner ? (
          <PopUpDrawer
            drawerHeader={
              "Hmm, it seems like you're not allowed to make bookings!"
            }
            drawerDescription={"Shop owners can't make bookings."}
          />
        ) : (
          <SelectTimeModal
            shop={repairShop}
            service={service}
            bookings={bookings}
          />
        )
      ) : (
        <PopUpDrawer
          drawerHeader={"Hey, you need to log in first!"}
          drawerDescription={"Log in to book a service."}
          children={<SmallLoginForm />}
        />
      )}
    </div>
  );
}
