import { useCallback, useState } from "react";

export const useCalendar = (initialDate: Date = new Date()) => {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [view, setView] = useState<"month" | "week">("month");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const nextMonth = useCallback(
    () =>
      setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)),
    []
  );

  const previousMonth = useCallback(
    () =>
      setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)),
    []
  );

  const goToToday = useCallback(() => setCurrentDate(new Date()), []);

  return {
    currentDate,
    view,
    setView,
    selectedDate,
    setSelectedDate,
    nextMonth,
    previousMonth,
    goToToday,
  };
};
