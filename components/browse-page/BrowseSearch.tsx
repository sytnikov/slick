import { getAllCities, getAllStatuses } from "@/server/repair-shops/actions";

import SearchByName from "./SearchByName";
import ServiceSelectorFilter from "./ServiceSelectorFilter";
import TownSelectorFilter from "./TownSelectorFilter";
import ClearFiltersButton from "./ClearFiltersButton";
import StatusSelectorFilter from "./StatusSelectorFilter";

export default async function BrowseSearch() {
  const cities = await getAllCities();
  const statusOptions = await getAllStatuses();

  return (
    <div className={"rounded-xl2 m-auto flex w-full flex-col gap-2 p-4"}>
      <div className={"flex w-full flex-col rounded-md bg-white p-4"}>
        <div
          className={"mb-4 flex w-full flex-row items-center justify-between"}
        >
          <h3 className={"text-md font-bold"}>Browse shops</h3>
          <ClearFiltersButton />
        </div>
        <div className={"mb-4"}>
          <SearchByName />
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
