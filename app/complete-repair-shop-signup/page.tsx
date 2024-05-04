import { createRepairShop } from "@/server/repair-shops/actions";

import PageLayout from "@/components/layouts/PageLayout";
import { Button } from "@/components/ui/button";
import { getUser } from "@/server/user-authentication/actions";

export default async function page() {
  const user = await getUser();
  const handleShopCreation = async (formData: FormData) => {
    "use server";

    await createRepairShop(formData);
  };

  return (
    <PageLayout>
      <main className={"flex flex-1 flex-col items-center justify-center"}>
        <h1 className={"text-xl font-bold"}>
          Complete repair shop registration
        </h1>
        <form>
          <input
            id="user-id"
            name={"associated_user"}
            type="text"
            value={user?.user_id}
            hidden
          />
          <div className={"flex flex-col gap-2"}>
            <label htmlFor="shop-name">Shop name</label>
            <input
              id="shop-name"
              name={"name"}
              type="text"
              placeholder="Enter shop name"
              className={
                "rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-primary"
              }
            />
          </div>
          <div className={"flex flex-col gap-2"}>
            <label htmlFor="shop-address">Shop address</label>
            <input
              id="shop-address"
              name={"street_address"}
              type="text"
              placeholder="Enter shop address"
              className={
                "rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-primary"
              }
            />
          </div>
          <div className={"flex flex-col gap-2"}>
            <label htmlFor="shop-address">Postal code</label>
            <input
              id="postal-code"
              name={"postal_code"}
              type="text"
              placeholder="Enter postal code"
              className={
                "rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-primary"
              }
            />
          </div>
          <div className={"flex flex-col gap-2"}>
            <label htmlFor="city">City</label>
            <input
              id="city"
              name={"city"}
              type="text"
              placeholder="Enter postal code"
              className={
                "rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-primary"
              }
            />
          </div>
          <div className={"flex flex-col gap-2"}>
            <label htmlFor="shop-address">Opening time</label>
            <input
              id="opening-time"
              name={"opening_time"}
              type="text"
              placeholder="Enter opening time"
              className={
                "rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-primary"
              }
            />
          </div>
          <div className={"flex flex-col gap-2"}>
            <label htmlFor="shop-address">Closing time</label>
            <input
              id="closing-time"
              name={"closing_time"}
              type="text"
              placeholder="Enter closing time"
              className={
                "rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-primary"
              }
            />
          </div>
          <div className={"mb-4 flex flex-col gap-2"}>
            <label htmlFor="number-of-employees">Number of employees</label>
            <input
              type="number"
              name={"number_of_employees"}
              id="number-of-employees"
              placeholder="Enter number of employees"
              className={
                "rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-primary"
              }
            />
          </div>
          <div className={"mb-4 flex flex-col gap-2"}>
            <label htmlFor="shop-description">Shop description</label>
            <textarea
              id="shop-description"
              name={"description"}
              placeholder="Enter shop description"
              className={
                "rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-primary"
              }
            />
          </div>
          <Button
            type={"submit"}
            size={"lg"}
            formAction={handleShopCreation}
            className={"w-full"}
          >
            Submit
          </Button>
        </form>
      </main>
    </PageLayout>
  );
}
