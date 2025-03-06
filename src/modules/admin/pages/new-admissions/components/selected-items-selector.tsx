"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MoveLeft, Search } from 'lucide-react'
import { useSelectorProgramContext } from "../context/selector-program-context"

export default function SelectedProgramsSelector() {
    const [searchRight, setSearchRight] = React.useState("")
    const { selectedPrograms, removeProgram } = useSelectorProgramContext()

    // Filtrar los programas seleccionados según el texto de búsqueda
    const filteredSelected = selectedPrograms
        .filter((program) => program.name.toLowerCase().includes(searchRight.toLowerCase()))

    return (
        <Card>
            <CardHeader>
                <CardTitle>Programas seleccionados</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Buscar ..."
                        value={searchRight}
                        onChange={(e) => setSearchRight(e.target.value)}
                        className="pl-8"
                    />
                </div>
                <ScrollArea className="h-[400px] mt-4">
                    <div className="space-y-4">
                        {filteredSelected.map((program) => (
                            <div
                                key={program.id}
                                className={`flex items-center space-x-2`}
                            >
                                <div className="flex-1">
                                    <span className="text-sm">{program.name}</span>
                                </div>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => {
                                        removeProgram(program.id)
                                    }}
                                >
                                    <MoveLeft className="h-4 w-4 text-primary-500" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}
