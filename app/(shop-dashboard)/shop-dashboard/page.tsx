import { redirect } from "next/navigation";

import { getBookingsForRepairShop } from "@/server/bookings/actions";
import { getRepairShopAssociatedWithUser } from "@/server/user-authentication/actions";
import { getUser } from "@/server/user-authentication/actions";

import DashboardUserBar from "@/components/dashboard/DashboardUserBar";
import IncomingBookings from "@/components/dashboard/BookingsTable";
import CurrentMonthEarnings from "@/components/dashboard/CurrentMonthEarnings";
import EarningsOverTimeChart from "@/components/dashboard/EarningsOverTimeChart";
import LatestReviews from "@/components/dashboard/LatestReviews";
import ShopPerformance from "@/components/dashboard/ShopPerformance";
import OpenSlots from "@/components/dashboard/OpenSlots";

export default async function RepairShopDashboard() {
  const user = await getUser();

  const repairShop = await getRepairShopAssociatedWithUser();
  const bookings = await getBookingsForRepairShop(repairShop.id);

  if (!user.shop_owner || !repairShop) {
    return redirect("/login");
  }

  return (
    <div
      className={
        "flex min-h-screen w-screen flex-col items-center bg-gray-100 p-4"
      }
    >
      <div className={"fade-up mb-4 w-full animate-fadeInUp"}>
        <DashboardUserBar user={user} />
      </div>
      <div
        className={
          "mb-4 flex w-full animate-fadeInUp flex-row justify-between gap-4"
        }
      >
        <CurrentMonthEarnings repairShopID={repairShop.id} />
        <IncomingBookings bookings={bookings} />
      </div>
      <div
        className={
          "mb-4 flex w-full animate-fadeInUp flex-row justify-between gap-4"
        }
      >
        <EarningsOverTimeChart bookings={bookings} />
        <LatestReviews shopID={repairShop.id} />
      </div>
      <div
        className={
          "flex w-full animate-fadeInUp flex-row justify-between gap-4"
        }
      >
        <ShopPerformance />
        <OpenSlots />
      </div>
    </div>
  );
}
