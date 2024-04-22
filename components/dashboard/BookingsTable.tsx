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

import { RepairShopBooking } from "@/types";
import Link from "next/link";
import { formatDate } from "@/utils/booking-system/date-utils";

interface BookingsTableProps {
  bookings: RepairShopBooking[];
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

export default function BookingsTable({ bookings }: BookingsTableProps) {
  return (
    <div className={"flex-grow rounded-md bg-white pb-6 pl-10 pr-10 pt-10"}>
      <div className={"mb-4 flex w-full flex-row items-center justify-between"}>
        <p className={"text-xl font-bold"}>Incoming bookings</p>
        <Link href={"/shop-bookings"}>
          <Button variant={"secondary"}>See all bookings</Button>
        </Link>
      </div>
      {bookings.map((booking) => (
        <div
          key={booking.id}
          className={
            "mb-4 flex w-full flex-row items-center justify-between gap-12 border-2 p-2"
          }
        >
          <p className={"text-md"}>{booking.id}</p>
          <p className={"text-md"}>{formatDate(booking.booking_date)}</p>
          <p className={"text-md"}>{booking.customer_name}</p>
          <p className={"text-md"}>{booking.service_booked}</p>
          <Minimenu />
        </div>
      ))}
      <div className={"flex w-full flex-row items-center justify-center"}>
        <Button variant={"ghost"}>Load more</Button>
      </div>
    </div>
  );
}
