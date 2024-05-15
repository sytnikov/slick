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
import { addNewVehicle } from "@/server/customer-vehicles/actions";
import { vehicleFields } from "@/utils/vehicleFormFields";
import { SubmitButton } from "../buttons/SubmitButton";

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

type AddNewVehicleFormProps = {
  customerId: string;
};

export default function AddNewVehicleForm({
  customerId,
}: AddNewVehicleFormProps) {
  const form = useForm<FormDataType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      make: "",
      model: "",
      yearManufactured: "",
      registrationNumber: "",
      description: "",
    },
  });

  const handleAddNewVehicle = async (formData: FormDataType) => {
    await addNewVehicle(formData, customerId);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleAddNewVehicle)}
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
          pendingText="Adding..."
          className="mb-2 h-10 rounded-md text-sm bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
        >
          Add vehicle
        </SubmitButton>
      </form>
    </Form>
  );
}
