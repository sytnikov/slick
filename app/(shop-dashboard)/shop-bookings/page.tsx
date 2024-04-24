import { redirect } from "next/navigation";

import { getBookingsForUserShop } from "@/server/bookings/actions";
import {
  getUser,
  getRepairShopAssociatedWithUser,
} from "@/server/user-authentication/actions";

import { LargeBookingTable } from "@/components/dashboard/LargeBookingTable";

export default async function Page() {
  const user = await getUser();

  const repairShop = await getRepairShopAssociatedWithUser();
  const bookings = await getBookingsForUserShop(repairShop.id);

  if (!user.shop_owner || !repairShop) {
    return redirect("/login");
  }

  console.log("bookings", bookings);

  return (
    <div
      className={"flex h-full w-full flex-col items-start justify-start p-12"}
    >
      <div className={"flex w-full flex-row justify-between"}>
        <p className={"mb-6 animate-fadeInUp text-3xl  font-bold"}>Bookings</p>
      </div>
      <div className={"h-full w-full animate-fadeInUp "}>
        <LargeBookingTable />
      </div>
    </div>
  );
}
