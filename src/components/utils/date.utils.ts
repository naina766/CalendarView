import { addDays, startOfMonth, startOfWeek } from "date-fns";

export const getCalendarGrid = (date: Date): Date[] => {
  const first = startOfMonth(date);
  const start = startOfWeek(first, { weekStartsOn: 0 }); // Sunday start
  const grid: Date[] = [];
  for (let i = 0; i < 42; i++) {
    grid.push(addDays(start, i));
  }
  return grid;
};

export const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();
