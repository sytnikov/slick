import Link from "next/link";

import { getShopById } from "@/server/actions";
import { getSpecificShopServices } from "@/server/actions";
import { Button } from "@/components/ui/button";

export default async function RepairShopPage({
  params,
}: {
  params: { id: number };
}) {
  const shop = await getShopById(params.id);
  const services = await getSpecificShopServices(shop.id);

  return (
    <main className="flex w-full flex-1 flex-col items-center gap-20">
      <div className="flex max-w-4xl flex-1 animate-fadeInUp flex-col gap-20 px-3 opacity-0">
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
                    <Button asChild variant="default" size="default">
                      <Link
                        href={`/repair-shops/${shop.id}/book/${service.id}`}
                      >
                        Book
                      </Link>
                    </Button>
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
