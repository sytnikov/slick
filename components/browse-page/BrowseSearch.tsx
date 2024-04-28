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
    <div className={"rounded-xl2 m-auto flex w-full flex-col gap-2 p-4"}>
      <div className={"flex w-full flex-col rounded-md bg-white p-4"}>
        <div
          className={"mb-4 flex w-full flex-row items-center justify-between"}
        >
          <h3 className={"text-md font-bold"}>Browse shops</h3>
          <ClearFiltersButton buttonVariant={"ghost"} buttonText={"Clear"} />
        </div>
        <div className={"mb-4"}>
          <SearchByName shops={shops} />
        </div>
        <div className={"flex flex-row justify-start gap-2"}>
          <TownSelectorFilter cities={cities} />
          <ServiceSelectorFilter />
          <StatusSelectorFilter statusOptions={statusOptions} />
        </div>
      </div>
    </div>
  );
}
