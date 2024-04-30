"use server";

import { createClient } from "@/utils/supabase/client";

export async function saveChangesMadeToUserProfile(
  formData: FormData,
  userID: number,
) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("User Profiles")
    .update({
      first_name: formData.get("first_name"),
      surname: formData.get("surname"),
      phone_number: formData.get("phone_number"),
    })
    .eq("id", userID);

  if (error) {
    console.error("Error updating user profile:", error);
    return false;
  }

  return data;
}

export async function getUserProfileAvatar(userID: number): Promise<string> {
  const supabase = createClient();
  const { data: user, error } = await supabase
    .from("User Profiles")
    .select("avatar_url")
    .eq("id", userID)
    .single();

  if (error || !user || !user.avatar_url) {
    console.error(
      "Failed to fetch shop or shop does not have a banner image.",
      error,
    );
    return "";
  }

  return `${process.env.NEXT_PUBLIC_SUPABASE_BUCKET_URL}/User%20Avatars/${encodeURIComponent(user.avatar_url)}`;
}
