import { ShopService } from "@/types";

interface RepairShopServicesProps {
  shopServices: ShopService[];
}
export default function RepairShopServices({
  shopServices,
}: RepairShopServicesProps) {
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
                  <p>Duration: </p>
                  <p>{service.duration} </p>
                  <p>(min)</p>
                </div>
              </div>
              <div
                className={"flex w-[10%] flex-col items-start justify-center"}
              >
                <p className={"text-xs opacity-50"}>price</p>
                <p className={"text-xl"}>{service.price}€</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No services available</p>
      )}
    </div>
  );
}
