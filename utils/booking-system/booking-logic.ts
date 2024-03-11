export const getNextWeekDates = () => {
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    dates.push(date);
  }
  return dates;
};

/**
 * TODO: We need to make the following improvements to the booking system:
 * 1. We need to change the booking table to have a start and end time for the booking, the duration is what we will use to calculate the end time...
 * 2. We need to add how many employees are at a repair shop...we can call them seats, this will allow for multiple bookings at the same time...
 * 3. We need to do a major cleanup of the make booking modal, it is a mess...
 * 4. Let's combine the getNextWeekDates and generateTimeSlots functions into a single function that takes the opening and closing times, the bookings, and the number of seats as arguments...
 */

export const generateTimeSlots = (
  openingTime: string,
  closingTime: string,
  bookings: any[],
  targetDate: Date, // this might be dumb...double check this...
  seats: number
) => {
  const interval = 30;
  const timeSlots = [];
  const [openHours, openMinutes] = openingTime.split(":");
  const [closeHours, closeMinutes] = closingTime.split(":");

  let slotDate = new Date(targetDate);

  slotDate.setHours(Number(openHours), Number(openMinutes), 0, 0);
  let currentTime = new Date(slotDate.getTime());

  const closingTimeDate = new Date(slotDate.getTime());
  closingTimeDate.setHours(Number(closeHours), Number(closeMinutes), 0, 0);

  const bookingTimes = bookings.map((booking) => {
    const startDate = new Date(booking.booking_date);
    const endDate = new Date(startDate.getTime() + booking.duration * 60000);
    return { start: startDate, end: endDate };
  });

  while (currentTime < closingTimeDate) {
    const slotStartTime = new Date(currentTime.getTime());
    const slotEndTime = new Date(currentTime.getTime() + interval * 60000);

    const formattedTime = `${slotStartTime
      .getHours()
      .toString()
      .padStart(2, "0")}:${slotStartTime
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    const isBooked = bookingTimes.some(
      ({ start, end }) =>
        slotStartTime < end &&
        slotEndTime > start &&
        slotStartTime.toDateString() === start.toDateString()
    );

    timeSlots.push({ time: formattedTime, isBooked });

    currentTime = new Date(currentTime.getTime() + interval * 60000);
  }

  return timeSlots;
};
