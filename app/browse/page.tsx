import { createClient } from "@/utils/supabase/server";

export default async function Browse() {
  const supabase = createClient();
  const { data: shops } = await supabase.from("Repair Shops").select();

  return (
    <main className="flex-1 flex flex-col justify-center">
      <div className={"animate-in"}>
        <h1 className={"text-2xl"}>All of the repair shops: </h1>
        <div className={"flex flex-col gap-4"}>
          {shops && shops.length > 0 ? (
            shops.map((shop) => (
              <div
                key={shop.id}
                className={
                  "flex flex-col justify-center items-center gap-2 border-2 mt-4 p-4 rounded-md"
                }
              >
                <div className={"mb-4 p-2 bg-green text-white rounded-md"}>
                  <p>{shop.status}</p>
                </div>
                <h2 className={"text-2xl mb-2"}>{shop.name}</h2>
                <p>{shop.address}</p>
              </div>
            ))
          ) : (
            <div>No results found</div>
          )}
        </div>
      </div>
    </main>
  );
}
