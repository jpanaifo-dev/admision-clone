import React from 'react'
import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { HeaderFormSection } from '@/components/layouts'

type Module = {
  name: string
  description: string
  subModules?: string[]
}

const modules: Module[] = [
  {
    name: 'PANEL DE ACADEMICOS',
    description:
      'Supervisa usuarios, administra configuraciones, y gestiona el sistema educativo.',
    subModules: ['MATRICULAS', 'FINANZAS', 'REPORTES'],
  },
  {
    name: 'PANEL DE ECONOMICOS',
    description:
      'Supervisa usuarios, administra configuraciones, y gestiona el sistema educativo.',
    subModules: ['PAGOS', 'INGRESOS', 'EGRESOS', 'REPORTES'],
  },
]

export const UserModulesData = () => {
  const [selectedModules, setSelectedModules] = useState<
    Record<string, boolean>
  >({})

  const handleModuleChange = (moduleName: string) => {
    setSelectedModules((prev) => {
      const newState = { ...prev, [moduleName]: !prev[moduleName] }
      if (newState[moduleName]) {
        modules
          .find((m) => m.name === moduleName)
          ?.subModules?.forEach((sub) => {
            newState[`${moduleName}-${sub}`] = true
          })
      } else {
        modules
          .find((m) => m.name === moduleName)
          ?.subModules?.forEach((sub) => {
            newState[`${moduleName}-${sub}`] = false
          })
      }
      return newState
    })
  }

  const handleSubModuleChange = (moduleName: string, subModule: string) => {
    setSelectedModules((prev) => ({
      ...prev,
      [`${moduleName}-${subModule}`]: !prev[`${moduleName}-${subModule}`],
    }))
  }
  return (
    <section
      id="user-info-basic"
      className="w-full p-4"
    >
      <HeaderFormSection
        title="Asignar de módulos"
        description="Selecciona los módulos de las aplicaciones"
      />

      <section className='space-y-6'>
        {modules.map((module) => (
          <div
            key={module.name}
            className="space-y-4"
          >
            <div className="flex items-start space-x-3 ">
              <Checkbox
                id={module.name}
                checked={selectedModules[module.name] || false}
                onCheckedChange={() => handleModuleChange(module.name)}
                className="mt-2"
              />
              <div>
                <Label
                  htmlFor={module.name}
                  className="font-medium"
                >
                  {module.name}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {module.description}
                </p>
              </div>
            </div>

            {module.subModules && (
              <div className="ml-8 space-y-2">
                {module.subModules.map((subModule) => (
                  <div
                    key={`${module.name}-${subModule}`}
                    className="flex items-center space-x-3"
                  >
                    <Checkbox
                      id={`${module.name}-${subModule}`}
                      checked={
                        selectedModules[`${module.name}-${subModule}`] || false
                      }
                      onCheckedChange={() =>
                        handleSubModuleChange(module.name, subModule)
                      }
                    />
                    <Label htmlFor={`${module.name}-${subModule}`}>
                      {subModule}
                    </Label>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </section>
    </section>
  )
}
