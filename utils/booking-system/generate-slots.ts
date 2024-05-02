export default function generateSlots(
  openingTime: string,
  closingTime: string,
  openOnDays: string[],
) {
  const interval = 30;
  const daysToGenerate = 7;
  const slotsWithDates = [];

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  for (let day = 0; day < daysToGenerate; day++) {
    const currentDate = new Date(Date.now() + day * 24 * 60 * 60 * 1000);
    const currentDayOfWeek = daysOfWeek[currentDate.getDay()];

    if (!openOnDays.includes(currentDayOfWeek)) {
      continue;
    }

    const daySlots = [];
    const dateStr = currentDate.toISOString().split("T")[0];

    let currentTime = new Date(currentDate.getTime());
    currentTime.setHours(
      parseInt(openingTime.split(":")[0], 10),
      parseInt(openingTime.split(":")[1], 10),
      0,
      0,
    );

    const closingDateTime = new Date(currentDate.getTime());
    closingDateTime.setHours(
      parseInt(closingTime.split(":")[0], 10),
      parseInt(closingTime.split(":")[1], 10),
      0,
      0,
    );

    while (
      new Date(currentTime.getTime() + interval * 60000) <= closingDateTime
    ) {
      const slotTime =
        currentTime.getHours().toString().padStart(2, "0") +
        ":" +
        currentTime.getMinutes().toString().padStart(2, "0");

      daySlots.push(`${dateStr} ${slotTime}`);
      currentTime = new Date(currentTime.getTime() + interval * 60000);
    }

    slotsWithDates.push(daySlots);
  }

  return slotsWithDates;
}
