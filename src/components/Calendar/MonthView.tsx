import React, { useMemo, type KeyboardEvent } from "react";
import { getCalendarGrid, isSameDay } from "../utils/date.utils";
import type { CalendarEvent } from "./CalendarView.types";
import { CalendarCell } from "./CalendarCell";

export interface MonthViewProps {
  date: Date;
  events: CalendarEvent[];
  onDayClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
  focusedDate?: Date | null;
  setFocusedDate?: (date: Date) => void;
  onDayKeyboardOpen?: (date: Date) => void;
}

export const MonthView: React.FC<MonthViewProps> = ({
  date,
  events,
  onDayClick,
  onEventClick,
  focusedDate,
  setFocusedDate,
  onDayKeyboardOpen,
}) => {
  const grid = useMemo(() => getCalendarGrid(date), [date]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>, d: Date) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onDayKeyboardOpen?.(d);
    }
  };

  return (
    <div className="select-none">
      <div className="grid grid-cols-7 text-xs text-neutral-500 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center font-medium">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-px bg-neutral-200">
        {grid.map((d) => {
          const dayEvents = events.filter((ev) => isSameDay(ev.startDate, d));
          const isOtherMonth = d.getMonth() !== date.getMonth();
          const isToday = isSameDay(new Date(), d);
          const isFocused = focusedDate ? isSameDay(focusedDate, d) : false;

          return (
            <div
              key={d.toISOString()}
              className={`bg-white border border-neutral-200 ${
                isFocused ? "ring-2 ring-offset-1 ring-primary-300" : ""
              }`}
            >
              <CalendarCell
                date={d}
                events={dayEvents}
                isToday={isToday}
                isOtherMonth={isOtherMonth}
                onClick={onDayClick}
                onEventClick={onEventClick}
              />

              <div
                tabIndex={0}
                role="button"
                aria-label={`${d.toLocaleDateString(undefined, {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}, ${dayEvents.length} events`}
                onFocus={() => setFocusedDate?.(d)}
                onKeyDown={(e) => handleKeyDown(e, d)}
                className="sr-only"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
