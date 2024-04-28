"use client";
import { useSearchParams } from "next/navigation";

import { Button } from "../ui/button";

export default function ClearFiltersButton() {
  const searchParams = useSearchParams();

  const handleClearSearch = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("city");
    params.delete("service");
    window.location.search = params.toString();
  };

  return (
    <Button variant={"ghost"} onClick={handleClearSearch}>
      Clear filters
    </Button>
  );
}
