"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { Switch } from "../ui/switch";

export default function ShopOwnerToggle() {
  const [checked, setChecked] = useState(false);

  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const shopOwner = searchParams.get("shop_owner");
    setChecked(shopOwner === "true");
  }, [searchParams]);

  const handleToggle = (shopOwner: boolean) => {
    const params = new URLSearchParams(searchParams);
    params.set("shop_owner", shopOwner.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={"flex w-full flex-col items-start justify-center gap-2"}>
      <label className="text-sm text-gray-600">Are you a shop owner?</label>
      <Switch
        checked={checked}
        onCheckedChange={() => {
          const newChecked = !checked;
          setChecked(newChecked);
          handleToggle(newChecked);
        }}
      />
    </div>
  );
}
