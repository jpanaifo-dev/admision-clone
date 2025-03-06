'use client'
import { useState } from 'react'
import { IProgram } from '@/types/intranet/IPrograms'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

interface IProgramsCardProps {
  data: IProgram
}
export const ProgramCard = (props: IProgramsCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const { data } = props
  const { titulo } = data

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`flex flex-col sm:flex-row gap-4 p-4 bg-white ${
        isHovered
          ? 'border-2 border-primary-800 transition-opacity duration-300'
          : ''
      }`}
    >
      <img
        src="https://blogs.ucontinental.edu.pe/wp-content/uploads/2022/09/carrera-de-administracio%CC%81n-y-gestio%CC%81n-pu%CC%81blica-800x450.jpg"
        alt={titulo}
        className="sm:w-80 h-52 object-cover rounded-md"
      />
      <main className="w-full">
        <CardHeader className="py-3 px-0">
          <CardTitle
            className={`text-primary-900 font-bold ${
              isHovered && 'cursor-pointer underline'
            }`}
          >
            {titulo}
          </CardTitle>

          <div className="pt-1">
            <Badge className="bg-gray-200 text-gray-800 hover:bg-gray-200">
              {data.planEstudios}
            </Badge>
          </div>
        </CardHeader>
        <hr />
        <CardContent className="text-gray-700 flex flex-row p-0">
          <main className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
            <p>Facultad: {data.facultad}</p>
            <p>Duración: {data.duracion}</p>
            <h1>
              Estado:{' '}
              <Badge className="bg-warning-100 text-warning-600 hover:bg-warning-100">
                En curso
              </Badge>
            </h1>
            <p>Creditos: {data.creditos}</p>
          </main>
        </CardContent>
        <CardFooter className="flex flex-row gap-4 sm:gap-2 justify-center sm:justify-end pb-0">
          <Button
            size="sm"
            variant="secondary"
            className="border border-primary-900 text-primary-900 w-full sm:w-fit"
          >
            Historial económico
          </Button>
          <Button
            size="sm"
            className="bg-primary-900 text-white w-full sm:w-fit"
          >
            Detalles académicos
          </Button>
        </CardFooter>
      </main>
    </Card>
  )
}
