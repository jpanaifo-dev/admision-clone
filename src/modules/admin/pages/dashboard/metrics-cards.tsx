import { MetricCard } from "./metric-card";

export default function MetricsCards() {
    const metricsData = [
        {
            title: "Estudiantes activos",
            value: 216,
            men: 120,
            women: 96,
            percentageDescription: "+2% en el último mes",
        },
        {
            title: "Solictudes de admisión",
            value: 16,
            men: 6,
            women: 10,
            percentageDescription: "+5% en el último mes",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {metricsData.map((metric, index) => (
                <MetricCard
                    key={index}
                    title={metric.title}
                    value={metric.value}
                    men={metric.men}
                    women={metric.women}
                    percentageDescription={metric.percentageDescription}
                />
            ))}
        </div>
    );
}
