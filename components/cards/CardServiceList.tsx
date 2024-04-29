import { ShopService } from "@/types";

interface CardServiceListProps {
  services: ShopService[];
}

export default async function CardServiceList({
  services,
}: CardServiceListProps) {
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
