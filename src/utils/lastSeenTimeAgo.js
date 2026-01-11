// utils/timeAgo.js
//* function to calculate the last time difference from time format , like :- last seen:8.45 pm to 10 minutes ago
export const getFormattedLastSeen = (lastSeen) => {
  if (!lastSeen) return "Never";

  const lastSeenDate = new Date(lastSeen);
  const now = new Date();

  // Calculate midnight-based day difference
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
  const startOfLastSeen = new Date(
    lastSeenDate.getFullYear(),
    lastSeenDate.getMonth(),
    lastSeenDate.getDate()
  );
  const diffInDays = Math.round(
    (startOfToday - startOfLastSeen) / (1000 * 60 * 60 * 24)
  );

  // 1. TODAY: Show "5 minutes ago" or "2 hours ago" format
  if (diffInDays === 0) {
    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
    const secondsAgo = Math.round((lastSeenDate - now) / 1000);

    if (Math.abs(secondsAgo) < 60) return "just now";

    const minutesAgo = Math.round(secondsAgo / 60);
    if (Math.abs(minutesAgo) < 60) return rtf.format(minutesAgo, "minute");

    const hoursAgo = Math.round(minutesAgo / 60);
    return rtf.format(hoursAgo, "hour");
  }

  // 2. YESTERDAY: Show "2.37 pm, yesterday" format
  if (diffInDays === 1) {
    const timeString = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
      .format(lastSeenDate)
      .toLowerCase();

    return `${timeString}, yesterday`;
  }

  // 3. MORE THAN A YEAR AGO: Show "24 Oct, 24" format
  if (lastSeenDate.getFullYear() < now.getFullYear()) {
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "2-digit", // Shows '24' instead of '2024'
    })
      .format(lastSeenDate)
      .replace(/ /g, " "); // Standardizing spaces
  }

  // 4. THIS YEAR (but more than 1 day ago): Show "9.29.pm, 24 Oct" format
  return new Intl.DateTimeFormat("en-GB", {
    hour12: true,
    month: "short",
    hour: "numeric",
    day: "numeric",
    minute: "2-digit",
  })
    .format(lastSeenDate)
    .split(",")
    .reverse()
    .join(", ");
};
