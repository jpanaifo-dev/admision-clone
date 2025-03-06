import { Card } from "@/components/ui/card";

interface MetricCardProps {
    title: string;
    value: string | number;
    men: string | number;
    women: string | number;
    percentageDescription: string;
}

export function MetricCard({
    title,
    value,
    men,
    women,
    percentageDescription,
}: MetricCardProps) {
    return (
        <Card className="p-6">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="text-4xl font-bold mt-2">{value}</p>
                    <div className="mt-2 text-sm text-gray-600">
                        <p>{men} Hombres</p>
                        <p>{women} Mujeres</p>
                    </div>
                </div>
                <div className="text-green-500 text-sm">
                    <span className="ml-2 px-2 py-1 bg-green-100 rounded-full text-xs">
                        {percentageDescription}
                    </span>
                </div>
            </div>
        </Card>
    );
}
