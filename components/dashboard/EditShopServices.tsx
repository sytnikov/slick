import { ShopService } from "@/types";
import { SubmitButton } from "../buttons/SubmitButton";

interface EditShopServicesProps {
  shopServices: ShopService[];
}

export default function EditShopServices({
  shopServices,
}: EditShopServicesProps) {
  return (
    <div className="space-y-8">
      {shopServices.map((service) => (
        <form key={service.id} className="grid grid-cols-3 items-end gap-4">
          <div className="flex flex-col">
            <label htmlFor={`serviceName-${service.id}`}>Service Name</label>
            <input
              type="text"
              id={`serviceName-${service.id}`}
              name="serviceName"
              defaultValue={service.service_name}
              placeholder="Service Name"
              readOnly
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor={`servicePrice-${service.id}`}>Price</label>
            <input
              type="number"
              id={`servicePrice-${service.id}`}
              name="servicePrice"
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
              id={`serviceDuration-${service.id}`}
              name="serviceDuration"
              defaultValue={service.duration}
              placeholder="Duration"
            />
          </div>
          <SubmitButton
            className="hover:bg-primary-dark col-span-3 h-10 rounded-md bg-primary px-4 py-2 text-white"
            pendingText="Saving changes..."
          >
            Save changes
          </SubmitButton>
        </form>
      ))}
    </div>
  );
}
