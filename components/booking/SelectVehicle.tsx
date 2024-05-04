"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { CustomerVehicle } from "@/types";

interface SelectVehicleProps {
  userVehicles: CustomerVehicle[];
}
export default function SelectVehicle({ userVehicles }: SelectVehicleProps) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleVehicleSelection = (id: number) => {
    const params = new URLSearchParams(searchParams);
    if (id) {
      params.set("vehicle", id.toString());
    } else {
      params.delete("vehicle");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <select
      className={"rounded-md border-2 p-2"}
      title={"Select vehicle"}
      defaultValue={""}
      onChange={(event) => handleVehicleSelection(parseInt(event.target.value))}
    >
      <option value={""}>Select vehicle</option>
      {userVehicles.map((vehicle) => (
        <option key={vehicle.id} value={vehicle.id}>
          {vehicle.make} {vehicle.model} {vehicle.year_manufactured}
        </option>
      ))}
    </select>
  );
}
