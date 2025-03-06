import { StatCard } from "./stats-card";

export default function TopStatsCards() {
    const cardsData = [
        {
            title: "Convocatorias",
            value: 6,
            subtitle: "3 abiertas",
            bgColor: "bg-red-50",
            textColor: "text-red-500",
        },
        {
            title: "Programas",
            value: 25,
            subtitle: "20 activos",
            bgColor: "bg-blue-50",
            textColor: "text-blue-500",
        },
        {
            title: "Estudiantes",
            value: 624,
            subtitle: "300 nuevos",
            bgColor: "bg-pink-50",
            textColor: "text-pink-500",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cardsData.map((card, index) => (
                <StatCard
                    key={index}
                    title={card.title}
                    value={card.value}
                    subtitle={card.subtitle}
                    bgColor={card.bgColor}
                    textColor={card.textColor}
                />
            ))}
        </div>
    );
}
