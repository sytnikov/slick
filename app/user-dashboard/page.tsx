import Link from "next/link";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function UserDashboard() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data: bookings } = await supabase
    .from("Bookings")
    .select("*")
    .eq("user_id", user.id);

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full">
        <div className="py-6 font-bold bg-purple-950 text-center">
          This is a protected page that you can only see as an authenticated
          user
        </div>
      </div>
      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <main className="flex-1 flex flex-col gap-6">
          <h1 className={"text-center text-2xl"}>Welcome user: {user.email}</h1>

          <h3>Here are your bookings: </h3>
          {bookings?.map((booking: any) => (
            <div key={booking.id} className={"border-2 p-4"}>
              <h3>Booking at {booking.booking_date}</h3>
            </div>
          ))}
          <div className={"w-full flex justify-center mb-8"}>
            <Link href="/browse">
              <button className={"btn btn-primary text-white"}>
                Browse repair shops
              </button>
              z
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
