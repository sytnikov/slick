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
