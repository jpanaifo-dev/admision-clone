import { format } from "date-fns";

export const formatTimelineDates = (start_date: Date, end_date: Date) => {
    const startDate = format(new Date(start_date), "dd/MM/yyyy");
    const endDate = format(new Date(end_date), "dd/MM/yyyy");
    return `Desde ${startDate} al ${endDate}`;
}