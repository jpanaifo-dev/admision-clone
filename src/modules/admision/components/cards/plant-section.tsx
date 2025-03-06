'use client'
import { useState } from 'react'
import {
  // Select,
  // SelectItem,
  // Selection,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/react'
import Image from 'next/image'
import { Downloadable } from '@/components/app/download-button'

export interface ICurso {
  id: number
  nombre: string
  codigo: string
  ciclo: number
  creditos: number
  horas_teoricas: number
  horas_practicas: number
  requisitos: IRequisito[]
}

export interface IRequisito {
  requisito__codigo: string
}

export interface IPlanEstudio {
  id: number
  nombre: string
  is_active: boolean
  costo: null | number
  comision: null | number
  cuotas: number
  matriculas: number
  modalidad: string
  sede: null | string
  duracion_academica: number
  programa: number
}

export interface ICiclo {
  ciclo: number
  cursos: ICurso[]
}

export interface IPlanEstudioListApi {
  plan_estudio: IPlanEstudio
  ciclos: ICiclo[]
  horas_totales: number
  creditos_totales: number
}

interface IProps {
  data: IPlanEstudioListApi[]
}

const columns = [
  {
    key: 'codigo',
    label: 'Código',
  },
  {
    key: 'asignatura',
    label: 'Asignatura',
  },
  {
    key: 'horas-teoricas',
    label: 'HT',
  },
  {
    key: 'horas_practicas',
    label: 'HP',
  },
  {
    key: 'creditos',
    label: 'C',
  },
]

export function PlanSection(props: IProps) {
  const { data } = props
  const [itemSelected] = useState<number>(
    data.length > 0 ? data[0].plan_estudio.id : 0
  )

  const planEstudio = data.find(
    (plan) => plan.plan_estudio.id === itemSelected
  ) as IPlanEstudioListApi

  return (
    <div className="flex flex-col justify-start gap-6">
      {data.length === 0 && (
        <div className="flex flex-col justify-center items-center section">
          <Image
            src="/svg/not-programs.svg"
            width={320}
            height={320}
            alt="not-plan"
          />
          <p className="text-center text-gray-500 max-w-sm">
            No se encontraron planes de estudio para este programa académico
          </p>
        </div>
      )}
      {data.length > 0 && (
        <>
          <section className="rounded-lg border-opacity-70 border border-[#A4A4A4] w-full">
            {planEstudio?.ciclos.map((cycle, outerIndex) => (
              <div key={outerIndex}>
                <h5 className="text-start font-semibold text-sm uppercase pt-5 px-5">
                  Ciclo {cycle?.ciclo}
                </h5>
                <Table
                  aria-label="Table of courses"
                  radius="sm"
                  shadow="none"
                  fullWidth
                >
                  <TableHeader columns={columns}>
                    {(column) => (
                      <TableColumn key={column?.key}>
                        {column?.label}
                      </TableColumn>
                    )}
                  </TableHeader>
                  <TableBody>
                    {cycle.cursos.map((row, innerIndex) => (
                      <TableRow key={innerIndex}>
                        <TableCell
                          id={row?.nombre}
                          className="w-96"
                        >
                          {row?.codigo}
                        </TableCell>
                        <TableCell className="w-96">{row?.nombre}</TableCell>
                        <TableCell>{row?.horas_teoricas}</TableCell>
                        <TableCell>{row?.horas_practicas}</TableCell>
                        <TableCell>{row?.creditos}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ))}
          </section>
          <section className="flex flex-col gap-3.5">
            <h5 className="text-black text-lg font-bold leading-7">
              Descargar plan de estudios
            </h5>
            <Downloadable
              title="Plan de estudios"
              fileName="Plan-de-estudios.pdf"
              file="#"
            />
          </section>
        </>
      )}
    </div>
  )
}
