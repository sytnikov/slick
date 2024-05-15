import { getAllCities, getAllStatuses } from "@/server/repair-shops/actions";

import SearchByName from "./SearchByName";
import ServiceSelectorFilter from "./ServiceSelectorFilter";
import TownSelectorFilter from "./TownSelectorFilter";
import ClearFiltersButton from "./ClearFiltersButton";
import StatusSelectorFilter from "./StatusSelectorFilter";
import { RepairShop } from "@/types";

interface BrowseSearchProps {
  shops: RepairShop[];
}

export default async function BrowseSearch({ shops }: BrowseSearchProps) {
  const cities = await getAllCities();
  const statusOptions = await getAllStatuses();

  return (
    <div
      className={
        "rounded-xl2 m-auto flex w-full flex-col gap-2 rounded-md bg-gray-100 p-4"
      }
    >
      <div className={"flex w-full flex-col p-4"}>
        <div
          className={"mb-4 flex w-full flex-row items-center justify-between"}
        >
          <h3 className={"text-xl font-bold "}>Browse shops</h3>
          <ClearFiltersButton
            buttonVariant={"secondary"}
            buttonText={"Clear filters"}
          />
        </div>
        <div className={"mb-4"}>
          <SearchByName shops={shops} />
        </div>
        <div className={"flex flex-row justify-start gap-8"}>
          <TownSelectorFilter cities={cities} />
          <ServiceSelectorFilter />
          <StatusSelectorFilter statusOptions={statusOptions} />
        </div>
      </div>
    </div>
  );
}
