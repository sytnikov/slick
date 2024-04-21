import Link from "next/link";
import { redirect } from "next/navigation";

import { getBookingsForUsersShops } from "@/server/bookings/actions";
import {
  getUser,
  getRepairShopsAssociatedWithUser,
} from "@/server/user-authentication/actions";

import DashboardUserBar from "@/components/dashboard/DashboardUserBar";
import { Button } from "@/components/ui/button";

import { RepairShop } from "@/types";
import { BookingsTable } from "@/components/dashboard/BookingsTable";

export default async function RepairShopDashboard() {
  const user = await getUser();

  const repairShops = await getRepairShopsAssociatedWithUser();
  const usersShopIds = repairShops.map((shop: RepairShop) => shop.id);

  const bookings = await getBookingsForUsersShops(usersShopIds);

  if (!user.shop_owner) {
    return redirect("/login");
  }

  return (
    <main
      className={
        "flex h-screen w-screen flex-row items-center justify-start bg-gray-100"
      }
    >
      <div
        className={
          "flex h-full w-full flex-col items-center justify-start border-2 pb-12 pl-12 pr-12 pt-12"
        }
      >
        <div className={"fade-up mb-12 w-full animate-fadeInUp"}>
          <DashboardUserBar user={user} />
        </div>
        <div
          className={
            "flex w-full animate-fadeInUp flex-row items-start border-2"
          }
        >
          <BookingsTable />
        </div>
        <div
          className={"flex w-full flex-row items-start border-2 pb-12 pt-12"}
        >
          Content row
        </div>
        <div
          className={"flex w-full flex-row items-start border-2 pb-12 pt-12"}
        >
          Content row
        </div>
      </div>
    </main>
  );
}
