import { RepairShop } from "@/types";
import { format, getDay, parseISO, subMonths } from "date-fns";

export const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// fornmat timestamp to day of the week, day of the month and month, ie. Monday, 15th March

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

// format a timestamp to a time string, ie. Monday, 15.3.2024 12:00

export function formatTimeStampToTime(timestamp: string) {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export interface TimeSlotsGroup {
  [date: string]: string[];
}

// format a timsstamp to a date string, ie. Monday, 15th March 2024

export function formatTimestampToDate(timestamp: string) {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function generatePast12Months() {
  const now = new Date();
  const months = [];

  for (let i = 11; i >= 0; i--) {
    const month = subMonths(now, i);
    months.push(format(month, "MMMM yyyy"));
  }

  // the only reason for reversing the array is to display the months in the correct order
  return months.reverse();
}

export function upcomingShopWorkWeek(
  shop: RepairShop,
): { date: string; openingTime: string; closingTime: string }[] {
  const days = [];
  const openingTime = shop.opening_time;
  const closingTime = shop.closing_time;
  const daysToGenerate = shop.days_in_calendar;

  for (let i = 0; i < daysToGenerate; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    days.push(format(date, "yyyy-MM-dd"));
  }

  const daysClosed: string[] = shop.days_closed
    ? shop.days_closed.split(",")
    : [];

  const openDays = days
    .filter((day) => {
      const date = parseISO(day);
      const dayOfWeek = daysOfWeek[getDay(date)];
      return !daysClosed.includes(dayOfWeek);
    })
    .map((day) => {
      return {
        date: `${day}T${openingTime}`,
        openingTime: `${day}T${openingTime}`,
        closingTime: `${day}T${closingTime}`,
      };
    });

  return openDays;
}

export default function calculateBookingEndDate(
  startDate: string,
  duration: number,
) {
  const start = new Date(startDate);

  const end = new Date(start.getTime() + duration * 60000);

  const timeZoneOffset = start.getTimezoneOffset() * 60000;
  const localTime = new Date(end.getTime() - timeZoneOffset).toISOString();

  return localTime.replace("Z", "");
}
