"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { getTimeSlotsAndBookingsForRepairShop } from "@/utils/booking-system/booking-logic";

interface BookServiceModalProps {
  id: number;
  selectedService: string;
  selectedServiceID: number;
  shopID: number;
  openingTime: string;
  closingTime: string;
  bookings: any[];
  seats: number;
}

export default function BookServiceModal({
  id,
  selectedService,
  selectedServiceID,
  shopID,
  openingTime,
  closingTime,
  bookings,
  seats,
}: BookServiceModalProps) {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [weeklyTimeSlots, setWeeklyTimeSlots] = useState<any[]>([]);

  useEffect(() => {
    const slots = getTimeSlotsAndBookingsForRepairShop(
      new Date(),
      openingTime,
      closingTime,
      bookings,
      seats,
    );
    setWeeklyTimeSlots(slots);
  }, [openingTime, closingTime, bookings, seats]);

  const handleSelection = (
    date: string,
    time: string,
    isAvailable: boolean,
  ) => {
    if (!isAvailable) return;
    const selected = `${date} ${time}`;
    setSelectedSlot(selected);
  };

  useEffect(() => {
    const modal = document.getElementById(id.toString());
    const handleClose = () => setSelectedSlot(null);

    if (modal instanceof HTMLDialogElement) {
      modal.addEventListener("close", handleClose);
      return () => modal.removeEventListener("close", handleClose);
    }
  }, [id]);

  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => {
          const modal = document.getElementById(id.toString());
          // @ts-ignore
          modal?.showModal();
        }}
      >
        Book service
      </button>
      <dialog id={id.toString()} className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">
            Pick an available time for {selectedService}
          </h3>
          {weeklyTimeSlots.map((day) => (
            <div key={day.date} className="mb-4">
              <h4 className="text-md font-bold">
                {new Date(day.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </h4>
              <div className="grid grid-cols-3 gap-4">
                {day.slots.map((slot: any, index: number) => {
                  const isSelected =
                    `${day.date} ${slot.slotTime}` === selectedSlot;
                  return (
                    <button
                      key={`${day.date}-${index}`}
                      className={`p-2 ${
                        isSelected
                          ? "bg-green text-white"
                          : slot.isAvailable
                            ? "border-gray-400 hover:bg-gray-100"
                            : "border-grey-200 cursor-not-allowed text-gray-200"
                      } border-2`}
                      onClick={() =>
                        handleSelection(
                          day.date,
                          slot.slotTime,
                          slot.isAvailable,
                        )
                      }
                      disabled={!slot.isAvailable}
                    >
                      {slot.slotTime}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          {selectedSlot && (
            <div className="animate-in sticky bottom-0 flex items-center justify-center rounded-xl bg-black p-4 text-white">
              <Link
                href={`/booking-confirmation?service=${encodeURIComponent(
                  selectedServiceID,
                )}&slot=${encodeURIComponent(
                  selectedSlot,
                )}&shop=${encodeURIComponent(shopID)}`}
              >
                Book: {selectedSlot}
              </Link>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}
