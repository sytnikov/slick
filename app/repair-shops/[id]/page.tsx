import Link from "next/link";

import { getShopById } from "@/server/repair-shops/actions";
import { getSpecificShopServices } from "@/server/shop-services/actions";

export default async function RepairShopPage({
  params,
}: {
  params: { id: number };
}) {
  const shop = await getShopById(params.id);
  const services = await getSpecificShopServices(shop.id);

  return (
    <main className="flex w-full flex-1 flex-col items-center gap-20">
      <div className="animate-in flex max-w-4xl flex-1 flex-col gap-20 px-3 opacity-0">
        <main className="flex flex-1 flex-col justify-center">
          <h2>Welcome to {shop.name}</h2>
          <p>{shop.description}</p>
          <div>
            <h3>Services: </h3>
            <ul>
              {services.map((service) => (
                <li key={service.id}>
                  <div className={"mb-3 border-2 p-4"}>
                    <h4>{service.name}</h4>
                    <p>Duration: {service.duration} minutes</p>
                    <p>Price: {service.price} EUR</p>
                    <Link
                      href={`/repair-shops/${params.id}/services/${service.id}`}
                      className={"btn btn-primary mt-4 w-full text-white"}
                    >
                      Select time
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </main>
  );
}
