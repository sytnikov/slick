"use client";

import { useSearchParams } from "next/navigation";

import SelectVehicle from "./SelectVehicle";
import { Button } from "../ui/button";

import { CustomerVehicle, ShopService, UserProfile } from "@/types";
import { makeBooking } from "@/server/shop-services/actions";

interface BookingConfirmationProps {
  userId: number;
  firstName: UserProfile["first_name"];
  surname: UserProfile["surname"];
  slot: string;
  serviceName: ShopService["service_name"];
  userVehicles: CustomerVehicle[];
}

export default function BookingConfirmationDialogue({
  userId,
  firstName,
  surname,
  slot,
  serviceName,
  userVehicles,
}: BookingConfirmationProps) {
  const searchParams = useSearchParams();

  const selectedVehicle =
    new URLSearchParams(searchParams).get("vehicle") || "";

  // preform a client side post to the database from here with the info...
  const serviceId = searchParams.get("service");

  const handleMakeBooking = async () => {
    await makeBooking({
      shopServiceID: serviceId as string,
      userID: userId,
      bookingStart: slot,
      price: "120",
      shopID: 0,
      duration: "60",
    });
  };

  return (
    <form
      className={
        "mx-auto flex w-[50%] flex-col items-center justify-center rounded-xl bg-gray-100 p-12"
      }
    >
      <h1>
        Customer: {firstName} {surname}
      </h1>
      <p>Booking time: {slot}</p>
      <p>Service being booked: {serviceName}</p>
      <p className={"mt-4 opacity-50"}>
        Would you like to specifify which vehicle?
      </p>
      <SelectVehicle userVehicles={userVehicles} />
      <p>Selected vehicle: {selectedVehicle}</p>
      <div className={"mt-8 flex w-full flex-row items-center justify-center"}>
        <Button onClick={handleMakeBooking}>Submit</Button>
      </div>
    </form>
  );
}
