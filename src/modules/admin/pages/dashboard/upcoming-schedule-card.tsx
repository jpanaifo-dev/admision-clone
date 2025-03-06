import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MoreVertical, Star } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ScheduleItem {
    title: string
    time: string
    priority?: boolean
}

export default function UpcomingScheduleCard(
    { scheduleItems }: { scheduleItems: ScheduleItem[] }
) {
    return (
        <>
            <Card className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold">Actividades próximas</h3>
                    <Button variant="outline" size="sm">Ver todo</Button>
                </div>

                <div className="space-y-4">
                    {scheduleItems.map((item, index) => (
                        <div key={index} className="flex items-start justify-between">
                            <div>
                                <div className="flex items-center gap-2">
                                    {item.priority && <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />}
                                    <h4 className="font-medium">{item.title}</h4>
                                </div>
                                <p className="text-sm text-gray-500 mt-1">{item.time}</p>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                    <DropdownMenuItem>Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    ))}
                </div>
            </Card>
        </>
    )
}
