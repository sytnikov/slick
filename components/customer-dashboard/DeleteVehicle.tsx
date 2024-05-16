import { deleteVehicle } from "@/server/customer-vehicles/actions";
import { Button } from "../ui/button";

type DeleteVehicleProps = {
  vehicleId: number;
};

export default function DeleteVehicle({ vehicleId }: DeleteVehicleProps) {
  const handleDeleteVehicle = async () => {
    "use server";
    const response = await deleteVehicle(vehicleId);
  };

  return (
    <form>
      <Button
        type="submit"
        variant="no_style"
        size="custom"
        formAction={handleDeleteVehicle}
      >
        Delete
      </Button>
    </form>
  );
}
