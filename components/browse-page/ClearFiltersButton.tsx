"use client";
import { useSearchParams } from "next/navigation";

import { Button, buttonVariants } from "../ui/button";
import { type VariantProps } from "class-variance-authority";

interface ClearFiltersButtonProps {
  buttonVariant: VariantProps<typeof buttonVariants>["variant"];
  buttonText: string;
}

export default function ClearFiltersButton({
  buttonVariant,
  buttonText,
}: ClearFiltersButtonProps) {
  const searchParams = useSearchParams();

  const handleClearSearch = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("city");
    params.delete("service");
    params.delete("status");
    params.delete("name");
    window.location.search = params.toString();
  };

  return (
    <Button variant={buttonVariant} onClick={handleClearSearch}>
      {buttonText}
    </Button>
  );
}
