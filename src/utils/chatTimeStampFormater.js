export const formatChatTimestamp = (dateStr) => {
  if (!dateStr) return { time: "", date: "" };

  // 1. Regex to extract parts from "31/12/2025, 10:07 pm"
  const regex = /(\d{2})\/(\d{2})\/(\d{4}), (\d{2}):(\d{2}) (am|pm)/i;
  const match = dateStr.match(regex);

  // If the format doesn't match, return the input as time for safety
  if (!match) return { time: dateStr, date: "" };

  const [_, day, month, year, hour, minute, ampm] = match;

  // 2. Create Date objects for comparison
  const inputDate = new Date(year, month - 1, day);
  const now = new Date();

  // 3. Check if the message was sent today
  const isToday =
    inputDate.getDate() === now.getDate() &&
    inputDate.getMonth() === now.getMonth() &&
    inputDate.getFullYear() === now.getFullYear();

  // 4. Always format the time part
  const timePart = `${hour}:${minute} ${ampm.toLowerCase()}`;

  if (isToday) {
    // If today, date is null so it won't trigger a new line in UI
    return { time: timePart, date: null };
  } else {
    // 5. If not today, format "30 Dec, 25"
    const dayMonth = new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
    }).format(inputDate);

    const shortYear = year.toString().slice(-2);

    return {
      time: timePart,
      date: `${dayMonth}, ${shortYear}`,
    };
  }
};
