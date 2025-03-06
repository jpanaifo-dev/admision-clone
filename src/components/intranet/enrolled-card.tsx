'use client'
import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'

interface EnrolledCardProps {
  setIsSelected?: (value: boolean) => void
  isSelected?: boolean
}

export const EnrolledCard = (props: EnrolledCardProps) => {
  const { setIsSelected, isSelected } = props
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`cursor-pointer ${isSelected && 'bg-default-200'}`}
      onClick={() => setIsSelected && setIsSelected(!isSelected || false)}
    >
      <CardContent className="py-3 flex flex-col gap-2">
        <header className="flex justify-between items-start">
          <h1
            className={`font-bold ${
              isHovered && 'text-primary-700 underline'
            } ${isSelected && 'text-primary-800 underline'}`}
          >
            <span className=" font-bold">Matrícula:</span> Ciclo 2024 - II
          </h1>
          <span>
            <p className="text-gray-500 text-sm">2024</p>
          </span>
        </header>
        <section className="text-sm text-gray-800">
          <p>
            F. de matrícula: <span>20/10/2024 03:00:01</span>
          </p>
          <p>
            Cursos matriculados: <span>5</span>
          </p>
        </section>
      </CardContent>
    </Card>
  )
}
