import type { Meta, StoryObj } from "@storybook/react";
import { CalendarView } from "./CalendarView";
import type { CalendarEvent } from "./CalendarView.types";

const meta: Meta<typeof CalendarView> = {
  title: "Calendar/CalendarView",
  component: CalendarView,
};
export default meta;

const now = new Date();
const sampleEvents: CalendarEvent[] = [
  {
    id: "evt-1",
    title: "Team Standup",
    description: "Daily sync",
    startDate: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0),
    endDate: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 30),
    color: "#3b82f6",
    category: "Meeting",
  },
  {
    id: "evt-2",
    title: "Design Review",
    startDate: new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      14,
      0
    ),
    endDate: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15, 30),
    color: "#10b981",
    category: "Design",
  },
];

export const Default: StoryObj<typeof CalendarView> = {
  args: {
    events: sampleEvents,
    onEventAdd: () => {},
    onEventUpdate: () => {},
    onEventDelete: () => {},
  },
};
export const Empty: StoryObj<typeof CalendarView> = {
  args: {
    events: [],
    onEventAdd: () => {},
    onEventUpdate: () => {},
    onEventDelete: () => {},
  },
};

// Large dataset story
const many: CalendarEvent[] = [];
for (let i = 0; i < 25; i++) {
  const d = new Date(
    now.getFullYear(),
    now.getMonth(),
    (i % 28) + 1,
    9 + (i % 8),
    0
  );
  many.push({
    id: `evt-${i + 10}`,
    title: `Event ${i + 1}`,
    startDate: d,
    endDate: new Date(d.getTime() + 1000 * 60 * 60),
    color: ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"][i % 4],
  });
}
export const ManyEvents: StoryObj<typeof CalendarView> = {
  args: {
    events: many,
    onEventAdd: () => {},
    onEventUpdate: () => {},
    onEventDelete: () => {},
  },
};
