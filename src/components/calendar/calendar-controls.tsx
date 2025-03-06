'use client';

import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Calendar1, CalendarDays, CalendarRange } from "lucide-react";
// import { CalendarApi } from "@fullcalendar/core/index.js";
// import FullCalendar from "@fullcalendar/react";

interface HeaderProps {
    currentRange: string;
    view: string;
    selectedMonth: number;
    setView: (view: string) => void;
    setSelectedMonth: (month: number) => void;
    // calendarRef: React.RefObject<FullCalendar>;
    months: string[];
    // updateCurrentRange: (calendarApi: CalendarApi | undefined) => void;
}

export const Header = ({
    currentRange,
    view,
    selectedMonth,
    setView,
    setSelectedMonth,
    // calendarRef,
    months,
    // updateCurrentRange,
}
    : HeaderProps
) => {
    const handlePrev = () => {
        // const calendarApi = calendarRef.current?.getApi();
        // calendarApi?.prev();
        // updateCurrentRange(calendarApi);
    };

    const handleNext = () => {
        // const calendarApi = calendarRef.current?.getApi();
        // calendarApi?.next();
        // updateCurrentRange(calendarApi);
    };

    const handleToday = () => {
        // const calendarApi = calendarRef.current?.getApi();
        // calendarApi?.today();
        // updateCurrentRange(calendarApi);
    };

    const handleViewChange = (newView: string) => {
        setView(newView);
        // const calendarApi = calendarRef.current?.getApi();
        // calendarApi?.changeView(newView);
        // updateCurrentRange(calendarApi);
    };

    const handleMonthChange = (month: string) => {
        setSelectedMonth(months.indexOf(month));
        // const year = new Date().getFullYear();
        // const monthIndex = months.indexOf(month) + 1;
        // const formattedDate = `${year}-${monthIndex.toString().padStart(2, "0")}-01`;
        // const calendarApi = calendarRef.current?.getApi();
        // calendarApi?.gotoDate(formattedDate);
    };

    return (
        <section className="flex flex-col md:flex-row items-center gap-4 justify-between mb-4">
            <h2 className="text-xl font-semibold">
                Horario: {currentRange || "Cargando..."}
            </h2>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                <Button onClick={handlePrev} variant="outline" size="sm">
                    <ChevronLeft />
                </Button>
                <Select value={months[selectedMonth]} onValueChange={handleMonthChange}>
                    <SelectTrigger className="w-[120px] h-9">
                        <SelectValue placeholder="Seleccionar Mes" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {months.map((month) => (
                                <SelectItem key={month} value={month}>
                                    {month}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Button onClick={handleNext} variant="outline" size="sm">
                    <ChevronRight />
                </Button>
                <Select value={view} onValueChange={handleViewChange}>
                    <SelectTrigger className="h-9">
                        <SelectValue placeholder="Seleccionar vista" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="dayGridMonth">
                                <div className="flex items-center gap-2">
                                    <CalendarDays className="h-5" /> Mes
                                </div>
                            </SelectItem>
                            <SelectItem value="timeGridWeek">
                                <div className="flex items-center gap-2">
                                    <CalendarRange className="h-5" /> Semana
                                </div>
                            </SelectItem>
                            <SelectItem value="timeGridDay">
                                <div className="flex items-center gap-2">
                                    <Calendar1 className="h-5" /> Día
                                </div>
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Button onClick={handleToday} variant="secondary" size="sm">
                    Hoy
                </Button>
            </div>
        </section>
    );
};
