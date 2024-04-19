import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "./ui/button";

export default async function AuthButton() {
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

  return user ? (
    <div className="flex items-center gap-4">
      <Link
        href={
          userProfile?.shop_owner ? "/repair-shop-dashboard" : "/user-dashboard"
        }
      >
        Hey, {user.email}!
      </Link>
      <form action={signOut}>
        <Button variant={"secondary"} size={"sm"}>Log out</Button>
      </form>
    </div>
  ) : (
    <Button size={"sm"}>
      <Link href="/login">Log in</Link>
    </Button>
  );
}
