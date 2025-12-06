import React, { useEffect, useRef, useState, useCallback } from "react";
import type { CalendarEvent } from "./CalendarView.types";
import { formatISO } from "date-fns";

interface Props {
  open: boolean;
  initialDate?: Date | null;
  event?: CalendarEvent | null;
  onSave: (data: CalendarEvent) => void;
  onDelete?: (id: string) => void;
  onClose: () => void;
}

interface EventForm {
  title: string;
  description: string;
  start: string;
  end: string;
  color: string;
  category: string;
}

const COLORS = [
  "#0ea5e9",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
];

export const EventModal: React.FC<Props> = ({
  open,
  initialDate,
  event,
  onSave,
  onDelete,
  onClose,
}) => {
  const titleRef = useRef<HTMLInputElement | null>(null);

  const getInitialForm = useCallback((): EventForm => {
    const initial = event ?? {
      title: "",
      description: "",
      startDate: initialDate ?? new Date(),
      endDate: initialDate ?? new Date(),
      color: COLORS[0],
      category: "",
    };

    return {
      title: initial.title,
      description: initial.description ?? "",
      start: formatISO(initial.startDate).slice(0, 16),
      end: formatISO(initial.endDate).slice(0, 16),
      color: initial.color ?? COLORS[0],
      category: initial.category ?? "",
    };
  }, [event, initialDate]);

  const [form, setForm] = useState<EventForm>(() => getInitialForm());
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      setForm(getInitialForm());
      setErrors({});
      titleRef.current?.focus();
    }, 0);

    return () => clearTimeout(timer);
  }, [open, getInitialForm]);

  if (!open) return null;

  const handleChange = (field: keyof EventForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (form.title.length > 100) e.title = "Max 100 characters";
    if (!form.start) e.start = "Start required";
    if (!form.end) e.end = "End required";
    if (form.start && form.end && new Date(form.start) >= new Date(form.end))
      e.end = "End must be after start";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    const payload: CalendarEvent = {
      id:
        event?.id ??
        (typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `${Date.now()}`),

      title: form.title.trim(),
      description: form.description.trim() || undefined,
      startDate: new Date(form.start),
      endDate: new Date(form.end),
      color: form.color,
      category: form.category || undefined,
    };

    onSave(payload);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div
        className="relative bg-white rounded-lg p-6 w-full max-w-md shadow-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="modal-title" className="text-lg font-semibold mb-3">
          {event ? "Edit Event" : "Create Event"}
        </h2>

        <label className="block text-sm mb-2">
          <input
            ref={titleRef}
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Title"
            maxLength={100}
            className="border w-full px-3 py-2 rounded"
            aria-invalid={!!errors.title}
          />
          {errors.title && (
            <div className="text-xs text-red-600 mt-1">{errors.title}</div>
          )}
        </label>

        <label className="block text-sm mb-2">
          <textarea
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Description (optional)"
            rows={3}
            maxLength={500}
            className="border w-full px-3 py-2 rounded"
          />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="text-sm">
            <div className="text-xs text-neutral-600 mb-1">Start</div>
            <input
              type="datetime-local"
              value={form.start}
              onChange={(e) => handleChange("start", e.target.value)}
              className="border w-full px-2 py-2 rounded"
              aria-invalid={!!errors.start}
            />
            {errors.start && (
              <div className="text-xs text-red-600 mt-1">{errors.start}</div>
            )}
          </label>

          <label className="text-sm">
            <div className="text-xs text-neutral-600 mb-1">End</div>
            <input
              type="datetime-local"
              value={form.end}
              onChange={(e) => handleChange("end", e.target.value)}
              className="border w-full px-2 py-2 rounded"
              aria-invalid={!!errors.end}
            />
            {errors.end && (
              <div className="text-xs text-red-600 mt-1">{errors.end}</div>
            )}
          </label>
        </div>

        <div className="mt-3">
          <div className="text-xs text-neutral-600 mb-2">Color</div>
          <div className="flex gap-2">
            {COLORS.map((c) => (
              <button
                key={c}
                onClick={() => handleChange("color", c)}
                aria-pressed={form.color === c}
                className={`w-8 h-8 rounded-full border ${
                  form.color === c ? "ring-2 ring-offset-2 ring-primary-400" : ""
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>

        <label className="block mt-3 text-sm">
          <div className="text-xs text-neutral-600 mb-1">Category</div>
          <input
            value={form.category}
            onChange={(e) => handleChange("category", e.target.value)}
            placeholder="Category (optional)"
            className="border w-full px-2 py-2 rounded"
          />
        </label>

        <div className="mt-5 flex items-center gap-2">
          <button
            onClick={handleSave}
            className="bg-primary-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>

          <button onClick={onClose} className="px-3 py-2 rounded border">
            Cancel
          </button>

          {event && onDelete && (
            <button
              onClick={() => {
                onDelete(event.id);
                onClose();
              }}
              className="ml-auto text-sm text-red-600 px-3 py-2"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
