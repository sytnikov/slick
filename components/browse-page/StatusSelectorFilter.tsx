"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface StatusSelectorFilterProps {
  statusOptions: string[];
}

export default function StatusSelectorFilter({
  statusOptions,
}: StatusSelectorFilterProps) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = (status: string) => {
    const params = new URLSearchParams(searchParams);
    if (status) {
      params.set("status", status);
    } else {
      params.delete("status");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={"flex flex-col gap-2"}>
      <label htmlFor="status">Select status</label>
      <select
        title="Select status"
        className="rounded-md border-2 p-2"
        value={new URLSearchParams(searchParams).get("status") || ""}
        onChange={(event) => handleSearch(event.target.value)}
      >
        <option value="">All status</option>
        {statusOptions.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
}
