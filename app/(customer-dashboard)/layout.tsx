import React from "react";

import DashboardNavigation from "@/components/dashboard/DashboardNavigation";

const userDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className={"flex flex-row items-start justify-start"}>
      <DashboardNavigation />
      {children}
    </main>
  );
};

export default userDashboardLayout;
