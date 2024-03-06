import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

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

  const { data: repairshop } = await supabase
    .from("Repair Shops")
    .select("*")
    .eq("associated_user", user.id)
    .single();

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
          <h1 className={"text-center text-2xl"}>
            {userProfile.first_name} {userProfile.surname}
          </h1>
          <p>{userProfile.phone_number}</p>
          <div>
            <h1>Here are your repairshops</h1>
            <div className={"mt-4 border-2 p-6"}>
              <p>{repairshop.name}</p>
              <p>{repairshop.address}</p>
              <p>{repairshop.status}</p>
            </div>
          </div>
          <div className={"w-full flex justify-center mb-8"}>
            <Link className={"border-2 p-4 bg-blue-800"} href="/browse">
              Browse repair shops
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
