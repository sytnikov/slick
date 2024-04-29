"use client";

import { UploadIcon } from "lucide-react";

import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";

export default function UploadShopBanner({ shopId }: { shopId: number }) {
  const supabase = createClient();
  const uploadFile = async (event: any) => {
    const file = event.target.files[0];
    const bucket = "Shop Banners";

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(file.name, file);

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

  return (
    <div className="flex w-full items-center justify-center">
      <label className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div className="m-auto flex max-w-[95%] flex-col items-center justify-center pb-6 pt-5 text-center">
          <div className={"mb-4"}>
            <UploadIcon size={24} />
          </div>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG, JPG or GIF (MAX. 800x400px)
          </p>
        </div>
        <input type="file" className="hidden" onChange={uploadFile} />
      </label>
    </div>
  );
}
