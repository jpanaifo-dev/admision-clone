import { Card } from "@/components/ui/card";

interface StatCardProps {
    title: string;
    value: string | number;
    subtitle: string;
    bgColor: string;
    textColor: string;
}

export function StatCard({ title, value, subtitle, bgColor, textColor }: StatCardProps) {
    return (
        <Card className={`p-4 ${bgColor}`}>
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-4xl font-bold mt-2">{value}</p>
            <p className={`mt-1 ${textColor}`}>{subtitle}</p>
        </Card>
    );
}
