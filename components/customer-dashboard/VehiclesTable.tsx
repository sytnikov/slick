import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrashIcon } from "lucide-react";
import { CustomerVehicle } from "@/types";
import UpdateVehicleModal from "./UpdateVehicleModal";

type VehiclesTableProps = {
  vehicles: CustomerVehicle[];
};

export default function VehiclesTable({ vehicles }: VehiclesTableProps) {
  return (
    <Table>
      <TableCaption>A list of your vehicles added.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Make</TableHead>
          <TableHead>Model</TableHead>
          <TableHead>Year</TableHead>
          <TableHead>Registration №</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vehicles.map((vehicle) => (
          <TableRow key={vehicle.id}>
            <TableCell className="font-medium">{vehicle.make}</TableCell>
            <TableCell>{vehicle.model}</TableCell>
            <TableCell>{vehicle.year_manufactured}</TableCell>
            <TableCell>{vehicle.registration_number}</TableCell>
            <TableCell>{vehicle.description}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <UpdateVehicleModal vehicle={vehicle}/>
                
                <TrashIcon size={20} strokeWidth={1.75}/>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
