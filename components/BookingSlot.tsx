import Link from "next/link";

interface BookingSlotProps {
  time: string;
  serviceId: number;
}
export default function BookingSlot({ time, serviceId }: BookingSlotProps) {
  return (
    <Link
      href={`/booking-confirmation?service=${serviceId}&time=${time}`}
      className={"p-4 border-2"}
    >
      <h1>{time}</h1>
    </Link>
  );
}
