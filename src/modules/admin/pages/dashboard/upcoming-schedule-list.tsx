import UpcomingScheduleCard from './upcoming-schedule-card'

const scheduleItems = [
    {
        title: "Graduación de la promoción 2024",
        time: "Hoy - 10:30 AM",
        priority: true,
    },
    {
        title: "Sustentación de tesis de H. Montes",
        time: "Hoy - 02:00 PM",
        priority: false,
    },
    {
        title: "Sustentación de tesis de J. Pérez",
        time: "Hoy - 09:15 AM",
        priority: false,
    },
]

export default function UpcomingScheduleList() {
    return (
        <>
            <UpcomingScheduleCard scheduleItems={scheduleItems} />
        </>
    )
}
