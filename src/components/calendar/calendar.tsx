'use client'

// import FullCalendar from "@fullcalendar/react";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import rrulePlugin from "@fullcalendar/rrule";
// import { CalendarApi, EventInput } from "@fullcalendar/core/index.js";

interface CalendarViewProps {
  view: string
  //   calendarRef: React.RefObject<FullCalendar>
  //   events: EventInput[]
  //   updateCurrentRange: (calendarApi: CalendarApi | undefined) => void
}

export const CalendarView = ({}: //   view,
//   calendarRef,
//   events,
//   updateCurrentRange,
CalendarViewProps) => (
  <>
    {/* <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, rrulePlugin]}
        initialView={view}
        events={events}
        height="auto"
        dayHeaderFormat={{ weekday: "narrow" }}
        headerToolbar={false}
        locale="es"
        titleFormat={{ year: "numeric", month: "long" }}
        slotMinTime="18:00:00"
        slotMaxTime="20:00:00"
        slotDuration="01:00:00"
        allDaySlot={false}
        dayHeaderClassNames="text-xs"
        datesSet={() => {
            const calendarApi = calendarRef.current?.getApi();
            updateCurrentRange(calendarApi);
        }}
    /> */}
  </>
)
