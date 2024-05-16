"use client";

import React from "react";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

type AddNewVehicleModalProps = {
  children: React.ReactNode;
};

export default function AddNewVehicleModal({
  children,
}: AddNewVehicleModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleSuccess = () => {
    setIsOpen(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
        {React.cloneElement(children as React.ReactElement<any>, {
          onSuccess: handleSuccess,
        })}
      </DialogContent>
    </Dialog>
  );
}
