import { createClient } from "@/utils/supabase/server";

import ServiceSelector from "./ServiceSelector";
import CitySelector from "./CitySelector";

export default async function BrowseSearch() {
  return (
    <div className={"bg-green flex flex-row gap-1 rounded-xl p-4"}>
      <input
        type="text"
        title={"Search box"}
        placeholder={"Masan paja"}
        className={"w-full rounded-xl border-2 border-accent p-2"}
      />
      {/* <ServiceSelector services={services} /> */}
      <CitySelector />
    </div>
  );
}
