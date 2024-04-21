import React from "react";

const userDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen flex-col items-center">{children}</main>
  );
};

export default userDashboardLayout;
