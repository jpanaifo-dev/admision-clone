import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function RecentrecentActivities() {
    return (
        <Card className="p-6 w-full">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Actividades recientes</h3>
                <Button variant="outline" size="sm">Ver todo</Button>
            </div>

            <div className="space-y-4">
                {recentActivities.map((post, index) => (
                    <div key={index} className="flex items-start justify-between border-b pb-4 last:border-0">
                        <div>
                            <h4 className="font-medium">{post.title}</h4>
                            <p className="text-sm text-gray-500 mt-1">{post.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    )
}

const recentActivities = [
    {
        title: "Convocatoria de becas",
        time: "Hace 2 horas",
    },
    {
        title: "Comunicado de la rectoría",
        time: "Hace 3 horas",
    },
    {
        title: "Asamblea estudiantil",
        time: "Hace 4 horas",
    },
    {
        title: "Actividades deportivas",
        time: "Hace 5 horas",
    }
]

