import SearchByName from "./SearchByName";
import ServiceSelectorFilter from "./ServiceSelectorFilter";
import TownSelectorFilter from "./TownSelectorFilter";

export default async function BrowseSearch() {
  return (
    <div className={"rounded-xl2 m-auto mt-4 flex w-full flex-col gap-2 p-4"}>
      <div
        className={
          "flex w-full flex-row gap-6 rounded-md border-2 bg-white p-4"
        }
      >
        <SearchByName />
        <TownSelectorFilter />
        <ServiceSelectorFilter />
      </div>
    </div>
  );
}
