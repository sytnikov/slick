import { SubmitButton } from "../buttons/SubmitButton";

import { saveChangesMadeToRepairShop } from "@/server/repair-shops/actions";
import { getShopBannerImageUrl } from "@/server/repair-shops/actions";

import UploadShopBanner from "./UploadShopBanner";

import { RepairShop } from "@/types";

interface EditShopInfoFormProps {
  repairShop: RepairShop;
}

export default async function EditShopInfoForm({
  repairShop,
}: EditShopInfoFormProps) {
  const bannerImage = await getShopBannerImageUrl(repairShop.id);

  const saveUserChanges = async (formData: FormData) => {
    "use server";
    await saveChangesMadeToRepairShop(formData, repairShop.id);
  };

  return (
    <>
      <form className="mb-8 grid grid-cols-3 gap-4">
        <div className="flex flex-col">
          <label htmlFor="shopName">Shop Name</label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={repairShop.name}
            placeholder="Enter shop name"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="shopDescription">Shop Description</label>
          <textarea
            id="description"
            name="description"
            defaultValue={repairShop.description}
            placeholder="Describe your shop"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="shopAddress">Shop Address</label>
          <input
            type="text"
            id="street_address"
            name="street_address"
            defaultValue={repairShop.street_address}
            placeholder="Enter shop address"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="shopCity">City</label>
          <input
            type="text"
            id="city"
            name="city"
            defaultValue={repairShop.city}
            placeholder="City"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            id="postal_code"
            name="postal_code"
            defaultValue={repairShop.postal_code}
            placeholder="Postal Code"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="shopHours">Shop Hours</label>
          <input
            type="text"
            id="opening_time"
            name="opening_time"
            defaultValue={repairShop.opening_time}
            placeholder="HH:MM - HH:MM"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="shopHours">Shop Hours</label>
          <input
            type="text"
            id="closing_time"
            name="closing_time"
            defaultValue={repairShop.closing_time}
            placeholder="HH:MM - HH:MM"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="numberOfEmployees">Number of Employees</label>
          <input
            type="number"
            id="number_of_employees"
            name="number_of_employees"
            defaultValue={repairShop.number_of_employees}
            placeholder="Number of Employees"
          />
        </div>
        <SubmitButton
          formAction={saveUserChanges}
          className="mb-2 h-10 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
          pendingText="Saving changes..."
        >
          Save changes
        </SubmitButton>
      </form>

      <div className={"flex w-full flex-row gap-12"}>
        <div className={"flex flex-col items-start"}>
          <p className={"mb-2"}>Upload banner</p>
          <UploadShopBanner
            shopId={repairShop.id}
            uploadedImage={bannerImage}
          />
        </div>
      </div>
    </>
  );
}
