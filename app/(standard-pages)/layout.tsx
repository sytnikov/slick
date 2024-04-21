import Footer from "@/components/navigation/Footer";
import Navigation from "@/components/navigation/Navigation";

import React from "react";

const standardPagesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Navigation />
      {children}
      <Footer />
    </main>
  );
};

export default standardPagesLayout;
