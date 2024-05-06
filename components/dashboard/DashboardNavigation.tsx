import Link from "next/link";
import React from "react";

import { getUser } from "@/server/user-authentication/actions";

export default async function DashboardNavigation() {
  const user = await getUser();

  return (
    <>
      {user.shop_owner && (
        <div
        className={
          "sticky top-0 flex h-screen flex-col items-center bg-white p-12"
        }
      >
        <div
          className={"flex h-full w-full flex-col items-start justify-between "}
        >
          <div
            className={
              "flex w-full flex-col items-start justify-center gap-12 "
            }
          >
            <Link href={"/"} className={"text-xl font-bold"}>
              <h1>Slick</h1>
            </Link>
            <div
              className={
                "flex w-full flex-col items-start justify-center gap-8"
              }
            >
              <Link href={"/shop-dashboard"}>Dashboard</Link>
              <Link href={"/shop-bookings"}>Bookings</Link>
              <div>Inbox</div>
            </div>
          </div>
          <div
            className={"flex w-full flex-col items-start justify-center gap-4 "}
          >
            <Link className={"text-black"} href={"/shop-settings"}>
              Settings
            </Link>
            <Link className={"text-black"} href={"/"}>
              Home
            </Link>
          </div>
        </div>
      </div>
      )}
      {!user.shop_owner && (
        <div
        className={
          "sticky top-0 flex h-screen flex-col items-center bg-white p-12"
        }
      >
        <div
          className={"flex h-full w-full flex-col items-start justify-between "}
        >
          <div
            className={
              "flex w-full flex-col items-start justify-center gap-12 "
            }
          >
            <Link href={"/"} className={"text-xl font-bold"}>
              <h1>Slick</h1>
            </Link>
            <div
              className={
                "flex w-full flex-col items-start justify-center gap-8"
              }
            >
              <Link href={"/user-dashboard"}>Dashboard</Link>
              <Link href={"/user-bookings"}>Bookings</Link>
              <Link href={"/user-cars"}>Vehicles</Link>
              <div>Inbox</div>
            </div>
          </div>
          <div
            className={"flex w-full flex-col items-start justify-center gap-4 "}
          >
            <Link className={"text-black"} href={"/user-settings"}>
              Settings
            </Link>
            <Link className={"text-black"} href={"/"}>
              Home
            </Link>
          </div>
        </div>
      </div>
      )}
    </>
  );
}
