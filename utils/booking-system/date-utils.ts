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

// convert to timstamp

export function formatDateTime(input: string) {
  // Example input: "Saturday, April 20 13:00"
  const months = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
  };

  // Extract the parts of the date
  const parts = input.match(/(\w+), (\w+) (\d+) (\d+):(\d+)/);
  if (!parts) {
    throw new Error("Invalid date format");
  }

  // Extract components from the matched parts
  const [, , month, day, hours, minutes] = parts;

  // Get the current year from the system
  const currentYear = new Date().getFullYear();

  // Create a Date object
  const date = new Date(
    //@ts-ignore
    Date.UTC(currentYear, months[month], day, hours, minutes),
  );

  // Format to ISO string and adjust to desired format
  // "2024-03-15T09:00:00Z" to "2024-03-15 09:00:00+00"
  const isoString = date.toISOString(); // "YYYY-MM-DDTHH:mm:ss.sssZ"
  const formattedDate = isoString.replace("T", " ").slice(0, 19) + "+00";

  return formattedDate;
}

// Example usage
const dateString = "Saturday, April 20 13:00";
const formattedDate = formatDateTime(dateString);
console.log(formattedDate); // Outputs: "2024-04-20 13:00:00+00" (assuming the current year is 2024)
