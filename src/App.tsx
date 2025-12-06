import React from "react";
import { CalendarView } from "./components/Calendar/CalendarView";
import { useEventManager } from "./components/hooks/useEventManager";
import "./components/styles/globals.css";

const App: React.FC = () => {
  const { events, addEvent, updateEvent, deleteEvent } = useEventManager();

  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <div className="max-w-6xl mx-auto bg-white p-4 rounded shadow">
        <CalendarView
          events={events}
          onEventAdd={addEvent}
          onEventUpdate={updateEvent}
          onEventDelete={deleteEvent}
        />
      </div>
    </div>
  );
};

export default App;