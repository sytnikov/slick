import Link from "next/link";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsVerticalIcon } from "@radix-ui/react-icons";

import { formatTimestampToDate } from "@/utils/booking-system/date-utils";
import { BookingWithDetails } from "@/types";

interface BookingsTableProps {
  bookings: BookingWithDetails[];
}

function Minimenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <DotsVerticalIcon className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Copy booking ID</DropdownMenuItem>
        <DropdownMenuItem>Cancel booking</DropdownMenuItem>
        <DropdownMenuItem>Send message</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function IncomingBookings({ bookings }: BookingsTableProps) {
  const sortedBookingsByDate = [...bookings].sort((a, b) => {
    return (
      new Date(b.booking_start_date).getTime() -
      new Date(a.booking_start_date).getTime()
    );
  });

  return (
    <div
      className={"h-full flex-grow rounded-md bg-white pb-6 pl-10 pr-10 pt-10"}
    >
      <div className={"mb-8 flex w-full flex-row items-center justify-between"}>
        <p className={"text-xl font-bold"}>Incoming bookings</p>
        <Link href={"/shop-bookings"}>
          <Button variant={"secondary"}>See all bookings</Button>
        </Link>
      </div>
      <div className={"wi-full mb-2 flex flex-row"}>
        <div className={"flex w-[20%] flex-row justify-center"}>
          <p className={"font-bold"}>Booking ID</p>
        </div>
        <div className={"flex w-[20%] flex-row justify-center"}>
          <p className={"font-bold"}>Date</p>
        </div>
        <div className={"flex w-[20%] flex-row justify-center"}>
          <p className={"font-bold"}>Customer</p>
        </div>
        <div className={"flex w-[20%] flex-row justify-center"}>
          <p className={"font-bold"}>Service</p>
        </div>
        <div className={"flex w-[20%] flex-row justify-center"}>
          <p className={"font-bold"}>Price</p>
        </div>
      </div>
      {sortedBookingsByDate.slice(0, 3).map((booking) => (
        <div
          key={booking.id}
          className={
            "relative mb-4 flex w-full flex-row items-center justify-center p-2"
          }
        >
          <div
            className={
              "text-md flex w-[20%] items-center justify-center border-b-2 p-2"
            }
          >
            {booking.id}
          </div>
          <div
            className={
              "text-md flex w-[20%] items-center justify-center border-b-2 p-2"
            }
          >
            {formatTimestampToDate(booking.booking_start_date)}
          </div>
          <div
            className={
              "text-md flex w-[20%] items-center justify-center border-b-2 p-2"
            }
          >
            {booking.user_id.first_name} {booking.user_id.surname}
          </div>
          <div
            className={
              "text-md flex w-[20%] items-center justify-center border-b-2 p-2"
            }
          >
            {booking.shop_service_id.service_name}
          </div>
          <div
            className={
              "text-md flex w-[20%] items-center justify-center border-b-2 p-2"
            }
          >
            {booking.price}€
          </div>
          <div
            className={"absolute right-0 top-1/2 -translate-y-1/2 transform"}
          >
            <Minimenu />
          </div>
        </div>
      ))}
      <div className={"flex w-full flex-row items-center justify-center"}>
        <Link href={"/shop-bookings"}>
          <Button variant={"ghost"}>Load more</Button>
        </Link>
      </div>
    </div>
  );
}
