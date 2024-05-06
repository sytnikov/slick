import { getBookingsForRepairShop } from "@/server/bookings/actions";
import ShopServiceCard from "../cards/ShopServiceCard";
import { RepairShop, ShopService } from "@/types";

interface RepairShopServicesProps {
  shopServices: ShopService[];
  repairShop: RepairShop;
}
export default async function RepairShopServices({
  shopServices,
  repairShop,
}: RepairShopServicesProps) {
  const bookings = await getBookingsForRepairShop(repairShop.id);

  return (
    <div className={"flex w-full flex-col items-start justify-start pb-8 pt-8"}>
      <h1 className={"text-3xl"}>What services do we offer</h1>
      {shopServices.length > 0 ? (
        <div className={"flex w-full flex-col gap-4"}>
          {shopServices.map((service) => (
            <ShopServiceCard
              key={service.id}
              service={service}
              repairShop={repairShop}
              bookings={bookings}
            />
          ))}
        </div>
      ) : (
        <p>No services available</p>
      )}
    </div>
  );
}
