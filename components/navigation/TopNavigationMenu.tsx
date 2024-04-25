import Link from "next/link";

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

  return (
    <>
      {!userProfile ? (
        <Link href={"/login"}>
          <Button variant={"secondary"} size={"sm"}>
            Log In
          </Button>
        </Link>
      ) : userProfile.shop_owner ? (
        <Link href={"/shop-dashboard"}>
          <Button variant={"secondary"} size={"sm"}>
            Shop Dashboard
          </Button>
        </Link>
      ) : (
        <>
          <Avatar />
        </>
      )}
    </>
  );
}
