import EditShopInfoForm from "@/components/dashboard/EditShopInfoForm";
import {
  getUser,
  getRepairShopAssociatedWithUser,
} from "@/server/user-authentication/actions";

export default async function ShopSettings() {
  const user = await getUser();
  const repairShop = await getRepairShopAssociatedWithUser();

  return (
    <div
      className={"flex h-full w-full flex-col items-start justify-start p-12"}
    >
      <div className={"mb=8 flex w-full flex-row justify-between"}>
        <p className={"mb-6 animate-fadeInUp text-3xl  font-bold"}>Settings</p>
      </div>
      <div className={"w-full"}>
        <p className={"mb-6 animate-fadeInUp text-xl"}>Shop settings</p>
        <EditShopInfoForm repairShop={repairShop} />
      </div>
    </div>
  );
}
