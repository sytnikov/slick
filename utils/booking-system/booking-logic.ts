import { Booking } from "@/types";

export const getTimeSlotsAndBookingsForRepairShop = (
  intendedBookingDate: Date,
  openingTime: string,
  closingTime: string,
  bookings: Booking[],
  seats: number
) => {
  const interval = 30;
  const daysToGenerate = 7;
  const weeklyTimeSlots = [];

  for (let day = 0; day < daysToGenerate; day++) {
    const daySlots = [];
    const currentDate = new Date(
      Date.UTC(
        intendedBookingDate.getUTCFullYear(),
        intendedBookingDate.getUTCMonth(),
        intendedBookingDate.getUTCDate() + day
      )
    );

    let currentTime = new Date(currentDate.getTime());
    currentTime.setUTCHours(
      parseInt(openingTime.split(":")[0]),
      parseInt(openingTime.split(":")[1]),
      0,
      0
    );

    const closingDateTime = new Date(currentDate.getTime());
    closingDateTime.setUTCHours(
      parseInt(closingTime.split(":")[0]),
      parseInt(closingTime.split(":")[1]),
      0,
      0
    );

    while (
      new Date(currentTime.getTime() + interval * 60000) <= closingDateTime
    ) {
      const slotTime =
        currentTime.getUTCHours().toString().padStart(2, "0") +
        ":" +
        currentTime.getUTCMinutes().toString().padStart(2, "0");

      const overlappingBookings = bookings.filter((booking) => {
        const bookingStartDate = new Date(booking.booking_start_date);
        const bookingEndDate = new Date(booking.booking_end_date);

        // Checking overlap considering the slots and bookings are in UTC
        return (
          booking.shop_id === booking.shop_id &&
          currentDate.getUTCDate() === bookingStartDate.getUTCDate() &&
          currentTime < bookingEndDate &&
          new Date(currentTime.getTime() + interval * 60000) > bookingStartDate
        );
      });

      const isAvailable = overlappingBookings.length < seats;
      daySlots.push({ slotTime, isAvailable });

      currentTime.setUTCMinutes(currentTime.getUTCMinutes() + interval);
    }

    weeklyTimeSlots.push({
      date: currentDate.toISOString().split("T")[0], // Use UTC date for consistency
      slots: daySlots,
    });
  }

  // console.log(JSON.stringify(weeklyTimeSlots, null, 2));
  return weeklyTimeSlots;
};
