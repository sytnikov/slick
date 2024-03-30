import { getShopById } from "@/server/repair-shops/actions";

export default async function RepairShopPage({
  params,
}: {
  params: { id: number };
}) {
  const shop = await getShopById(params.id);
  return (
    <main className="flex w-full flex-1 flex-col items-center gap-20">
      <div className="animate-in flex max-w-4xl flex-1 flex-col gap-20 px-3 opacity-0">
        <main className="flex flex-1 flex-col justify-center">
          <h2>Welcome to {params.id}</h2>
        </main>
      </div>
    </main>
  );
}
