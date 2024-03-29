import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

import Button from "@/components/Button";

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

  const { data: shopServices } = await supabase
    .from("Shop Services")
    .select("*")
    // get services that match the service_id AND the shop_id, fix this query
    .eq("service_id", searchParams.service)
    .eq("shop_id", searchParams.shop)
    .single();

  console.log("SHOP SERVICEL ", shopServices);

  console.log("Booking data: ", {
    shop_id: shop.id,
    shop_servivce_id: searchParams.service,
    user_id: userProfile.id,
    booking_start_date: searchParams.slot,
    duration: 80,
    booking_end_date: 60,
  });

  async function newBooking() {
    "use server";

    return redirect("/user-dashboard");
  }

  return (
    <main className={"flex-1"}>
      <div className={"flex h-screen items-center justify-center"}>
        <div className={"flex flex-col items-center"}>
          <h1 className={"mb-4 text-2xl"}>
            Booking confirmation for {searchParams.name}
          </h1>
          <p>Booking time: {searchParams.slot}</p>
          <p>Shop: {shop.name}</p>
          <p>
            Address: {shop.street_address}, {shop.city}, {shop.postal_code}
          </p>
          <div className={"mt-2 border-2 p-6"}>
            <h1>Your details</h1>
            <p>{userProfile.first_name}</p>
            <p>{userProfile.surname}</p>
          </div>
          <div className={"mt-4"}>
            <form action={newBooking}>
              <Button
                text={"Confirm booking"}
                submittingText={"Making your booking..."}
                style={"primary"}
                type={"submit"}
              />
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
