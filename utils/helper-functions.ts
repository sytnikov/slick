export const getNextWeekDates = () => {
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    dates.push(date);
  }
  return dates;
};

export const generateTimeSlots = (openingTime: string, closingTime: string) => {
  const interval = 30; // Interval in minutes
  const timeSlots = [];
  const [openHours, openMinutes] = openingTime.split(":");
  const [closeHours, closeMinutes] = closingTime.split(":");

  let currentTime = new Date();
  currentTime.setHours(Number(openHours), Number(openMinutes), 0, 0);

  const closingTimeDate = new Date(currentTime);
  closingTimeDate.setHours(Number(closeHours), Number(closeMinutes), 0, 0);

  while (currentTime < closingTimeDate) {
    // Manually format the time to avoid timezone issues
    const hours = currentTime.getHours().toString().padStart(2, "0");
    const minutes = currentTime.getMinutes().toString().padStart(2, "0");
    const formattedTime = `${hours}:${minutes}`;
    timeSlots.push(formattedTime);

    currentTime = new Date(currentTime.getTime() + interval * 60000);
  }

  return timeSlots;
};
