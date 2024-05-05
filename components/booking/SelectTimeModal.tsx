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

import { BookingWithDetails, RepairShop, ShopService } from "@/types";
import { formatTimestampToDate } from "@/utils/booking-system/date-utils";

interface SelectTimeModalProps {
  shop: RepairShop;
  service: ShopService;
  bookings: BookingWithDetails[];
}

export default function SeletTimeModal({
  shop,
  service,
  bookings,
}: SelectTimeModalProps) {
  const [selectedTime, setSelectedTime] = useState<string>("");

  const timeSlots = generateSlots(bookings, shop);

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div
          className={
            "flex flex-row items-center justify-center rounded-md bg-black p-2 text-white"
          }
        >
          Book now
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Select time for {service.service_name}
          </AlertDialogTitle>
          <AlertDialogDescription>
            <div className={"h-[700px] overflow-scroll"}>
              {timeSlots.map((daySlots, dayIndex) => (
                <div key={dayIndex} className="mb-2 overflow-scroll">
                  {daySlots.length > 0 && (
                    <h3 className="mb-3">
                      {formatTimestampToDate(daySlots[0].time)}
                    </h3>
                  )}
                  <div className="grid grid-cols-4 gap-2">
                    {daySlots.map((slot, slotIndex) => (
                      <div
                        key={slotIndex}
                        onClick={() => {
                          if (slot.booked) return;
                          setSelectedTime(slot.time);
                        }}
                        className={`flex cursor-pointer items-center justify-center rounded p-2 ${
                          selectedTime === slot.time
                            ? "bg-black text-white"
                            : slot.booked
                              ? "cursor-not-allowed bg-gray-200 text-white"
                              : "bg-gray-200 hover:bg-gray-300"
                        }`}
                        style={{ opacity: slot.booked ? 0.5 : 1 }}
                        title={
                          slot.booked
                            ? "This slot is already booked"
                            : "Click to book this slot"
                        }
                      >
                        {new Date(slot.time).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setSelectedTime("")}>
            Cancel
          </AlertDialogCancel>
          {selectedTime && (
            <AlertDialogAction>
              <Link
                href={`/booking-confirmation?service=${encodeURIComponent(
                  service.id,
                )}&slot=${encodeURIComponent(
                  selectedTime,
                )}&shop=${encodeURIComponent(shop.id)}`}
              >
                Select {formatTimestampToDate(selectedTime)} at{" "}
                {new Date(selectedTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Link>
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
