"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getNextWeekDates, generateTimeSlots } from "@/utils/helper-functions";

interface MakeBookingModalProps {
  id: number;
  serviceName: string;
  shopID: any;
  openingTime: string;
  closingTime: string;
  bookings: any[];
}

export default function MakeBookingModal({
  id,
  serviceName,
  shopID,
  openingTime,
  closingTime,
  bookings,
}: MakeBookingModalProps) {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const handleSelection = (date: Date, time: string) => {
    const selected = `${formatDate(date)} ${time}`;
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
            Pick an available time for {serviceName}
          </h3>
          {getNextWeekDates().map((date) => {
            const filteredBookings = bookings.filter(
              (booking) =>
                formatDate(new Date(booking.booking_date)) === formatDate(date)
            );
            const daySlots = generateTimeSlots(
              openingTime,
              closingTime,
              filteredBookings,
              date
            );
            const formattedDate = formatDate(date);
            return (
              <div key={formattedDate} className="mb-6">
                <p className="mb-2">
                  Available time slots for:{" "}
                  {date.toLocaleDateString("en-US", {
                    weekday: "long",
                    day: "numeric",
                    month: "numeric",
                  })}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {daySlots.map(({ time, isBooked }, index) => (
                    <button
                      key={`${formattedDate}-${time}-${index}`}
                      className={`p-2 rounded-md cursor-pointer ${
                        selectedSlot === `${formattedDate} ${time}`
                          ? "bg-green text-white"
                          : isBooked
                          ? "border-2 border-red-500 bg-gray-200"
                          : "bg-gray-200"
                      }`}
                      onClick={() => !isBooked && handleSelection(date, time)}
                      disabled={isBooked}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
          {selectedSlot && (
            <div className="sticky bottom-0 flex items-center justify-center">
              <Link
                href={`/booking-confirmation?service=${encodeURIComponent(
                  id
                )}&slot=${encodeURIComponent(
                  selectedSlot
                )}&name=${encodeURIComponent(
                  serviceName
                )}&shop=${encodeURIComponent(shopID)}`}
              >
                Book: {selectedSlot}
              </Link>
            </div>
          )}
        </div>
        <form method="dialog" className="modal-action">
          <button
            className="btn"
            // @ts-ignore
            onClick={() => document.getElementById(id.toString())?.close()}
          >
            Close
          </button>
        </form>
      </dialog>
    </>
  );
}
