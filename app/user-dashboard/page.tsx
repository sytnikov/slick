import Link from "next/link";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: shops } = await supabase
    .from("Repair Shops")
    .select("*")
    .eq("id", user && user.id);

  const { data: shopInquries } = await supabase
    .from("Inquiries")
    .select("*")
    .eq("shop_id", shops && shops.length > 0 ? shops[0].id : null);

  const { data: personalInquries } = await supabase
    .from("Inquiries")
    .select("*")
    .eq("customer_id", user && user.id);

  const { data: shopProposals } = await supabase
    .from("Proposals")
    .select("*")
    .eq("shop_id", shops && shops.length > 0 ? shops[0].id : null);

  const { data: personalProposals } = await supabase
    .from("Proposals")
    .select("*")
    .eq("customer_id", user && user.id);

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full">
        <div className="py-6 font-bold bg-purple-950 text-center">
          This is a protected page that you can only see as an authenticated
          user
        </div>
      </div>
      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <main className="flex-1 flex flex-col gap-6">
          <h1 className={"text-center text-2xl"}>Welcome user: {user.email}</h1>
          <div className={"w-full flex justify-center mb-8"}>
            <Link className={"border-2 p-4 bg-blue-800"} href="/browse">
              Browse repair shops
            </Link>
          </div>
          <div className={"grid grid-cols-2 gap-24"}>
            {shops ? (
              <>
                <div>
                  <h1 className={"text-center"}>
                    Here are the repair shops associated with you:{" "}
                  </h1>
                  <div className={"flex flex-col gap-4"}>
                    {shops.map((shop) => (
                      <div
                        key={shop.id}
                        className={
                          "flex flex-col justify-center items-center gap-2 border-2 mt-4 p-4 rounded-md"
                        }
                      >
                        <h2 className={"text-2xl mb-2"}>{shop.name}</h2>
                        <p>{shop.address}</p>
                        <p>{shop.id}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div>Nothing found</div>
            )}
            <div>
              <div>Here are your personal inquiries</div>
              <div className={"flex flex-col gap-4"}>
                {personalInquries?.map((inquiry) => (
                  <div
                    key={inquiry.id}
                    className={
                      "flex flex-col justify-center items-center gap-2 border-2 mt-4 p-4 rounded-md"
                    }
                  >
                    <div>
                      <p className={"text-left mb-4"}>
                        {inquiry.customer_name}
                      </p>
                      <h2 className={"text-2xl mb-2"}>{inquiry.description}</h2>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div>Here are your shop inquiries</div>
              <div className={"flex flex-col gap-4"}>
                {shopInquries?.map((inquiry) => (
                  <div
                    key={inquiry.id}
                    className={
                      "flex flex-col justify-center items-center gap-2 border-2 mt-4 p-4 rounded-md"
                    }
                  >
                    <div>
                      <p className={"text-left mb-4"}>
                        {inquiry.customer_name}
                      </p>
                      <h2 className={"text-2xl mb-2"}>{inquiry.description}</h2>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div>Proposals your shop made: </div>
              <div className={"flex flex-col gap-4"}>
                {shopProposals?.map((inquiry) => (
                  <div
                    key={inquiry.id}
                    className={
                      "flex flex-col justify-center items-center gap-2 border-2 mt-4 p-4 rounded-md"
                    }
                  >
                    <div>
                      <p className={"text-left mb-4"}>
                        {inquiry.price_estimate}
                      </p>
                      <h2 className={"text-2xl mb-2"}>{inquiry.message}</h2>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div>Proposals you've received: </div>
              <div className={"flex flex-col gap-4"}>
                {personalProposals?.map((inquiry) => (
                  <div
                    key={inquiry.id}
                    className={
                      "flex flex-col justify-center items-center gap-2 border-2 mt-4 p-4 rounded-md"
                    }
                  >
                    <div>
                      <div className={"flex justify-between"}>
                        <p className={"text-left mb-4"}>
                          {inquiry.price_estimate}
                        </p>
                        <p className={"text-left mb-4"}>{inquiry.status}</p>
                      </div>
                      <h2 className={"text-2xl mb-2"}>{inquiry.message}</h2>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
