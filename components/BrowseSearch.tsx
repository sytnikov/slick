import { createClient } from "@/utils/supabase/server";

import ServiceSelector from "./ServiceSelector";
import CitySelector from "./CitySelector";

export default async function BrowseSearch() {
  const supabase = createClient();
  const { data: services } = await supabase.from("Services").select();

  return (
    <div className={"flex flex-row gap-1 rounded-xl bg-green p-4"}>
      <input
        type="text"
        title={"Search box"}
        placeholder={"Masan paja"}
        className={"w-full rounded-xl border-2 border-accent p-2"}
      />
      <ServiceSelector services={services} />
      <CitySelector />
    </div>
  );
}
