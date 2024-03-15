import { createClient } from "@/utils/supabase/server";

import BookServiceModal from "./MakeBookingModal";

interface SingleServiceCardProps {
  serviceID: number;
  name: string;
  duration: number;
  price: number;
  shopID: number;
  seats: number;
}

export default async function SingleServiceCard({
  serviceID,
  name,
  duration,
  price,
  shopID,
  seats,
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
    <div className={"flex flex-row p-4 mb-4 border-2 rounded-md"}>
      <div className={"flex flex-col gap-2"}>
        <h1>{name}</h1>
        <p>Duration: {duration} minutes</p>
        <p>Price: {price} €</p>
        <BookServiceModal
          id={serviceID}
          selectedService={name}
          shopID={shopID}
          openingTime={repairShop.opening_time}
          closingTime={repairShop.closing_time}
          // @ts-ignore
          bookings={bookings}
          seats={seats}
        />
      </div>
    </div>
  );
}
