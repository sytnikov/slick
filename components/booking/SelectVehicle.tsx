"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { TrashIcon } from "lucide-react";
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

  const selectedVehicleId = parseInt(searchParams.get("vehicle") || "");

  const handleDeleteVehicle = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("vehicle");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <select
        className={"rounded-md border-2 p-2"}
        title={"Select vehicle"}
        value={selectedVehicleId || ""}
        onChange={(event) =>
          handleVehicleSelection(parseInt(event.target.value))
        }
      >
        <option value={""}>Select vehicle</option>
        {userVehicles.map((vehicle) => (
          <option key={vehicle.id} value={vehicle.id}>
            {vehicle.make} {vehicle.model} {vehicle.year_manufactured}
          </option>
        ))}
      </select>
      {selectedVehicleId && (
        <div onClick={handleDeleteVehicle}>
          <TrashIcon />
        </div>
      )}
    </>
  );
}
