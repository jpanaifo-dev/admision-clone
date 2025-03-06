import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ActivityCard() {
    return (
        <Card className="bg-[#1B204A] text-white p-6 w-full">
            <h2 className="text-xl font-semibold mb-4">Públicaciones Recientes</h2>

            <div className="space-y-2">
                <p className="text-sm text-gray-400">10:40 AM, Fri 10 Sept 2021</p>

                <h3 className="text-lg font-semibold">Comunicado en Facebook</h3>

                <p className="text-sm text-gray-300">
                    Se ha publicado un comunicado en la página de Facebook de la universidad
                </p>
            </div>

            <div className="mt-6 flex items-center justify-between">
                <p className="text-sm">Hoy se han publicado 3 publicaciones</p>
                <Button
                    className="bg-red-500 hover:bg-red-400 text-foreground-50"
                >
                    Ver todo
                </Button>
            </div>
        </Card>
    )
}

