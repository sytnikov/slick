import Link from "next/link";
import { redirect } from "next/navigation";

import { getBookingsForUsersShops } from "@/server/bookings/actions";
import {
  getUser,
  getRepairShopsAssociatedWithUser,
} from "@/server/user-authentication/actions";

import { Button } from "@/components/ui/button";

import { RepairShop } from "@/types";
import DashboardUserBar from "@/components/DashboardUserBar";

export default async function RepairShopDashboard() {
  const user = await getUser();

  const repairShops = await getRepairShopsAssociatedWithUser();

  const usersShopIds = repairShops.map((shop: RepairShop) => shop.id);
  const userRepairShopBookings = await getBookingsForUsersShops(usersShopIds);

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
          "flex h-full w-full flex-col items-center justify-start border-2  pb-12 pl-12 pr-12 pt-12"
        }
      >
        <div className={"mb-12 w-full"}>
          <DashboardUserBar user={user} />
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
        <div
          className={"flex w-full flex-row items-start border-2 pb-12 pt-12"}
        >
          Content row
        </div>
      </div>
    </main>
  );
}
