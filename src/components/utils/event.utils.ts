import { differenceInMinutes } from "date-fns";
import type { CalendarEvent } from "../Calendar/CalendarView.types";

export interface PositionedEvent extends CalendarEvent {
  top: number;
  height: number;
  leftPercent: number;
  widthPercent: number;
}

export function computeEventLayoutForDay(
  events: CalendarEvent[],
  dayStart: Date,
  pxPerMinute = 0.8
) {
  if (!events.length) return [];

  pxPerMinute = Math.max(pxPerMinute, 0.1);

  const sorted = [...events].sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

  const clusters: CalendarEvent[][] = [];
  sorted.forEach(ev => {
    let placed = false;
    for (const cluster of clusters) {
      const clusterEnd = cluster.reduce((m, e) => Math.max(m, e.endDate.getTime()), 0);
      if (ev.startDate.getTime() < clusterEnd) {
        cluster.push(ev);
        placed = true;
        break;
      }
    }
    if (!placed) clusters.push([ev]);
  });

  const placements: { ev: CalendarEvent; col: number; cols: number }[] = [];
  clusters.forEach(cluster => {
    const colsEnd: number[] = [];
    for (const ev of cluster) {
      const colIdx = colsEnd.findIndex(end => end <= ev.startDate.getTime());
      if (colIdx === -1) {
        colsEnd.push(ev.endDate.getTime());
        placements.push({ ev, col: colsEnd.length - 1, cols: colsEnd.length });
      } else {
        colsEnd[colIdx] = Math.max(colsEnd[colIdx], ev.endDate.getTime());
        placements.push({ ev, col: colIdx, cols: colsEnd.length });
      }
    }
    const maxCols = Math.max(
      1,
      ...placements.filter(p => cluster.includes(p.ev)).map(p => p.cols)
    );
    placements.forEach(p => { if (cluster.includes(p.ev)) p.cols = maxCols; });
  });

  return placements.map(({ ev, col, cols }) => {
    const top = Math.max(0, differenceInMinutes(ev.startDate, dayStart) * pxPerMinute);
    const height = Math.max(30, differenceInMinutes(ev.endDate, ev.startDate) * pxPerMinute);
    const widthPercent = 100 / cols;
    const leftPercent = col * widthPercent;
    return { ...ev, top, height, leftPercent, widthPercent } as PositionedEvent;
  });
}
