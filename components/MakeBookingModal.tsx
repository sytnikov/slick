"use client";

import { useEffect, useState } from "react";
import { getNextWeekDates, generateTimeSlots } from "@/utils/helper-functions";
import Link from "next/link";

interface MakeBookingModalProps {
  id: number;
  serviceName: string;
  shopID: any;
}

export default function MakeBookingModal({
  id,
  serviceName,
  shopID,
}: MakeBookingModalProps) {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const openingTime = "10:00";
  const closingTime = "19:00";

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const handleSelection = (date: Date, time: string) => {
    const selected = `${formatDate(date)} ${time}`;
    setSelectedSlot(selected);
  };

  // reset the modal when it's closed

  useEffect(() => {
    const modal = document.getElementById(id.toString());
    const handleClose = () => {
      setSelectedSlot(null);
    };

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
          if (modal instanceof HTMLDialogElement) {
            modal.showModal();
          }
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
            const slots = generateTimeSlots(openingTime, closingTime);
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
                  {slots.map((time, index) => (
                    <button
                      key={`${formattedDate} ${time}`}
                      className={`p-2 rounded-md cursor-pointer ${
                        selectedSlot === `${formattedDate} ${time}`
                          ? "bg-green text-white"
                          : "bg-gray-200"
                      }`}
                      onClick={() => handleSelection(date, time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
          {selectedSlot && (
            <div className={"sticky bottom-0 flex items-center justify-center"}>
              <Link
                href={`/booking-confirmation?service=${encodeURIComponent(
                  id
                )}&slot=${encodeURIComponent(
                  selectedSlot
                )}&name=${encodeURIComponent(
                  serviceName
                )}&shop=${encodeURIComponent(shopID)}`}
              >
                <button className="btn btn-secondary text-white">
                  Book: {selectedSlot}
                </button>
              </Link>
            </div>
          )}
        </div>
        <form method="dialog" className="modal-action">
          <button
            className="btn"
            onClick={() => {
              setSelectedSlot(null);
              const modal = document.getElementById(id.toString());
            }}
          >
            Close
          </button>
        </form>
      </dialog>
    </>
  );
}
