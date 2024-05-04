"use client";

import { useState } from "react";
import Link from "next/link";

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
import { Button } from "../ui/button";

import generateSlots from "@/utils/booking-system/generate-slots";
import { groupTimeSlots } from "@/utils/booking-system/date-utils";

import { Booking, RepairShop, ShopService } from "@/types";

interface SelectTimeModalProps {
  shop: RepairShop;
  service: ShopService;
  bookings: Booking[];
}

export default function SeletTimeModal({
  shop,
  service,
  bookings,
}: SelectTimeModalProps) {
  const [selectedTime, setSelectedTime] = useState<string>("");

  // TODO: Filter out booked slots, present them as disabled

  const timeSlots = generateSlots(shop.opening_time, shop.closing_time, [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ]);

  const groupedSlots = groupTimeSlots(
    timeSlots,
    shop.opening_time,
    shop.closing_time,
  );

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button>Book now</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Select time for {service.service_name}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {Object.entries(groupedSlots).map(([date, slots], index) => (
              <div key={index} className={"mb-2 overflow-scroll"}>
                <h3>{date}</h3>
                <div className={"grid grid-cols-4 gap-2"}>
                  {slots.map((time: string, index: number) => (
                    <div
                      key={index}
                      onClick={() => setSelectedTime(`${date} ${time}`)}
                      className={`flex items-center justify-center rounded ${selectedTime === `${date} ${time}` ? "bg-black text-primary-foreground" : " bg-gray-200 hover:bg-gray-300"}`}
                    >
                      {time}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setSelectedTime("")}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction>
            {selectedTime && (
              <Link
                href={`/booking-confirmation?service=${encodeURIComponent(
                  service.id,
                )}&slot=${encodeURIComponent(
                  selectedTime,
                )}&shop=${encodeURIComponent(shop.id)}`}
              >
                Select {selectedTime}
              </Link>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
