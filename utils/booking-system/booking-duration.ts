export default function calculateBookingEnd(
  booking_start_date: Date,
  duration: number
) {
  console.log(
    "BOOKING START DATE FOR CURRENT END DATE",
    booking_start_date.toISOString()
  );

  // Add duration to the booking start date to get the end date
  const booking_end_date = new Date(
    booking_start_date.getTime() + duration * 60000
  );

  console.log(
    "BOOKING END DATE FOR CURRENT END DATE",
    booking_end_date.toISOString()
  );
  return booking_end_date;
}
