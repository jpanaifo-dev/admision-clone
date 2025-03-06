import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from '@/components/ui/table'
import { IStudyPlanDetails } from '@/types'
import { ICourse } from '@/types/academic'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Book, Download, Scroll } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolCard } from '../../components'
// import { SERVICES_MODULES } from '@/config/modules.cofig'
import { SERVICES_MODULES } from '@/config/modules.cofig'
import Link from 'next/link'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const { PROGRAM } = SERVICES_MODULES
const { URL_LOCAL } = PROGRAM
interface ProgramStudyPlanProps {
  study_plan?: IStudyPlanDetails | null
}

export const ProgramStudyPlan = ({ study_plan }: ProgramStudyPlanProps) => {
  // slplit to /admision/convocatorias/uuid/id to URL_LOCAL
  // const url = URL_LOCAL
  const URL_TRASH = 'epg_program_service/api///'
  const URL_DOWNLOAD = `${URL_LOCAL}/${study_plan?.file}`.replace(URL_TRASH, '')

  return (
    <div className="space-y-8">
      {/* Renderizar ciclos y cursos */}
      {study_plan && (
        <div className="px-0 sm:px-5 flex flex-col gap-4 lg:gap-6">
          <section className="flex items-start gap-4 p-4 bg-gray-50 border border-gray-300 rounded-md">
            <div className="p-2 rounded-sm bg-white border shadow-sm">
              <Scroll
                className="inline-block"
                size={24}
                strokeWidth={2}
              />
            </div>
            <div>
              <h5 className="text-start font-bold text-sm uppercase lg:text-2xl">
                Plan de estudios {study_plan.description}
              </h5>
              <p className="text-sm text-gray-500">
                En esta sección encontrarás el detalle de las asignaturas que
                componen el plan de estudios de la carrera.
              </p>
              <div className="mt-2">
                <Button
                  size="sm"
                  asChild
                >
                  <Link
                    href={URL_DOWNLOAD}
                    target="_blank"
                  >
                    <Download
                      size={16}
                      strokeWidth={2}
                    />
                    Descargar plan
                  </Link>
                </Button>
              </div>
            </div>
          </section>
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ToolCard
              title={`Con un total de ${study_plan.course.length} asignaturas`}
              description="Abarcan diversas áreas del conocimiento, diseñadas para proporcionar una formación integral y especializada."
              imgLink="/images/asignatures.png"
              hiddenButton
            />
            <ToolCard
              title={`Con un total de ${calculateTotalCredits(
                study_plan
              )} créditos`}
              description="Distribuidos en asignaturas teóricas y prácticas, con el objetivo de formar profesionales competentes y capacitados."
              imgLink="/images/credits.png"
              hiddenButton
            />
          </section>
          <Accordion
            type="multiple"
            defaultValue={Object.keys(groupCoursesByCycle(study_plan.course))}
            className="rounded-xl"
          >
            {Object.entries(groupCoursesByCycle(study_plan.course)).map(
              ([cycle, courses], cycleIndex) => (
                <AccordionItem
                  key={cycleIndex}
                  value={cycle}
                  className="rounded-lg border border-gray-300"
                >
                  <AccordionTrigger className="p-4 bg-gray-100 border-b border-gray-300 rounded-t-lg">
                    <h6 className="font-bold uppercase">Semestre {cycle}</h6>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Table className="bg-white ">
                      <TableHeader className="font-semibold text-white bg-primary-900 rounded-t-none">
                        <TableRow>
                          <TableCell>Código</TableCell>
                          <TableCell>Nombre</TableCell>
                          <TableCell>H. Teóricas</TableCell>
                          <TableCell>H. Prácticas</TableCell>
                          <TableCell>Créditos</TableCell>
                          <TableCell>Requisitos</TableCell>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {courses?.map((row, innerIndex) => (
                          <TableRow key={innerIndex}>
                            <TableCell className="min-w-24">
                              {row.code}
                            </TableCell>
                            <TableCell className="max-w-[300px] hover:cursor-pointer">
                              <TooltipProvider delayDuration={0}>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <span>{row.name}</span>
                                  </TooltipTrigger>
                                  <TooltipContent
                                    className="dark py-3 max-w-xl"
                                    side="bottom"
                                  >
                                    <div className="flex gap-3">
                                      <Book
                                        className="mt-0.5 shrink-0 opacity-60"
                                        size={16}
                                        strokeWidth={2}
                                        aria-hidden="true"
                                      />
                                      <div className="space-y-1">
                                        <p className="text-[13px] font-medium">
                                          {row.name}
                                        </p>
                                        <p className="text-xs text-gray-300">
                                          {row.description}
                                        </p>
                                      </div>
                                    </div>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </TableCell>
                            <TableCell>{row.theorist_hours}</TableCell>
                            <TableCell>{row.practice_hours}</TableCell>
                            <TableCell>{row.credits}</TableCell>
                            <TableCell className="max-w-[300px] min-w-28 text-center">
                              {row.requirements.length > 0
                                ? row?.requirements?.map((req, idx) => (
                                    <ul
                                      key={idx}
                                      className="list-image-none list-inside"
                                    >
                                      <li className="text-sm">
                                        {req.requirement}
                                      </li>
                                    </ul>
                                  ))
                                : 'Ninguno'}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </AccordionContent>
                </AccordionItem>
              )
            )}
          </Accordion>
        </div>
      )}
    </div>
  )
}

const calculateTotalCredits = (
  study_plan?: IStudyPlanDetails | null
): number => {
  if (!study_plan) return 0
  return study_plan.course.reduce(
    (total, course) => total + Number(course.credits),
    0
  )
}

const groupCoursesByCycle = (courses: ICourse[]) => {
  return courses.reduce((acc, course) => {
    const cycle = course.academic_cycle || 'Sin Ciclo'
    if (!acc[cycle]) {
      acc[cycle] = []
    }
    acc[cycle].push(course)
    return acc
  }, {} as Record<string, ICourse[]>)
}
