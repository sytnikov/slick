import { redirect } from "next/navigation";
import Link from "next/link";

import { createClient } from "@/utils/supabase/server";

import { RepairShop } from "@/types";

export default async function RepairShopDashboard() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  // check if the user is a shop owner, if not then redirect to user dashboard

  const { data: userProfile, error } = await supabase
    .from("User Profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (error) {
    console.error("Error fetching user profile:", error);
    return redirect("/login");
  }

  if (userProfile.shop_owner !== true) {
    return redirect("/user-dashboard"); // Redirect to user dashboard if not a shop owner
  }

  // get the repair shops that are owned by the user

  const { data: repairshops } = await supabase
    .from("Repair Shops")
    .select("*")
    .eq("associated_user", user.id);

  // get the bookings that the repair shop has

  const shopIds = repairshops?.map((shop: RepairShop) => shop.id);

  const { data: bookings } = await supabase
    .from("Bookings")
    .select("*")
    .in("shop_id", shopIds as number[]);

  return (
    <div className="flex w-full flex-1 flex-col items-center gap-20">
      <div className="w-full">
        <div className="bg-purple-950 text-white py-6 text-center font-bold">
          This is a protected page that you can only see as an authenticated
          user
        </div>
      </div>
      <div className="animate-in flex max-w-4xl flex-1 flex-col gap-20 px-3 opacity-0">
        <main className="flex flex-1 flex-col gap-6">
          <h1 className={"text-center text-2xl"}>
            {userProfile.first_name} {userProfile.surname}
          </h1>
          <p>{userProfile.phone_number}</p>
          <div>
            <h1>Here are your repairshops</h1>
            {repairshops?.map((shop: RepairShop) => (
              <div className={"mt-4 border-2 p-6"}>
                <div key={shop.id}>
                  <h1>{shop.name}</h1>
                  <p>{shop.description}</p>
                  <p>{shop.street_address}</p>
                </div>
              </div>
            ))}
          </div>
          <div>
            <h1>Here are you bookings</h1>
            {bookings?.map((booking) => (
              <div key={booking.id} className={"border-2 p-4"}>
                <h3>Booking at {booking.shop_id}</h3>
                <p>Booking date: {booking.booking_date}</p>
              </div>
            ))}
          </div>
          <div className={"mb-8 flex w-full justify-center"}>
            <Link className={"border-2 bg-blue-800 p-4"} href="/browse">
              Browse repair shops
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
