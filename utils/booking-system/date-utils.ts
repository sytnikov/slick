// dateUtils.ts

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export interface TimeSlotsGroup {
  [date: string]: string[];
}

// New function to generate and group time slots
export function groupTimeSlots(
  timeSlots: string[][],
  openingTime: string,
  closingTime: string,
): TimeSlotsGroup {
  return timeSlots.flat().reduce((acc: TimeSlotsGroup, slot) => {
    const [date, time] = slot.split(" ");
    const formattedDate = formatDate(date);
    if (!acc[formattedDate]) {
      acc[formattedDate] = [];
    }
    acc[formattedDate].push(time);
    return acc;
  }, {} as TimeSlotsGroup);
}
