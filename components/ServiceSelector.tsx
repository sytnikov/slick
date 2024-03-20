"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Service } from "@/types";

interface ServiceSelectorProps {
  services: Service[] | null;
}

export default function ServiceSelector({ services }: ServiceSelectorProps) {
  const [selectedService, setSelectedService] = useState("");

  const router = useRouter();

  const handleSelectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const serviceName = event.target.value;
    setSelectedService(serviceName);

    if (serviceName) {
      router.push("/browse?service=" + serviceName, { scroll: false });
    }
  };

  return (
    <select
      title="Select service"
      className="select select-bordered border-accent"
      value={selectedService}
      onChange={handleSelectionChange}
    >
      <option value="">Filter by service</option>
      {services?.map((service) => (
        <option key={service.id} value={service.name}>
          {service.name}
        </option>
      ))}
    </select>
  );
}
