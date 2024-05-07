import { addDays } from "date-fns";
import { formatInTimeZone, toZonedTime } from "date-fns-tz";

import { upcomingShopWorkWeek } from "./date-utils";
import { BookingWithDetails, RepairShop } from "@/types";

export default function generateSlots(
  existingBookings: BookingWithDetails[],
  shop: RepairShop,
) {
  const slotInterval = 30 * 60 * 1000; // 30 minutes in milliseconds
  const timeZone = "Europe/Helsinki";
  const dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSxxx";
  const numberOfEmployees = shop.number_of_employees;
  const bookingBuffer = shop.booking_buffer; // Number of days to buffer against new bookings

  // Filter out days that are within the booking buffer period
  const now = new Date();
  const bufferedDate = addDays(now, bookingBuffer);
  const daysToGenerate = upcomingShopWorkWeek(shop).filter((day) => {
    const dayDate = new Date(day.date);
    return dayDate >= bufferedDate;
  });

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

    for (let i = opening.getTime(); i < closing.getTime(); i += slotInterval) {
      const slot = new Date(i);
      const slotTime = formatInTimeZone(slot, timeZone, dateFormat);

      const overlapCount = bookingIntervals.reduce((count, interval) => {
        if (i >= interval.start && i < interval.end) {
          return count + 1;
        }
        return count;
      }, 0);

      const isBooked = overlapCount >= numberOfEmployees;
      slots.push({
        time: slotTime,
        booked: isBooked,
      });
    }

    return slots;
  });

  return slots;
}
