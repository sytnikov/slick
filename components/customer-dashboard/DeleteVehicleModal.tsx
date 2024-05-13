"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CustomerVehicle } from "@/types";
import { TrashIcon } from "lucide-react";
import { SubmitButton } from "../buttons/SubmitButton";
import { deleteVehicle } from "@/server/customer-vehicles/actions";
import { toast } from "../ui/use-toast";

type DeleteVehicleModalProps = {
  vehicle: CustomerVehicle;
};

export default function DeleteVehicleModal({
  vehicle,
}: DeleteVehicleModalProps) {
  

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <TrashIcon size={20} strokeWidth={1.75} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete the vehicle?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your vehicle record.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
