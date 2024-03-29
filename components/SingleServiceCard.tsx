import { createClient } from "@/utils/supabase/server";

import BookServiceModal from "./MakeBookingModal";

interface SingleServiceCardProps {
  serviceID: number;
  name: string;
  duration: number;
  price: number;
  shopID: number;
}

export default async function SingleServiceCard({
  serviceID,
  name,
  duration,
  price,
  shopID,
}: SingleServiceCardProps) {
  const supabase = createClient();

  const { data: repairShop } = await supabase
    .from("Repair Shops")
    .select("*")
    .eq("id", shopID)
    .single();

  const { data: bookings } = await supabase
    .from("Bookings")
    .select("*")
    .eq("shop_id", repairShop.id);

  return (
    <div className={"mb-4 flex flex-row rounded-md border-2 p-4"}>
      <div className={"flex flex-col gap-2"}>
        <h1>{name}</h1>
        <p>Duration: {duration} minutes</p>
        <p>Price: {price} €</p>
        <BookServiceModal
          id={serviceID}
          selectedService={name}
          selectedServiceID={serviceID}
          shopID={shopID}
          openingTime={repairShop.opening_time}
          closingTime={repairShop.closing_time}
          // @ts-ignore
          bookings={bookings}
        />
      </div>
    </div>
  );
}
