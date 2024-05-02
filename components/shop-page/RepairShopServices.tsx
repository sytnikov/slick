import { getBookingsForRepairShop } from "@/server/bookings/actions";
import SelectTimeModal from "@/components/booking/SelectTimeModal";
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
            <div
              className={
                "flex w-full flex-row items-center justify-between rounded-md border-b-2 border-gray-200 bg-white pb-4 pt-4"
              }
              key={service.id}
            >
              <div className={"flex flex-col"}>
                <h3 className={"text-xl"}>{service.service_name}</h3>
                <div
                  className={"flex flex-row items-start justify-start gap-2 "}
                >
                  <p>Price: </p>
                  <p>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "EUR",
                    }).format(service.price)}
                  </p>
                </div>
              </div>

              <SelectTimeModal
                shop={repairShop}
                service={service}
                bookings={bookings}
              />
            </div>
          ))}
        </div>
      ) : (
        <p>No services available</p>
      )}
    </div>
  );
}
