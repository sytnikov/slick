import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateVehicle } from "@/server/customer-vehicles/actions";
import { Textarea } from "../ui/textarea";
import { Pencil } from "lucide-react";
import { CustomerVehicle } from "@/types";

type UpdateVehicleModalProps = {
  vehicle: CustomerVehicle;
};

export default function UpdateVehicleModal({
  vehicle,
}: UpdateVehicleModalProps) {
  const handleUpdateVehicle = async (formData: FormData) => {
    "use server";
    updateVehicle(formData);
    console.log('formData:', formData)
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Pencil size={20} strokeWidth={1.75} />
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Update a vehicle</DialogTitle>
          <DialogDescription>
            Change necessary fields, then click on Update vehicle to save the changes. 
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="make">Make</Label>
            <Input
              id="make"
              name="make"
              defaultValue={vehicle.make}
              placeholder="Enter vehicle make"
              className="col-span-3"
              required
            ></Input>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="model">Model</Label>
            <Input
              id="model"
              name="model"
              defaultValue={vehicle.model}
              placeholder="Enter vehicle model"
              className="col-span-3"
              required
            ></Input>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="yearManufactured">Year</Label>
            <Input
              id="yearManufactured"
              name="yearManufactured"
              defaultValue={vehicle.year_manufactured}
              placeholder="Enter production year"
              className="col-span-3"
              required
            ></Input>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="registrationNumber">Reg. №</Label>
            <Input
              id="registrationNumber"
              name="registrationNumber"
              defaultValue={vehicle.registration_number}
              placeholder="Enter registration number"
              className="col-span-3"
              required
            ></Input>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={vehicle.description}
              placeholder="Add any description"
              className="col-span-3"
            ></Textarea>
          </div>
          <Input
              type="hidden"
              id="vehicle_id"
              name="vehicle_id"
              defaultValue={vehicle.id}
            ></Input>
          <DialogFooter>
            <DialogTrigger>
              <Button type="submit" formAction={handleUpdateVehicle}>
                Update vehicle
              </Button>
            </DialogTrigger>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
