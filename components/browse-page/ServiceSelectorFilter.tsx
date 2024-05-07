"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { ListOfShopServices } from "@/utils/shopServiceList";

export default function ServiceSelectorFilter() {
  const services = ListOfShopServices;

  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = (service: string) => {
    const params = new URLSearchParams(searchParams);
    if (service) {
      params.set("service", service);
    } else {
      params.delete("service");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={"flex flex-col gap-2"}>
      <label htmlFor="service">Select service</label>
      <select
        title="Select service"
        className="rounded-md border-2 p-2"
        value={new URLSearchParams(searchParams).get("service") || ""}
        onChange={(event) => handleSearch(event.target.value)}
      >
        <option value="">All services</option>
        {services.map((service) => (
          <option key={service} value={service}>
            {service}
          </option>
        ))}
      </select>
    </div>
  );
}
