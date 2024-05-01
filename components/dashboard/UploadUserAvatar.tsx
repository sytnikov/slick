"use client";

import Image from "next/image";

import {
  deleteUserAvatar,
  uploadNewUserAvatar,
} from "@/server/storage/actions";

import { TrashIcon, UploadIcon } from "lucide-react";

import { Button } from "../ui/button";

interface UploadUserAvatarProps {
  userId: number;
  uploadedImage: string;
}

export default function UploadUserAvatar({
  userId,
  uploadedImage,
}: UploadUserAvatarProps) {
  const handleUserDeleteBannerImage = async () => {
    deleteUserAvatar(userId);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {uploadedImage === "" && (
        <label className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          <div className="m-auto flex max-w-[95%] flex-col items-center justify-center pb-6 pt-5 text-center">
            <UploadIcon size={24} className="mb-4" />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            type="file"
            className="hidden"
            onChange={(event) => uploadNewUserAvatar(event, userId)}
          />
        </label>
      )}
      {uploadedImage && (
        <div className={"flex flex-col gap-4"}>
          <Image
            className={"max-height-[200px] rounded-lg"}
            src={uploadedImage}
            width={300}
            height={200}
            alt={uploadedImage}
          />
          <div className="flex flex-row gap-4">
            <Button variant="destructive" onClick={handleUserDeleteBannerImage}>
              Delete
              <div className={"ml-2"}>
                <TrashIcon />
              </div>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
