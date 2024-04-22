import { redirect } from "next/navigation";

import { getBookingsForUsersShops } from "@/server/bookings/actions";
import {
  getUser,
  getRepairShopsAssociatedWithUser,
} from "@/server/user-authentication/actions";

import DashboardUserBar from "@/components/dashboard/DashboardUserBar";
import BookingsTable from "@/components/dashboard/BookingsTable";

import { RepairShop } from "@/types";
import CurrentMonthEarnings from "@/components/dashboard/CurrentMonthEarnings";
import EarningsOverTimeChart from "@/components/dashboard/EarningsOverTimeChart";
import LatestReviews from "@/components/dashboard/LatestReviews";

export default async function RepairShopDashboard() {
  const user = await getUser();

  const repairShops = await getRepairShopsAssociatedWithUser();
  const usersShopIds = repairShops.map((shop: RepairShop) => shop.id);

  const bookings = await getBookingsForUsersShops(usersShopIds);

  if (!user.shop_owner) {
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
        <CurrentMonthEarnings />
        <BookingsTable bookings={bookings} />
      </div>
      <div
        className={
          "flex w-full animate-fadeInUp flex-row items-start justify-between gap-8"
        }
      >
        <EarningsOverTimeChart />
        <LatestReviews />
      </div>
    </div>
  );
}
