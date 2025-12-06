import React, { type KeyboardEvent } from "react";
import type { CalendarEvent } from "./CalendarView.types";

export interface CalendarCellProps {
  date: Date;
  events: CalendarEvent[];
  isToday: boolean;
  isOtherMonth: boolean;
  onClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}

export const CalendarCell: React.FC<CalendarCellProps> = React.memo(
  ({ date, events, isToday, isOtherMonth, onClick, onEventClick }) => {
    const handleClick = () => onClick(date);

    const handleEventKeyDown = (e: KeyboardEvent<HTMLDivElement>, ev: CalendarEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onEventClick(ev);
      }
    };

    return (
      <div
        className={`border border-neutral-200 h-32 p-2 hover:bg-neutral-50 transition-colors cursor-pointer ${
          isOtherMonth ? "text-neutral-400 bg-neutral-50" : "text-neutral-900"
        }`}
        role="button"
        tabIndex={0}
        aria-label={`${date.toDateString()}, ${events.length} events`}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleClick();
        }}
      >
        {/* Date display */}
        <div className="flex justify-between items-start mb-1">
          <span className="text-sm font-medium">
            {isToday ? (
              <span className="w-6 h-6 bg-primary-500 rounded-full text-white text-xs flex items-center justify-center">
                {date.getDate()}
              </span>
            ) : (
              date.getDate()
            )}
          </span>
        </div>

        {/* Events */}
        <div className="space-y-1 overflow-hidden">
          {events.slice(0, 3).map((ev) => (
            <div
              key={ev.id}
              className="text-xs px-2 py-1 rounded truncate text-white"
              style={{ backgroundColor: ev.color ?? "#0ea5e9" }}
              onClick={(e) => {
                e.stopPropagation();
                onEventClick(ev);
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => handleEventKeyDown(e, ev)}
              aria-label={`${ev.title}, ${ev.category ?? ""}`}
            >
              {ev.title}
            </div>
          ))}

          {events.length > 3 && (
            <button
              className="text-xs text-primary-600 hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              +{events.length - 3} more
            </button>
          )}
        </div>
      </div>
    );
  }
);
