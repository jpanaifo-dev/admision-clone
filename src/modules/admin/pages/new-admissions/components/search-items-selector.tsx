'use client'

import * as React from 'react'
import { Input } from '@/components/ui/input'
// import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Search } from 'lucide-react'
// import { programsSelectorData } from "@/data/dual-selector-data"
// import { useSelectorProgramContext } from "../context/selector-program-context"

// interface Program {
//   id: string
//   name: string
// }

// interface Plan {
//   id: string
//   name: string
//   programs: Program[]
// }

// interface ProgramType {
//     id: string
//     name: string
//     plans: Plan[]
// }

export default function SearchProgramSelector() {
  const [searchLeft, setSearchLeft] = React.useState('')
  // const [programsData, setProgramsData] = React.useState<ProgramType[]>([])
  // const { selectedPrograms, addProgram } = useSelectorProgramContext()

  // Simulando la carga de datos de la API
  // React.useEffect(() => {
  //     setProgramsData(programsSelectorData)
  // }, [])

  // Filtrar los programas según el texto de búsqueda
  // const filteredPrograms = programsData
  //     .map((programType) => ({
  //         ...programType,
  //         plans: programType.plans.map((plan) => ({
  //             ...plan,
  //             programs: plan.programs.filter((program) =>
  //                 program.name.toLowerCase().includes(searchLeft.toLowerCase())
  //                 && !selectedPrograms.some((selectedProgram) => selectedProgram.id === program.id)
  //             )
  //         }))
  //     }))
  //     .filter((programType) =>
  //         programType.plans.some((plan) =>
  //             plan.programs.length > 0
  //         )
  //     )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Buscar programas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar ..."
            value={searchLeft}
            onChange={(e) => setSearchLeft(e.target.value)}
            className="pl-8"
          />
        </div>
        <ScrollArea className="h-[400px] mt-4">
          <div className="space-y-4">
            {/* {filteredPrograms.map((programType) => (
                            <section key={programType.id}>
                                <div className="space-y-3">
                                    <span className="font-semibold text-lg">{programType.name}</span>
                                    <hr className="border-gray-200" />
                                    {programType.plans.map((plan) => (
                                        <div key={plan.id} className="mt-2 space-y-2">
                                            <span className="text-sm ml-4 font-bold">{plan.name}</span>
                                            <hr className="border-gray-200" />
                                            {plan.programs.map((program) => (
                                                <div
                                                    key={program.id}
                                                    className="flex items-center space-x-2 ml-10"
                                                >
                                                    <div className="flex-1">
                                                        <span className="text-sm">{program.name}</span>
                                                    </div>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => {
                                                            addProgram(program)
                                                        }}
                                                    >
                                                        <MoveRight className="h-4 w-4 text-primary-500" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        ))} */}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
