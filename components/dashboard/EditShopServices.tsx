import {
  deleteShopService,
  updateShopService,
} from "@/server/shop-services/actions";
import { SubmitButton } from "../buttons/SubmitButton";
import { ShopService } from "@/types";
import { Button } from "../ui/button";

interface EditShopServicesProps {
  shopServices: ShopService[];
}

export default function EditShopServices({
  shopServices,
}: EditShopServicesProps) {
  const handleServiceUpdate = async (formData: FormData) => {
    "use server";
    updateShopService(formData);
  };

  const handleServiceDelete = async (formData: FormData) => {
    "use server";
    deleteShopService(formData);
  };

  return (
    <div className="mb-12 space-y-8">
      {shopServices.map((service, index) => (
        <form className={"flex flex-row items-center"} key={index}>
          <div className="flex flex-row items-center gap-6">
            <div className="flex flex-col">
              <input type="hidden" name="service_id" value={service.id} />
              <label htmlFor={`serviceName-${service.id}`}>Service Name</label>
              <input
                type="text"
                id="serviceName"
                name="service_name"
                defaultValue={service.service_name}
                placeholder="Service Name"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor={`servicePrice-${service.id}`}>Price</label>
              <input
                type="number"
                id="price"
                name="price"
                defaultValue={service.price}
                placeholder="Price"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor={`serviceDuration-${service.id}`}>
                Duration (minutes)
              </label>
              <input
                type="number"
                id="duration"
                name={"duration"}
                defaultValue={service.duration}
                placeholder="Duration"
              />
            </div>
          </div>
          <SubmitButton
            formAction={handleServiceUpdate}
            className="mb-2 h-10 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
            pendingText="Saving changes..."
          >
            Save changes
          </SubmitButton>
          <Button variant={"destructive"} formAction={handleServiceDelete}>
            Delete
          </Button>
        </form>
      ))}
    </div>
  );
}
