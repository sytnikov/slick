"use client";

import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";

export const uploadNewShopBanner = async (event: any, shopId: number) => {
  const supabase = createClient();
  const file = event.target.files[0];
  const bucket = "Shop Banners";

  const uniqueFileName = `${Date.now()}-${file.name}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(uniqueFileName, file);

  if (error) {
    console.log("Error uploading file: ", error.message);
    return;
  }

  const { data: updateData, error: updateError } = await supabase
    .from("Repair Shops")
    .update({ banner_img_url: data.path })
    .eq("id", shopId);

  if (updateError) {
    console.log("Error updating repair shop: ", updateError.message);
    return;
  }

  toast.success("Image uploaded and repair shop updated successfully!");
};

export const uploadNewUserAvatar = async (event: any, userId: number) => {
  const supabase = createClient();
  const file = event.target.files[0];
  const bucket = "User Avatars";

  const uniqueFileName = `${Date.now()}-${file.name}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(uniqueFileName, file);

  if (error) {
    console.log("Error uploading file: ", error.message);
    return;
  }

  const { data: updateData, error: updateError } = await supabase
    .from("User Profiles")
    .update({ avatar_url: data.path })
    .eq("id", userId);

  if (updateError) {
    console.log("Error updating user profile: ", updateError.message);
    return;
  }

  toast.success("Image uploaded and user profile updated successfully!");
};

export const deleteUserBannerImage = async (shopId: number) => {
  const supabase = createClient();
  const bucket = "Shop Banners";

  // Get the repair shop
  const { data: repairShop, error: getError } = await supabase
    .from("Repair Shops")
    .select("banner_img_url")
    .eq("id", shopId)
    .single();

  if (getError) {
    console.log("Error getting repair shop: ", getError.message);
    return;
  }

  const { data, error: deleteError } = await supabase.storage
    .from(bucket)
    .remove([repairShop.banner_img_url]);

  if (deleteError) {
    console.log("Error deleting file: ", deleteError.message);
    return;
  }

  // Update the repair shop
  const { data: updatedShop, error: updateError } = await supabase
    .from("Repair Shops")
    .update({ banner_img_url: null })
    .eq("id", shopId);

  if (updateError) {
    console.log("Error updating repair shop: ", updateError.message);
    return;
  }

  toast.success("Image deleted and repair shop updated successfully!");
};

// delete user avatar

export const deleteUserAvatar = async (userId: number) => {
  const supabase = createClient();
  const bucket = "User Avatars";

  // Get the user profile
  const { data: userProfile, error: getError } = await supabase
    .from("User Profiles")
    .select("avatar_url")
    .eq("id", userId)
    .single();

  if (getError) {
    console.log("Error getting user profile: ", getError.message);
    return;
  }

  const { data, error: deleteError } = await supabase.storage
    .from(bucket)
    .remove([userProfile.avatar_url]);

  if (deleteError) {
    console.log("Error deleting file: ", deleteError.message);
    return;
  }

  // Update the user profile
  const { data: updatedProfile, error: updateError } = await supabase
    .from("User Profiles")
    .update({ avatar_url: null })
    .eq("id", userId);

  if (updateError) {
    console.log("Error updating user profile: ", updateError.message);
    return;
  }

  toast.success("Image deleted and user profile updated successfully!");
};
