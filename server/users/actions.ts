"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { UserProfile } from "@/types";

const supabase = createServerComponentClient({ cookies });

// this function isn't used anywhere at the moment, but we can use it to get the user profile details later on
export async function getUserProfileDetail<T extends keyof UserProfile>(
  userProfile: UserProfile,
  detail: T,
): Promise<UserProfile[T]> {
  return userProfile[detail];
}

/**
 * We are now getting a warning for Using supabase.auth.getSession() is potentially insecure...
 * It seems that the createServerComponentClient is doing something internally, but we should investigate this further eventually...
 */

export async function getUser(): Promise<UserProfile> {
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

  return userProfile;
}
