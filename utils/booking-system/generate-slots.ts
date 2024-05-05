import { formatInTimeZone, toZonedTime } from "date-fns-tz";
import { BookingWithDetails, RepairShop } from "@/types";
import { upcomingShopWorkWeek } from "./date-utils";

export default function generateSlots(
  existingBookings: BookingWithDetails[],
  shop: RepairShop,
) {
  const slotInterval = 30;
  const daysToGenerate = upcomingShopWorkWeek(shop);
  const timeZone = "Europe/Helsinki";
  const dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSxxx";

  const bookingIntervals = existingBookings.map((booking) => {
    const start = toZonedTime(new Date(booking.booking_start_date), timeZone);
    const end = toZonedTime(new Date(booking.booking_end_date), timeZone);
    return {
      start: start.getTime(),
      end: end.getTime(),
    };
  });

  const slots = daysToGenerate.map((day) => {
    const slots = [];
    const openingHour = parseInt(shop.opening_time.slice(0, 2), 10);
    const openingMinute = parseInt(shop.opening_time.slice(3, 5), 10);
    const closingHour = parseInt(shop.closing_time.slice(0, 2), 10);
    const closingMinute = parseInt(shop.closing_time.slice(3, 5), 10);

    const opening = new Date(day.date);
    opening.setHours(openingHour, openingMinute, 0, 0);
    const closing = new Date(day.date);
    closing.setHours(closingHour, closingMinute, 0, 0);

    for (
      let i = opening.getTime();
      i < closing.getTime();
      i += slotInterval * 60 * 1000
    ) {
      const slot = new Date(i);
      const slotTime = formatInTimeZone(slot, timeZone, dateFormat);

      // Check if the slot is booked
      const isBooked = bookingIntervals.some(
        (interval) => i >= interval.start && i < interval.end,
      );
      slots.push({
        time: slotTime,
        booked: isBooked,
      });
    }

    return slots;
  });

  return slots;
}
