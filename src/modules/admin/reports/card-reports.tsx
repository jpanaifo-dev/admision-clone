'use client'

import { ScrollText } from 'lucide-react'
import { StudyPlanCard } from './card-selector'

export const CardReports = () => {
  const items = [
    { value: 'alumnoRegular', label: 'Alumno Regular' },
    { value: 'alumnoEgresado', label: 'Alumno Egresado' },
    { value: 'alumnoEspecial', label: 'Alumno Especial' },
  ]

  const items1 = [
    { value: 'alumnoRegular', label: 'Alumno Regular' },
    { value: 'alumnoEgresado', label: 'Alumno Egresado' },
    { value: 'alumnoEspecial', label: 'Alumno Especial' },
  ]

  const items2 = [
    { value: 'periodo', label: '2021' },
    { value: 'periodo1', label: '2023' },
    { value: 'periodo2', label: '2024' },
  ]
  const handleChange = () => {}

  return (
    <main className="flex flex-wrap gap-4">
      <StudyPlanCard
        items={items}
        onSelect={handleChange}
        placeholder="Seleccione una opción"
        value=""
        icon={ScrollText}
        cardTitles={{
          title: 'Reporte por grado academico',
          subtitle: 'Seleccione el grado academico',
        }}
      />
      <StudyPlanCard
        items={items1}
        onSelect={handleChange}
        placeholder="Seleccione una opción"
        value=""
        icon={ScrollText}
        cardTitles={{
          title: 'Reporte de plan de estudios',
          subtitle: 'Seleccione el plan de estudio',
        }}
      />
      <StudyPlanCard
        items={items2}
        onSelect={handleChange}
        placeholder="Seleccione una opción"
        value=""
        icon={ScrollText}
        cardTitles={{
          title: 'Reporte por año',
          subtitle: 'Seleccione el año de la convocatoria',
        }}
      />
    </main>
  )
}
