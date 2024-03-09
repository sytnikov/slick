"use client";

import { getNextWeekDates, generateTimeSlots } from "@/utils/helper-functions";
import BookingSlot from "./BookingSlot";

interface MakeBookingModalProps {
  id: number;
  serviceName: string;
}

export default function MakeBookingModal({
  id,
  serviceName,
}: MakeBookingModalProps) {
  // TODO: This should be fetched from the repair shop's opening and closing times
  const openingTime = "10:00";
  const closingTime = "19:00";

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
          <h3 className="font-bold text-lg">{`Pick an available time for ${serviceName}`}</h3>
          {getNextWeekDates().map((date) => {
            const slots = generateTimeSlots(openingTime, closingTime);
            return (
              <div key={date.toString()} className={"mb-6"}>
                <p className={"mb-2"}>
                  Available time slots for:
                  {date.toLocaleDateString("en-US", {
                    weekday: "long",
                    day: "numeric",
                    month: "numeric",
                  })}
                </p>
                <div className={"grid grid-cols-2 gap-4"}>
                  {slots.map((slot, index) => (
                    <BookingSlot key={index} time={`${slot}`} serviceId={id} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
