import { AlertCustom } from '@/components/app'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar } from 'lucide-react'
import { ExternalLinkButton } from './components/external-link'
import type { IConvocatory } from '@/types/admision/IConvocatory'
import { formatTimelineDates } from '@/utils/format-timeline-dates'
import { ITimeline } from '@/types/admision/ITimeline'

export const AdmissionDetails = ({
  convocatoriesData,
  timelineData,
}: {
  convocatoriesData: IConvocatory[]
  timelineData: ITimeline[]
}) => {
  return (
    <main className="flex flex-col gap-y-4">
      <div className="pt-2">
        <AlertCustom
          title="Actualización de convocatoria"
          showIcon={true}
          type="warning"
        >
          Ten en cuenta que la actualización de la convocatoria solo se puede
          realizar mientras la etapa esté activa
        </AlertCustom>
      </div>
      <div className="flex flex-col gap-y-4">
        {convocatoriesData.map((convocatory, index) => (
          <Card
            key={index}
            className="flex flex-col gap-y-4 w-full shadow-lg rounded-lg p-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex gap-4 justify-start items-center">
                <h1 className="font-bold text-xl">{convocatory.description}</h1>
                <Badge
                  variant="secondary"
                  className="bg-greendescription-100 bg-green-100"
                >
                  {convocatory.is_active ? 'Activo' : 'Inactivo'}
                </Badge>
              </div>
              <ExternalLinkButton />
            </div>
            <hr />
            <div className="flex flex-col gap-y-4">
              <div className="flex justify-between items-center">
                <section>
                  Convocatoria
                  <p className="text-xs text-gray-400">
                    {convocatory.description}
                  </p>
                </section>
                <section>
                  Vigencia del proceso
                  <p className="text-xs text-gray-400">
                    Desde {convocatory.start_date} al {convocatory.end_date}
                  </p>
                </section>
              </div>
              <h1 className="font-bold">Vigencia extemporánea</h1>
              <section>
                Fecha
                <p className="text-xs text-gray-400">
                  Desde {convocatory.start_date} al {convocatory.end_date}
                </p>
              </section>
            </div>
          </Card>
        ))}

        <section className="flex flex-col xl:flex-row justify-between items-start gap-4">
          <Card className="w-full">
            <CardHeader className="flex flex-col md:flex-row items-center justify-between">
              <CardTitle>Cronograma de la convocatoria</CardTitle>
              <ExternalLinkButton />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timelineData.length > 0
                  ? timelineData.map((timeline, index) => (
                      <div
                        key={index}
                        className="flex gap-3 justify-start items-center"
                      >
                        <Calendar className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="font-medium text-sm">{timeline.name}</p>
                          <p className="text-xs text-gray-600">
                            {formatTimelineDates(
                              timeline.start_date,
                              timeline.end_date
                            )}
                          </p>
                        </div>
                      </div>
                    ))
                  : 'No hay datos disponibles'}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  )
}
