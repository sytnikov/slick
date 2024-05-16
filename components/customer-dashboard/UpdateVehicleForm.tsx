"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateVehicle } from "@/server/customer-vehicles/actions";
import { SubmitButton } from "../buttons/SubmitButton";
import { CustomerVehicle } from "@/types";
import { vehicleFields } from "@/utils/vehicleFormFields";

const FormSchema = z.object({
  make: z.string().min(3, {
    message: "Make name must be at least 3 characters.",
  }),
  model: z.string().min(3, {
    message: "Model name  must be at least 3 characters.",
  }),
  yearManufactured: z.string().min(4).max(4),
  registrationNumber: z.string().min(7, {
    message: "Registration number example: AAA-123.",
  }),
  description: z.string().max(150, {
    message: "The description is too long.",
  }),
});

export type FormDataType = z.infer<typeof FormSchema>;

type UpdateVehicleFormProps = {
  vehicle: CustomerVehicle;
  onSuccess: () => void;
};

export default function UpdateVehicleForm({
  vehicle,
  onSuccess,
}: UpdateVehicleFormProps) {
  const form = useForm<FormDataType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      make: `${vehicle.make}`,
      model: `${vehicle.model}`,
      yearManufactured: `${vehicle.year_manufactured}`,
      registrationNumber: `${vehicle.registration_number}`,
      description: `${vehicle.description}`,
    },
  });

  const handleUpdateVehicle = async (formData: FormDataType) => {
    const response = await updateVehicle(formData, vehicle.id);
    if (response) {
      onSuccess();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleUpdateVehicle)}
        className="space-y-6"
      >
        {vehicleFields.map((vehicle) => (
          <React.Fragment key={vehicle.id}>
            <FormField
              control={form.control}
              name={vehicle.name}
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel>{vehicle.label}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={vehicle.placeholder}
                        className="col-span-3"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </React.Fragment>
        ))}
        <SubmitButton
          type="submit"
          pendingText="Updating..."
          className="mb-2 h-10 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
        >
          Update vehicle
        </SubmitButton>
      </form>
    </Form>
  );
}
