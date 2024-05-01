import { PropsWithChildren } from "react";

import Navigation from "../navigation/Navigation";
import Footer from "../navigation/Footer";

type PageLayoutProps = PropsWithChildren;

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <>
      <Navigation />
      <div className="flex min-h-screen flex-col items-center">{children}</div>
      <Footer />
    </>
  );
}
