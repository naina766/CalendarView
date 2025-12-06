import type { Meta, StoryObj } from "@storybook/react";
import { EventModal } from "./EventModal";
import type { CalendarEvent } from "./CalendarView.types";

const meta: Meta<typeof EventModal> = {
  title: "Calendar/EventModal",
  component: EventModal,
};
export default meta;

const now = new Date();

const sampleEvent: CalendarEvent = {
  id: "evt-1",
  title: "Team Standup",
  description: "Daily sync meeting",
  startDate: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0),
  endDate: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 30),
  color: "#3b82f6",
  category: "Meeting",
};

export const CreateMode: StoryObj<typeof EventModal> = {
  args: {
    open: true,
    initialDate: now,
    onSave: (data) => console.log("Saved event:", data),
    onClose: () => console.log("Modal closed"),
  },
};

export const EditMode: StoryObj<typeof EventModal> = {
  args: {
    open: true,
    event: sampleEvent,
    onSave: (data) => console.log("Saved event:", data),
    onDelete: (id) => console.log("Deleted event ID:", id),
    onClose: () => console.log("Modal closed"),
  },
};
