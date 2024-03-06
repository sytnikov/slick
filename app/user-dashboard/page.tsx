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
