import { getShopServices } from "@/server/shop-services/actions";

interface CardServiceListProps {
  shopID: number;
}

/**
 * In this component we want to get the services of a shop by its ID.
 * Then display the first 4 services in a list, after that display count of the remaining services.
 * ie. "Screen Repair, Battery Replacement, Water Damage, Charging Port, and 3 more services"
 */

export default async function CardServiceList({
  shopID,
}: CardServiceListProps) {
  const services = await getShopServices(shopID);
  return (
    <>
      {services.length === 0 ? (
        <p className={"text-sm opacity-50"}>No services available</p>
      ) : null}
      <div className={"flex flex-row flex-wrap gap-1"}>
        {services.slice(0, 4).map((service, index) => (
          <div
            key={index}
            className={
              "inline-block rounded-md border-2 border-gray-100 pl-2 pr-2"
            }
          >
            <p>{service.service_name}</p>
          </div>
        ))}
        {services.length > 4 ? (
          <span>and {services.length - 4} more services</span>
        ) : null}
      </div>
    </>
  );
}
