"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { RepairShop } from "@/types";
import { useMemo } from "react";

interface SearchByNameProps {
  shops: RepairShop[];
}
export default function SearchByName({ shops }: SearchByNameProps) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  let debouncedSearch = useMemo(() => {
    let timeout: NodeJS.Timeout;
    return (name: string) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        handleSearch(name);
      }, 500);
    };
  }, []);

  const handleSearch = (name: string) => {
    const params = new URLSearchParams(searchParams);
    if (name) {
      params.set("name", name);
    } else {
      params.delete("name");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <input
      placeholder="Masan Paja"
      className={"w-full rounded-md border-2 p-4"}
      onChange={(event) => debouncedSearch(event.target.value)}
    />
  );
}
