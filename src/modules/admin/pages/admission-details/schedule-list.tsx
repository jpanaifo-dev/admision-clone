import { schedules } from "@/data/calendar-data"

export interface Schedule {
    id: number;
    description: string;
    is_active: boolean;
    promotion_convocatory: number;
}

export const ScheduleList = () => {
    return (
        <>
            <div className="space-y-5">
                <section className="flex flex-col items-start justify-start">
                    <h2 className="text-xl font-semibold">
                        Horarios
                    </h2>
                    <span className="text-sm text-gray-600">
                        Aquí puedes ver, actualizar los horarios disponibles para la carrera seleccionada.
                    </span>
                </section>
                <section className="rounded-lg">
                    {schedules.length > 0 ? (
                        <ul className="divide-y divide-gray-200">
                            {schedules.map((schedule) => (
                                <li key={schedule.id} className="py-4">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-medium">
                                                {schedule.description}
                                            </p>
                                            <p
                                                className={`text-sm ${schedule.is_active
                                                    ? "text-primary-600"
                                                    : "text-red-600"
                                                    }`}
                                            >
                                                {schedule.is_active ? "Activo" : "Inactivo"}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-semibold text-gray-800">
                                                Convocatoria ID: {schedule.promotion_convocatory}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600 text-center">No hay horarios disponibles.</p>
                    )}
                </section>
            </div>
        </>
    )
}
