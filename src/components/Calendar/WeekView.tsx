import React, { useMemo, useState, type KeyboardEvent } from "react";
import { isSameDay } from "../utils/date.utils";
import type { CalendarEvent } from "./CalendarView.types";

export interface WeekViewProps {
  date: Date; 
  events: CalendarEvent[];
  onTimeSlotSelect: (time: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}

export const WeekView: React.FC<WeekViewProps> = ({
  date,
  events,
  onTimeSlotSelect,
  onEventClick,
}) => {
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(date);
      d.setDate(d.getDate() + i);
      return d;
    });
  }, [date]);

  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-8 border-b border-neutral-300">
        <div className="p-2 text-sm font-medium text-neutral-500">Time</div>
        {weekDays.map((day) => (
          <div
            key={day.toDateString()}
            className="p-2 text-sm font-medium text-center text-neutral-500"
          >
            {day.toLocaleDateString("en-US", { weekday: "short", day: "numeric" })}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-8">
        <div className="flex flex-col border-r border-neutral-300">
          {hours.map((hour) => (
            <div
              key={hour}
              className="h-12 border-b border-neutral-200 text-xs text-neutral-500 flex items-center justify-end pr-1"
            >
              {hour.toString().padStart(2, "0")}:00
            </div>
          ))}
        </div>

        {weekDays.map((day) => (
          <div key={day.toDateString()} className="border-r border-neutral-200 flex flex-col">
            {hours.map((hour) => {
              const slotTime = new Date(day);
              slotTime.setHours(hour, 0, 0, 0);

              const slotEvents = events.filter(
                (ev) => isSameDay(ev.startDate, day) && ev.startDate.getHours() === hour
              );

              return (
                <div
                  key={hour}
                  className={`h-12 border-b border-neutral-200 cursor-pointer relative px-1 ${
                    selectedTime?.getTime() === slotTime.getTime() ? "bg-primary-100" : ""
                  }`}
                  tabIndex={0}
                  role="button"
                  aria-label={`Time slot ${slotTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`}
                  onClick={() => {
                    setSelectedTime(slotTime);
                    onTimeSlotSelect(slotTime);
                  }}
                  onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setSelectedTime(slotTime);
                      onTimeSlotSelect(slotTime);
                    }
                  }}
                >
                  {slotEvents.map((ev) => (
                    <div
                      key={ev.id}
                      className="absolute top-1 left-1 right-1 px-1 py-0.5 text-xs rounded text-white truncate"
                      style={{ backgroundColor: ev.color ?? "#0ea5e9" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick(ev);
                      }}
                      role="button"
                      tabIndex={0}
                    >
                      {ev.title}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
