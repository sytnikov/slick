"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import { UserProfile } from "@/types";

const supabase = createClient();

// this function isn't used anywhere at the moment, but we can use it to get the user profile details later on
export async function getUserProfileDetail<T extends keyof UserProfile>(
  userProfile: UserProfile,
  detail: T,
): Promise<UserProfile[T]> {
  return userProfile[detail];
}

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
