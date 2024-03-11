"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {} from "@/utils/booking-system/booking-logic";

interface BookServiceModalProps {
  id: number;
  selectedService: string;
  shopID: any;
  openingTime: string;
  closingTime: string;
  bookings: any[];
}

export default function BookServiceModal({
  id,
  selectedService,
  shopID,
  openingTime,
  closingTime,
  bookings,
}: BookServiceModalProps) {
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
            Pick an available time for {selectedService}
          </h3>
          {selectedSlot && (
            <div className="sticky bottom-0 bg-black p-4 text-white rounded-md flex items-center justify-center">
              <Link
                href={`/booking-confirmation?service=${encodeURIComponent(
                  id
                )}&slot=${encodeURIComponent(
                  selectedSlot
                )}&name=${encodeURIComponent(
                  selectedService
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
