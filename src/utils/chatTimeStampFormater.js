export const formatChatTimestamp = (dateStr) => {
  if (!dateStr) return { time: "", date: "" };

  // 1. Regex to extract parts from "31/12/2025, 10:07 pm"
  const regex = /(\d{2})\/(\d{2})\/(\d{4}), (\d{2}):(\d{2}) (am|pm)/i;
  const match = dateStr.match(regex);

  if (!match) return { time: dateStr, date: "" };

  const [_, day, month, year, hour, minute, ampm] = match;
  const timePart = `${hour}:${minute} ${ampm.toLowerCase()}`;

  // 2. Create Date objects
  const inputDate = new Date(year, month - 1, day);
  const now = new Date();

  // Normalize dates to midnight for accurate day-by-day comparison
  const inputDateMidnight = new Date(year, month - 1, day).setHours(0, 0, 0, 0);
  const todayMidnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  ).getTime();
  const yesterdayMidnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 1
  ).getTime();

  // 3. Logic for Date Value
  let dateValue = "";

  if (inputDateMidnight === todayMidnight) {
    dateValue = "today";
  } else if (inputDateMidnight === yesterdayMidnight) {
    dateValue = "yesterday";
  } else if (inputDate.getFullYear() === now.getFullYear()) {
    // Within this year: "30 Dec"
    dateValue = new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
    }).format(inputDate);
  } else {
    // Not within this year: "30 Dec, 24"
    const dayMonth = new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
    }).format(inputDate);
    const shortYear = year.toString().slice(-2);
    dateValue = `${dayMonth}, ${shortYear}`;
  }

  return {
    time: timePart,
    date: dateValue,
  };
};
