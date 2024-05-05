import { BookingWithDetails } from "@/types";

export default function getBookingsEndTimes(
  shopBookings: BookingWithDetails[],
): Date[] {
  return shopBookings.map((booking) => {
    const startTime = new Date(booking.booking_start_date);
    const endTime = new Date(
      startTime.getTime() + booking.shop_service_id.duration * 60 * 1000,
    );
    return endTime;
  });
}
