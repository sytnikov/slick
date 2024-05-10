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
import { addNewVehicle } from "@/server/customer-vehicles/actions";
import { Textarea } from "../ui/textarea";

type AddNewVehicleModalProps = {
  customerId: string;
};

export default function AddNewVehicleModal({
  customerId,
}: AddNewVehicleModalProps) {
  const handleAddNewVehicle = async (formData: FormData) => {
    "use server";
    addNewVehicle(formData, customerId);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add vehicle</Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Add a new vehicle</DialogTitle>
          <DialogDescription>
            Provide the details of the new vehicle below.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="make">Make</Label>
            <Input
              id="make"
              name="make"
              placeholder="Toyota"
              className="col-span-3"
              required
            ></Input>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="model">Model</Label>
            <Input
              id="model"
              name="model"
              placeholder="Corolla"
              className="col-span-3"
              required
            ></Input>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="yearManufactured">Year</Label>
            <Input
              id="yearManufactured"
              name="yearManufactured"
              placeholder="2019"
              className="col-span-3"
              required
            ></Input>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="registrationNumber">Reg. №</Label>
            <Input
              id="registrationNumber"
              name="registrationNumber"
              placeholder="AAA-123"
              className="col-span-3"
              required
            ></Input>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Any notes to be added"
              className="col-span-3"
            ></Textarea>
          </div>
          <DialogFooter>
            <DialogTrigger>
              <Button type="submit" formAction={handleAddNewVehicle}>
                Add new vehicle
              </Button>
            </DialogTrigger>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
