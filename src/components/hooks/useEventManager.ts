import { useEffect, useState } from "react";
import type { CalendarEvent } from "../Calendar/CalendarView.types";

const STORAGE_KEY = "calendar_events_v1";

type StoredEvent = Omit<CalendarEvent, "startDate" | "endDate"> & {
  startDate: string;
  endDate: string;
};

export const useEventManager = (initial: CalendarEvent[] = []) => {
  const [events, setEvents] = useState<CalendarEvent[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return initial;
      const parsed = JSON.parse(raw) as StoredEvent[];
      return parsed.map(p => ({
        ...p,
        startDate: new Date(p.startDate),
        endDate: new Date(p.endDate),
      }));
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }, [events]);

  const addEvent = (ev: CalendarEvent) => setEvents(s => [...s, ev]);
  const updateEvent = (id: string, updates: Partial<CalendarEvent>) =>
    setEvents(s => s.map(e => (e.id === id ? { ...e, ...updates } : e)));
  const deleteEvent = (id: string) =>
    setEvents(s => s.filter(e => e.id !== id));

  return { events, addEvent, updateEvent, deleteEvent, setEvents };
};
