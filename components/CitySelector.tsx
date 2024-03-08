"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { FinnishTowns } from "@/utils/towns";

export default function CitySelector() {
  const [selectedCity, setSelectedCity] = useState("");

  const router = useRouter();

  const handleSelectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const city = event.target.value;
    setSelectedCity(city);

    if (city) {
      router.push(`/browse?city=${encodeURIComponent(city)}`, undefined);
    }
  };

  return (
    <select
      title="Select town"
      className="select select-bordered border-accent"
      value={selectedCity}
      onChange={handleSelectionChange}
    >
      <option value="" disabled>
        Filter by town
      </option>
      {FinnishTowns.map((town) => (
        <option key={town} value={town}>
          {town}
        </option>
      ))}
    </select>
  );
}
