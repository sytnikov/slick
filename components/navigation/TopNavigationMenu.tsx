import Link from "next/link";

import { createClient } from "@/utils/supabase/server";

import { Button } from "../ui/button";
import { Avatar } from "./Avatar";
import { redirect } from "next/navigation";

export default async function TopNavigationMenu() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: userProfile } = await supabase
    .from("User Profiles")
    .select("*")
    .eq("user_id", user?.id)
    .single();

  const signOut = async () => {
    "use server";

    const supabase = await createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  // TODO: it's a bit silly to have a seperate avatar component, combine these two into the same component?

  return (
    <>
      {!userProfile ? (
        <Link href={"/login"}>
          <Button variant={"secondary"} size={"sm"}>
            Log In
          </Button>
        </Link>
      ) : userProfile.shop_owner ? (
        <div className={"flex flex-row gap-4"}>
          <Link href={"/shop-dashboard"}>
            <Button size={"sm"}>Shop Dashboard</Button>
          </Link>
          <form action={signOut}>
            <Button variant={"secondary"} size={"sm"}>
              Log out
            </Button>
          </form>
        </div>
      ) : (
        <Avatar />
      )}
    </>
  );
}
