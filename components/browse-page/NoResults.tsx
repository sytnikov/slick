"use client";

import ClearFiltersButton from "@/components/browse-page/ClearFiltersButton";

export default function NoResults() {
  return (
    <div
      className={
        "flex w-full flex-col items-center justify-center rounded-lg border-2 border-gray-200 bg-gray-100 p-16"
      }
    >
      <h4 className={"mb-2 text-xl font-bold"}>No results found</h4>
      <p className={"text-s mb-4 font-light"}>No results found</p>
      <ClearFiltersButton buttonVariant={"default"} buttonText={"Try again"} />
    </div>
  );
}
