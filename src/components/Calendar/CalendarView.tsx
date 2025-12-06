import React, { useEffect, useState } from "react";
import type { CalendarViewProps, CalendarEvent } from "./CalendarView.types";
import { useCalendar } from "../hooks/useCalendar";
import { MonthView } from "./MonthView";
import { WeekView } from "./WeekView";
import { EventModal } from "./EventModal"; 
import { addMinutes } from "date-fns";

export const CalendarView: React.FC<CalendarViewProps> = ({
  events,
  onEventAdd,
  onEventUpdate,
  onEventDelete,
  initialView = "month",
  initialDate = new Date(),
}) => {
  const { currentDate, view, setView, nextMonth, previousMonth, goToToday } =
    useCalendar(initialDate);

  const [modalDate, setModalDate] = useState<Date | null>(null);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [focusedDate, setFocusedDate] = useState<Date | null>(null);

  useEffect(() => setView(initialView), [initialView, setView]);

  const handleModalSave = (payload: CalendarEvent) => {
    if (editingEvent) {
      onEventUpdate(editingEvent.id, payload);
      setEditingEvent(null);
    } else {
      onEventAdd(payload);
    }
    setModalDate(null);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!focusedDate) return;
      let next: Date | null = null;
      if (e.key === "ArrowLeft") next = addMinutes(focusedDate, -24 * 60);
      if (e.key === "ArrowRight") next = addMinutes(focusedDate, 24 * 60);
      if (e.key === "ArrowUp") next = addMinutes(focusedDate, -7 * 24 * 60);
      if (e.key === "ArrowDown") next = addMinutes(focusedDate, 7 * 24 * 60);
      if (next) {
        e.preventDefault();
        setFocusedDate(next);
      }
      if (e.key === "Enter") {
        const start = new Date(
          focusedDate.getFullYear(),
          focusedDate.getMonth(),
          focusedDate.getDate(),
          9,
          0
        );
        setModalDate(start);
        setEditingEvent(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [focusedDate]);

  return (
    <div>
      <header className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button onClick={previousMonth} className="px-3 py-1 border rounded">
            Prev
          </button>
          <button onClick={goToToday} className="px-3 py-1 border rounded">
            Today
          </button>
          <button onClick={nextMonth} className="px-3 py-1 border rounded">
            Next
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setView("month")}
            aria-pressed={view === "month"}
            className={`px-3 py-1 rounded ${
              view === "month" ? "bg-primary-600 text-white" : "border"
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setView("week")}
            aria-pressed={view === "week"}
            className={`px-3 py-1 rounded ${
              view === "week" ? "bg-primary-600 text-white" : "border"
            }`}
          >
            Week
          </button>
        </div>
      </header>

      <main>
        {view === "month" ? (
          <MonthView
            date={currentDate}
            events={events}
            onDayClick={(d) => {
              setModalDate(d);
              setEditingEvent(null);
            }}
            onEventClick={(ev) => {
              setEditingEvent(ev);
              setModalDate(ev.startDate);
            }}
            focusedDate={focusedDate}
            setFocusedDate={setFocusedDate}
            onDayKeyboardOpen={(d) => {
              setModalDate(d);
              setEditingEvent(null);
            }}
          />
        ) : (
          <WeekView
            date={currentDate}
            events={events}
            onTimeSlotSelect={(d) => {
              setModalDate(d);
              setEditingEvent(null);
            }}
            onEventClick={(ev) => {
              setEditingEvent(ev);
              setModalDate(ev.startDate);
            }}
          />
        )}
      </main>

      <EventModal
        open={!!modalDate}
        initialDate={modalDate ?? undefined}
        event={editingEvent ?? undefined}
        onSave={handleModalSave}
        onDelete={(id) => onEventDelete(id)}
        onClose={() => {
          setModalDate(null);
          setEditingEvent(null);
        }}
      />
    </div>
  );
};
