import Link from "next/link";
import { redirect } from "next/navigation";

import { getUser } from "@/server/user-authentication/actions";

export default async function DashboardNavigation() {
  const user = await getUser();

  if (user == null) {
    return redirect("/login");
  }

  const commonNavigationLinks = [
    {
      title: "Dashboard",
      href: user.shop_owner ? "/shop-dashboard" : "/customer-dashboard",
    },
    {
      title: "Bookings",
      href: user.shop_owner ? "/shop-bookings" : "/customer-bookings",
    },
    {
      title: "Inbox",
      href: user.shop_owner ? "/shop-inbox" : "/customer-inbox",
    },
  ];

  const customerNavigationLinks = [
    ...commonNavigationLinks,
    {
      title: "Vehicles",
      href: "/customer-vehicles",
    },
  ];

  const navigationLinks = user.shop_owner
    ? commonNavigationLinks
    : customerNavigationLinks;

  return (
    <div className="sticky top-0 flex h-screen flex-col items-center bg-white p-12">
      <div className="flex h-full w-full flex-col items-start justify-between">
        <div className="flex w-full flex-col items-start justify-center gap-12">
          <Link href="/" className={"text-2xl font-bold"}>
            Slick
          </Link>
          <div className="flex w-full flex-col items-start justify-center gap-8">
            {navigationLinks.map((link) => (
              <Link href={link.href} key={link.title}>
                {link.title}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex w-full flex-col items-start justify-center gap-4">
          <Link
            href={user.shop_owner ? "/shop-settings" : "/customer-settings"}
          >
            Settings
          </Link>
          <Link href="/">Home</Link>
        </div>
      </div>
    </div>
  );
}
