import { redirect } from "next/navigation";

import {
  getUser,
  getRepairShopAssociatedWithUser,
} from "@/server/user-authentication/actions";

import EditShopInfoForm from "@/components/dashboard/EditShopInfoForm";
import EditUserInfo from "@/components/dashboard/EditUserInfo";
import { getShopServices } from "@/server/shop-services/actions";
import EditShopServices from "@/components/dashboard/EditShopServices";
import { AddNewServiceModal } from "@/components/dashboard/AddNewServiceModal";

export default async function ShopSettings() {
  const user = await getUser();
  const repairShop = await getRepairShopAssociatedWithUser();
  const repairShopServices = await getShopServices(repairShop.id);

  if (user == null || repairShop == null) {
    return redirect("/login");
  }

  return (
    <div
      className={"flex h-full w-full flex-col items-start justify-start p-12"}
    >
      <div className={"mb-8 flex w-full flex-row justify-between"}>
        <p className={"mb-6 animate-fadeInUp text-3xl  font-bold"}>Settings</p>
      </div>
      <div className={"mb-24 w-full"}>
        <p className={"mb-6 animate-fadeInUp text-xl"}>Shop settings</p>
        <EditShopInfoForm repairShop={repairShop} />
      </div>
      <div className={"w-full"}>
        <div className={"flex w-full flex-row justify-between"}>
          <p className={"mb-6 animate-fadeInUp text-xl"}>Edit shop services</p>
          <AddNewServiceModal shopId={repairShop.id} />
        </div>
        <EditShopServices shopServices={repairShopServices} />
      </div>
      <div className={"w-full"}>
        <p className={"mb-6 animate-fadeInUp text-xl"}>Profile settings</p>
        <EditUserInfo user={user} />
      </div>
    </div>
  );
}
