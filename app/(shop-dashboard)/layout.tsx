import DashboardNavigation from "@/components/dashboard/DashboardNavigation";
import Link from "next/link";

import React from "react";

const repairShopDashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <main className={"flex flex-row items-start justify-start"}>
      <DashboardNavigation />
      {children}
    </main>
  );
};

export default repairShopDashboardLayout;
