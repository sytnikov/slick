import { redirect } from "next/navigation";

import { getBookingsForUserShop } from "@/server/bookings/actions";
import { getRepairShopAssociatedWithUser } from "@/server/user-authentication/actions";
import { getUser } from "@/server/user-authentication/actions";

import DashboardUserBar from "@/components/dashboard/DashboardUserBar";
import IncomingBookings from "@/components/dashboard/BookingsTable";
import CurrentMonthEarnings from "@/components/dashboard/CurrentMonthEarnings";
import EarningsOverTimeChart from "@/components/dashboard/EarningsOverTimeChart";
import LatestReviews from "@/components/dashboard/LatestReviews";
import ShopPerformance from "@/components/dashboard/ShopPerformance";

export default async function RepairShopDashboard() {
  const user = await getUser();

  const repairShop = await getRepairShopAssociatedWithUser();
  const bookings = await getBookingsForUserShop(repairShop.id);

  if (!user.shop_owner || !repairShop) {
    return redirect("/login");
  }

  return (
    <div className={"flex h-screen w-screen flex-col items-center p-10"}>
      <div className={"fade-up mb-12 w-full animate-fadeInUp"}>
        <DashboardUserBar user={user} />
      </div>
      <div
        className={
          "mb-8 flex w-full animate-fadeInUp flex-row items-start justify-between gap-8"
        }
      >
        <CurrentMonthEarnings shopID={repairShop.id} />
        <IncomingBookings bookings={bookings} />
      </div>
      <div
        className={
          "mb-8 flex w-full animate-fadeInUp flex-row items-start justify-between gap-8"
        }
      >
        <EarningsOverTimeChart />
        <LatestReviews />
      </div>
      <div
        className={
          "flex w-full animate-fadeInUp flex-row items-start justify-between gap-8"
        }
      >
        <ShopPerformance />
      </div>
    </div>
  );
}
