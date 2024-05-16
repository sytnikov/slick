import React from "react";

import DashboardNavigation from "@/components/dashboard/DashboardNavigation";

const userDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className={"flex flex-row items-start justify-start"}>
      <DashboardNavigation />
      <div
        className={
          "flex h-full min-h-screen w-full flex-col items-start justify-start bg-slate-100 p-12"
        }
      >
        {children}
      </div>
    </main>
  );
};

export default userDashboardLayout;
