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

export const deleteUserBannerImage = async (
  uploadedImage: string,
  shopId: number,
) => {
  const supabase = createClient();
  const bucket = "Shop Banners";

  // TODO: The file isn't being removed from the storage bucket, could be a naming thing

  const { data, error } = await supabase.storage
    .from(bucket)
    .remove([uploadedImage]);

  if (error) {
    console.log("Error deleting file: ", error.message);
    return;
  }

  const { data: updateData, error: updateError } = await supabase
    .from("Repair Shops")
    .update({ banner_img_url: null })
    .eq("id", shopId);

  if (updateError) {
    console.log("Error updating repair shop: ", updateError.message);
    return;
  }

  toast.success("Image deleted and repair shop updated successfully!");
};
