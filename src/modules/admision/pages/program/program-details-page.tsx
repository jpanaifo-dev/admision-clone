'use client'
import { IProgramBanner, IProgramDetails, IStudyPlanDetails } from '@/types'
import { ProgramDetailCard } from '@/modules/admision'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProgramInformation } from './program-information'
import { ProgramStudyPlan } from './program-study-plan'
import { ProgramAside } from './program-aside'
import { ADMISSION_URLS_APP } from '@/config/urls-data/admission.urls.config'
import { Badge } from '@/components/ui/badge'
import { ProgramInversion } from './program-inversion'
import { SERVICES_MODULES } from '@/config/modules.cofig'

const { APPY_TO_PROGRAM } = ADMISSION_URLS_APP

interface ProgramDetailPage {
  program_banner?: IProgramBanner | null
  program_details?: IProgramDetails | null
  study_plan?: IStudyPlanDetails | null
  plan_token: string
  isValidate?: boolean
}

const URL_BASE =
  process.env.NODE_ENV === 'production'
    ? SERVICES_MODULES.PROGRAM.URL_PROD
    : SERVICES_MODULES.PROGRAM.URL_LOCAL

export const ProgramDetailsPage = (props: ProgramDetailPage) => {
  const {
    program_banner,
    program_details,
    study_plan,
    plan_token,
    isValidate,
  } = props
  const { vacancies, months_duration, class_start_date, program, cost_total } =
    program_banner || {}

  const { background } = program || {}
  const path = `${URL_BASE?.replace('/epg_program_service/api/', '')}`
  const image = `${path}${background}`

  return (
    <>
      {program_banner && (
        <section
          className="h-[70vh] flex justify-start items-center bg-primary-900"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 23, 49, 0.8), rgba(0, 23, 49, 0.95)), url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="container mx-auto">
            <ProgramDetailCard
              title={`${program_banner?.program?.name}`}
              modality={program_banner?.modality}
              startDate={program_banner?.class_start_date}
              deadline={program_banner?.inscription_end_date}
              plan={program_banner?.program?.study_plan?.description}
              areas={program_banner?.program?.area
                .map((area) => area.name)
                .join(', ')}
              headquarter={program_banner?.headquarter?.name}
              adress_headquarter={program_banner?.headquarter?.address}
            />
          </div>
        </section>
      )}
      <section className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 py-6 lg:py-12">
          <section className="flex-1 bg-white shadow-lg p-4 sm:p-6">
            <Tabs
              defaultValue="program-details"
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-0 bg-white">
                <TabsTrigger
                  value="program-details"
                  className="bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none data-[state=active]:shadow-none data-[state=active]:bg-transparent"
                >
                  Información general
                </TabsTrigger>
                <TabsTrigger
                  value="study-plan"
                  className="bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none data-[state=active]:shadow-none data-[state=active]:bg-transparent"
                >
                  Plan de estudios
                </TabsTrigger>
                <TabsTrigger
                  value="inversion"
                  className="bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none data-[state=active]:shadow-none data-[state=active]:bg-transparent"
                >
                  <span className="mr-2">Inversión </span>
                  <Badge className="bg-lime-400 text-lime-900 hover:bg-lime-500">
                    Nuevo
                  </Badge>
                </TabsTrigger>
              </TabsList>
              {program_details && (
                <TabsContent
                  value="program-details"
                  className="pt-12 sm:pt-6 sm:px-4"
                >
                  <ProgramInformation programData={program_details} />
                </TabsContent>
              )}

              {study_plan && (
                <TabsContent
                  value="study-plan"
                  className="px-0 pt-12 sm:pt-6"
                >
                  <ProgramStudyPlan study_plan={study_plan} />
                </TabsContent>
              )}
              {program_details && (
                <TabsContent
                  value="inversion"
                  className="pt-12 sm:pt-6 sm:px-4"
                >
                  <ProgramInversion
                    total_cost={cost_total || 0}
                    quotas_max={months_duration || 0}
                  />
                </TabsContent>
              )}
            </Tabs>
          </section>
          {program_banner && (
            <section className="w-full lg:w-96 space-y-6">
              <ProgramAside
                total_cost={cost_total || 0}
                start_date={class_start_date || ''}
                total_months={months_duration || 0}
                vacancies={vacancies || 0}
                url={APPY_TO_PROGRAM.PROGRAM(
                  plan_token,
                  program_banner?.program?.study_plan?.uuid || '',
                  program_banner?.headquarter?.uuid || ''
                )}
                isValidate={isValidate}
              />
            </section>
          )}
        </div>
      </section>
    </>
  )
}
