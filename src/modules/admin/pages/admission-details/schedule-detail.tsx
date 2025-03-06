'use client'

// import { useState } from 'react'
// import { CalendarApi } from "@fullcalendar/core/index.js";
// import { Header } from '@/components/calendar/calendar-controls'
// import { CalendarView } from '@/components/calendar/calendar'
// import { events, months } from '@/data/calendar-data'
// import FullCalendar from "@fullcalendar/react";

export const ScheduleCalendar = () => {
  //   const [view, setView] = useState('dayGridMonth')
  //   const [currentRange, setCurrentRange] = useState('')
  //   const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  // const calendarRef = useRef<FullCalendar>(null);

  //   const useUpdateCurrentRange =
  //     (
  //       setCurrentRange: {
  //         (value: SetStateAction<string>): void
  //         (arg0: string): void
  //       },
  //       setSelectedMonth: {
  //         (value: SetStateAction<number>): void
  //         (arg0: number): void
  //       }
  //     ) =>
  //     (calendarApi: CalendarApi | undefined) => {
  //       if (!calendarApi) return

  //       const view = calendarApi.view
  //       const start = new Date(view.currentStart)
  //       const end = new Date(view.currentEnd)

  //       if (view.type === 'dayGridMonth') {
  //         setCurrentRange(
  //           start.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })
  //         )
  //         setSelectedMonth(start.getMonth())
  //       } else if (view.type === 'timeGridWeek') {
  //         const startFormatted = start.toLocaleDateString('es-ES', {
  //           day: 'numeric',
  //           month: 'short',
  //         })
  //         const endFormatted = end.toLocaleDateString('es-ES', {
  //           day: 'numeric',
  //           month: 'short',
  //         })
  //         setCurrentRange(`${startFormatted} - ${endFormatted}`)
  //       } else if (view.type === 'timeGridDay') {
  //         setCurrentRange(
  //           start.toLocaleDateString('es-ES', {
  //             weekday: 'long',
  //             day: 'numeric',
  //             month: 'long',
  //           })
  //         )
  //       }
  //     }

  //   const updateCurrentRange = useUpdateCurrentRange(
  //     setCurrentRange,
  //     setSelectedMonth
  //   )

  return (
    <>
      {/* <Header
        currentRange={currentRange}
        view={view}
        selectedMonth={selectedMonth}
        setView={setView}
        setSelectedMonth={setSelectedMonth}
        calendarRef={calendarRef}
        months={months}
        updateCurrentRange={updateCurrentRange}
      />
      <CalendarView
        view={view}
        calendarRef={calendarRef}
        events={events}
        updateCurrentRange={updateCurrentRange}
      /> */}
    </>
  )
}
