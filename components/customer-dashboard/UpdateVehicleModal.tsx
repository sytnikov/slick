"use client";

import React from "react";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";

type UpdateVehicleModalProps = {
  children: React.ReactNode;
};

export default function UpdateVehicleModal({
  children,
}: UpdateVehicleModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleSuccess = () => {
    setIsOpen(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Pencil size={20} strokeWidth={1.75} />
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Update a vehicle</DialogTitle>
          <DialogDescription>
            Change necessary fields, then click on Update vehicle to save the
            changes.
          </DialogDescription>
        </DialogHeader>
        {React.cloneElement(children as React.ReactElement<any>, {
          onSuccess: handleSuccess,
        })}
      </DialogContent>
    </Dialog>
  );
}
