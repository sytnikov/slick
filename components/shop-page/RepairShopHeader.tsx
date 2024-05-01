import React from "react";
import Image from "next/image";

import { getShopBannerImageUrl } from "@/server/repair-shops/actions";

import { HeartIcon } from "lucide-react";
import { Button } from "../ui/button";

interface RepairShopHeaderProps {
  id: number;
  shopName: string;
  shopCity: string;
  shopStreetAddress: string;
}
export default async function RepairShopHeader({
  id,
  shopName,
  shopCity,
  shopStreetAddress,
}: RepairShopHeaderProps) {
  const imageSource = await getShopBannerImageUrl(id);

  return (
    <>
      <div
        className={
          "relative mt-4 flex min-h-[50vh] w-full flex-col items-center justify-center overflow-hidden rounded-xl border-2"
        }
      >
        <Image
          src={imageSource}
          alt={shopName}
          width={800}
          height={400}
          className={"absolute left-0 top-0 h-full w-full object-cover"}
        />
        <div
          className={
            "absolute bottom-0 z-10 flex h-[20%] w-[95%] flex-row items-center justify-between"
          }
        >
          <div className={"flex flex-col gap-2"}>
            <p className={"text-white"}>
              {shopName} - {shopCity}
            </p>
            <h1 className={"text-5xl text-white"}>{shopName}</h1>
          </div>
          <Button variant={"secondary"}>
            <div className={"mr-2"}>
              <HeartIcon />
            </div>
            Save to favorites
          </Button>
        </div>

        <div
          className={"absolute bottom-0 z-0 h-full w-full p-4 text-white"}
          style={{
            background:
              "linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2))",
          }}
        />
      </div>
    </>
  );
}
