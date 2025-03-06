'use client'

import * as React from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import RequirementsHeader from '../components/requirements-header'
import { SearchCommandInput } from '../components/command-input'
import { FormProvider, useForm } from 'react-hook-form'
import { useFilterFromUrl } from '@/lib/filter-url'

interface Requirement {
  id: string
  name: string
  isActive: boolean
  fileAcceptance: boolean
  evaluationPercentage: number
}

interface RequirementFormValues {
  acceptsFile: boolean
  noEvaluation: boolean
  percentage: string
}

export default function RequirementsStep() {
  const [requirements, setRequirements] = React.useState<Requirement[]>([
    {
      id: '1',
      name: 'Nombre del requisito',
      isActive: true,
      fileAcceptance: false,
      evaluationPercentage: 20,
    },
    {
      id: '2',
      name: 'Nombre del requisito',
      isActive: true,
      fileAcceptance: false,
      evaluationPercentage: 20,
    },
    {
      id: '3',
      name: 'Nombre del requisito',
      isActive: true,
      fileAcceptance: false,
      evaluationPercentage: 20,
    },
    {
      id: '4',
      name: 'Nombre del requisito',
      isActive: true,
      fileAcceptance: false,
      evaluationPercentage: 20,
    },
    {
      id: '5',
      name: 'Nombre del requisito',
      isActive: true,
      fileAcceptance: false,
      evaluationPercentage: 20,
    },
  ])

  const { createFilter } = useFilterFromUrl()

  const methods = useForm<RequirementFormValues>({
    defaultValues: {
      acceptsFile: false,
      noEvaluation: false,
      percentage: '20',
    },
  })

  const handleDelete = (id: string) => {
    setRequirements(requirements.filter((req) => req.id !== id))
  }

  const onSubmit = () => {}

  return (
    <>
      <section>
        <FormProvider {...methods}>
          <RequirementsHeader />
          <div className="w-full space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <SearchCommandInput />
              <Button
                type="button"
                onClick={methods.handleSubmit(onSubmit)}
                variant={'secondary'}
              >
                <Plus className="h-4 w-4 mr-2" />
                Asignar requisito
              </Button>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Requisitos asignados</h2>

              <div className="pb-20 space-y-4">
                {requirements.map((requirement) => (
                  <Card key={requirement.id}>
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{requirement.name}</h3>
                            <Badge
                              variant="default"
                              className="bg-green-100 text-green-700 hover:bg-green-100"
                            >
                              Activo
                            </Badge>
                          </div>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Aceptación de archivos: NO</li>
                            <li>
                              • Porcentaje de evaluación:{' '}
                              {requirement.evaluationPercentage}%
                            </li>
                          </ul>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            onClick={() =>
                              createFilter({
                                key: 'modal',
                                value: `edit-${requirement.id}`,
                              })
                            }
                            variant="ghost"
                            size="icon"
                          >
                            <Pencil className="h-4 w-4 text-muted-foreground" />
                            <span className="sr-only">Editar</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(requirement.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                            <span className="sr-only">Quitar</span>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </FormProvider>
      </section>
    </>
  )
}
