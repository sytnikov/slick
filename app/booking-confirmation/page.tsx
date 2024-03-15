import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Button from "@/components/Button";
import calculateBookingEndDate from "@/utils/booking-system/booking-duration";

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
    .eq("shop_id", searchParams.shop);

  console.log("SHOP SERVICES", shopServices);

  async function newBooking() {
    "use server";
    const supabase = createClient();

    const shop_id = searchParams.shop;
    const shop_service_id = searchParams.service;
    const user_id = user?.id;
    const booking_start_date = searchParams.slot;
    const booking_end_date = endDate;
    const duration = bookingDuration;

    const { error } = await supabase.from("Bookings").insert([
      {
        shop_service_id,
        user_id,
        booking_start_date,
        shop_id,
      },
    ]);

    if (error) {
      return redirect("/booking-confirmation?message=Could not create booking");
    }

    return redirect("/user-dashboard");
  }

  // TODO: We now have the booking logic in place, now we need to calculate the end date and then post the booking to the database...
  // Get the service data from the Shop Services table...
  // booking-duration is returning a date that is two hours behind the booking start date...

  calculateBookingEndDate(new Date(searchParams.slot), 30);

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
