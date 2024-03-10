import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function BookingConfirmation({ searchParams }: any) {
  const supabase = createClient();

  const { data: shop } = await supabase
    .from("Repair Shops")
    .select("*")
    .eq("id", searchParams.shop)
    .single();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data: userProfile } = await supabase
    .from("User Profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  const createBooking = async () => {
    "use server";
    const supabase = createClient();
    const shop_service_id = searchParams.service;
    const user_id = user.id;
    const booking_date = searchParams.slot;

    const { data, error } = await supabase.from("Bookings").insert({
      shop_service_id,
      user_id,
      booking_date,
    });

    return { data, error };
  };

  return (
    <main className={"flex-1"}>
      <div className={"flex items-center justify-center h-screen"}>
        <div className={"flex flex-col items-center"}>
          <h1 className={"text-2xl mb-4"}>
            Booking confirmation for {searchParams.name}
          </h1>
          <p>Booking time: {searchParams.slot}</p>
          <p>Shop: {shop.name}</p>
          <p>
            Address: {shop.street_address}, {shop.city}, {shop.postal_code}
          </p>
          <div className={"border-2 mt-2 p-6"}>
            <h1>Your details</h1>
            <p>{userProfile.first_name}</p>
            <p>{userProfile.surname}</p>
          </div>
          <div className={"mt-4"}>
            <form action={createBooking}>
              <button className={"btn btn-primary text-white"} type={"submit"}>
                Confirm booking
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
