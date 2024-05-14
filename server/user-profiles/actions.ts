"use server";

import { Conversation } from "@/types";
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
    return "";
  }

  return `${process.env.NEXT_PUBLIC_SUPABASE_BUCKET_URL}/User%20Avatars/${encodeURIComponent(user.avatar_url)}`;
}

export async function getUserProfileByID(userID: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("User Profiles")
    .select("*")
    .eq("user_id", userID)
    .single();

  if (error || !data) {
    console.error("Error fetching user profile:", error);
    return null;
  }

  return data;
}
