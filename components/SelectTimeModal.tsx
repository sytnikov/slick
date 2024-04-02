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

import generateSlots from "@/utils/booking-system/generate-slots";
import { groupTimeSlots } from "@/utils/booking-system/date-utils";

import { RepairShop, Service } from "@/types";

interface SelectTimeModalProps {
  shop: RepairShop;
  service: Service;
}

export default function SeletTimeModal({
  shop,
  service,
}: SelectTimeModalProps) {
  const [selectedTime, setSelectedTime] = useState<string>("");

  const timeSlots = generateSlots(shop.opening_time, shop.closing_time);

  const groupedSlots = groupTimeSlots(
    timeSlots,
    shop.opening_time,
    shop.closing_time,
  );

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className={"rounded bg-black p-2 text-white"}>Select time</div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Select time for {service.name}</AlertDialogTitle>
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
            <Link
              href={`/booking-confirmation?service=${encodeURIComponent(
                service.id,
              )}&slot=${encodeURIComponent(
                selectedTime,
              )}&shop=${encodeURIComponent(shop.id)}`}
            >
              {selectedTime ? `Select ${selectedTime}` : "Continue"}
            </Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
