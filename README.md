# Calendar View Component

## Live Storybook
[View Live Storybook](https://calendarviews.vercel.app)

## Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/yourusername/calendar-view-yourname.git
cd calendar-view-yourname
npm install
npm run dev        # Start development server
npm run storybook  # Start Storybook

### Architecture

The project is structured to follow scalable component design:
calendar-component/
├── src/
│   ├── components/
│   │   ├── Calendar/
│   │   │   ├── CalendarView.tsx
│   │   │   ├── MonthView.tsx
│   │   │   ├── WeekView.tsx
│   │   │   ├── CalendarCell.tsx
│   │   │   └── EventModal.tsx
│   │   └── primitives/  # Reusable components like Button, Modal
│   ├── hooks/
│   │   ├── useCalendar.ts
│   │   └── useEventManager.ts
│   └── utils/
│       ├── date.utils.ts
│       └── event.utils.ts
└── .storybook/       # Storybook configuration

## Features

 1. Month & Week views
 2. Event management (Add, Edit, Delete)
 3. Responsive design (Desktop, Tablet, Mobile)
 4. Keyboard accessibility
 5. Performance optimized for 500+ events
 6. Navigation controls (Prev/Next, Today, Month/Year picker)
 7. View toggle (Month ↔ Week)

## Storybook Stories

1. Default – Current month with sample events
2. Empty – Calendar with no events
3. Week View – Week layout with time slots
4. Large Dataset – 20+ event
5. Interactive Playground – Fully functional demo
6. Mobile View – Responsive demonstration
7. Accessibility – Keyboard navigation demonstration

## Technologies

1. React + TypeScript
2. Tailwind CSS
3. Vite / Next.js
4. Storybook
5. date-fns / dayjs (for date manipulation)
6. clsx / classnames (for conditional classes)
7. zustand / jotai (for state management)
8. Performance Optimizations
9. React.memo for expensive components

 ##Accessibility

Full keyboard navigation
Proper ARIA roles and labels
Visible focus indicators
Meets WCAG 2.1 AA standards
Known Limitations
Drag-to-create events is partially implemented (future improvement)
Advanced animations with Framer Motion not implemented
LocalStorage persistence for events not included
