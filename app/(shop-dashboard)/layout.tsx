import Link from "next/link";

import React from "react";

const repairShopDashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <main
      className={
        "flex h-screen w-screen flex-row items-center justify-start bg-gray-100"
      }
    >
      <div className={"flex h-full flex-col items-center bg-white p-12"}>
        <div
          className={"flex h-full w-full flex-col items-start justify-between"}
        >
          <div
            className={"flex w-full flex-col items-start justify-center gap-12"}
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
            className={"flex w-full flex-col items-start justify-center gap-4"}
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
      {children}
    </main>
  );
};

export default repairShopDashboardLayout;
