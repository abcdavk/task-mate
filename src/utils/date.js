const pad = (n) => String(n).padStart(2, "0");

export function getTodayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function isToday(dateStr) {
  return dateStr === getTodayISO();
}