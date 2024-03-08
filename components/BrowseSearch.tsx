import { createClient } from "@/utils/supabase/server";

import ServiceSelector from "./ServiceSelector";
import CitySelector from "./CitySelector";

export default async function BrowseSearch() {
  const supabase = createClient();
  const { data: services } = await supabase.from("Services").select();

  return (
    <div className={"bg-green p-4 rounded-xl"}>
      <div className={"flex flex-row gap-1"}>
        <input
          type="text"
          title={"Search box"}
          placeholder={"Masan paja"}
          className={"w-full p-2 border-2 rounded-xl border-accent"}
        />
        <ServiceSelector services={services} />
        <CitySelector />
      </div>
    </div>
  );
}
