import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import { Button } from "../ui/button";
import { Avatar } from "./Avatar";

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

  return (
    <>
      {userProfile.shop_owner ? (
        <Link href={"/shop-dashboard"}>
          <Button variant={"secondary"} size={"sm"}>
            Shop Dashboard
          </Button>
        </Link>
      ) : (
        <>
          <Avatar user={userProfile} onLogOut={signOut} />
        </>
      )}
    </>
  );
}
