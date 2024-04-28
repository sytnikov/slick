"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface TownSelectorFilterProps {
  cities: string[];
}

export default function TownSelectorFilter({
  cities,
}: TownSelectorFilterProps) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = (city: string) => {
    const params = new URLSearchParams(searchParams);
    if (city) {
      params.set("city", city);
    } else {
      params.delete("city");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <select
      title="Select town"
      className="rounded-md border-2 p-2"
      value={new URLSearchParams(searchParams).get("city") || ""}
      onChange={(event) => handleSearch(event.target.value)}
    >
      <option value="" disabled>
        Filter by town
      </option>
      {cities.map((town) => (
        <option key={town} value={town}>
          {town}
        </option>
      ))}
    </select>
  );
}
