import { addNewService } from "@/server/shop-services/actions";

import { ListOfShopServices } from "@/utils/shopServiceList";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddNewServiceModalProps {
  shopId: number;
}

export function AddNewServiceModal({ shopId }: AddNewServiceModalProps) {
  const handleAddService = async (formData: FormData) => {
    "use server";
    addNewService(formData);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add service</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new service</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input type="hidden" id="shop_id" name="shop_id" value={shopId} />
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <select
              id="service_name"
              name="service_name"
              title="name"
              className="col-span-3"
            >
              {ListOfShopServices.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Price
            </Label>
            <Input
              id="price"
              name="price"
              placeholder="350"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="duration" className="text-right">
              Duration
            </Label>
            <Input
              id="duration"
              name="duration"
              placeholder="120"
              className="col-span-3"
            />
          </div>
          <DialogFooter>
            <DialogTrigger>
              <Button type="submit" formAction={handleAddService}>
                Add new service
              </Button>
            </DialogTrigger>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
