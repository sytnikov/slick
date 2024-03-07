import { FinnishTowns } from "@/utils/towns";

export default function BrowseSearch() {
  return (
    <div className={"bg-white p-4 rounded-xl"}>
      <div className={"flex flex-row gap-1"}>
        <input
          type="text"
          title={"Search box"}
          placeholder={"Masan paja"}
          className={"w-full p-2 border-2 rounded-xl border-accent"}
        />
        <select
          title={"Select town"}
          className="select select-bordered border-accent"
        >
          <option>Tampere</option>
          {FinnishTowns.map((town) => (
            <option key={town}>{town}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
