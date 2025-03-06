'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ExternalLinkButton } from './components/external-link'
import { IConvocatory, IEventCall } from '@/types/admission'
import { TimelineCard } from '@/modules/admision/components'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useTransition } from 'react'
import { updateStateConvocatory } from '@/api/convocatory/convocatory.actions'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

interface IProps {
  convocatoriesData: IConvocatory[]
  timelineData: IEventCall[]
}

export const AdmissionDetails = (props: IProps) => {
  const { convocatoriesData, timelineData } = props
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleToggle = (
    id: number,
    field: 'is_active' | 'is_public',
    value: boolean,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isPublic: boolean
  ) => {
    if (field === 'is_active' && !value) {
      toast.warn(
        <div>
          <p>
            Si desactivas esta convocatoria, podrás reactivarla en el menú de
            historial.
          </p>
          <p>¿Deseas continuar?</p>
          <div className="flex justify-end space-x-2 mt-2">
            <button
              className="px-3 py-1 bg-red-500 text-white rounded-md"
              onClick={() => {
                updateStateConvocatory(id, { [field]: value }).then(() => {
                  router.push('/admin/convocatorias')
                })
                toast.dismiss()
              }}
            >
              Sí, desactivar
            </button>
            <button
              className="px-3 py-1 bg-gray-300 text-black rounded-md"
              onClick={() => toast.dismiss()}
            >
              Cancelar
            </button>
          </div>
        </div>,
        {
          position: 'top-center',
          autoClose: false,
          closeOnClick: false,
          closeButton: false,
        }
      )
      return
    }

    if (field === 'is_public' && !value) {
      // Mostrar el toast de confirmación para cambiar a privado
      toast.warn(
        <div>
          <p>
            Si cambias esta convocatoria a privada, no será accesible
            públicamente.
          </p>
          <p>¿Deseas continuar?</p>
          <div className="flex justify-end space-x-2 mt-2">
            <button
              className="px-3 py-1 bg-red-500 text-white rounded-md"
              onClick={() => {
                updateStateConvocatory(id, { [field]: value }).then(() => {
                  toast.dismiss()
                })
              }}
            >
              Sí, hacer privada
            </button>
            <button
              className="px-3 py-1 bg-gray-300 text-black rounded-md"
              onClick={() => toast.dismiss()}
            >
              Cancelar
            </button>
          </div>
        </div>,
        {
          position: 'top-center',
          autoClose: false,
          closeOnClick: false,
          closeButton: false,
        }
      )
      return
    }

    // Si no es "is_active" o si no requiere confirmación
    startTransition(() => {
      updateStateConvocatory(id, { [field]: value })
    })
  }

  return (
    <main className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-4">
        {convocatoriesData.map((convocatory) => (
          <Card
            key={convocatory.uuid}
            className="flex flex-col gap-y-4 w-full h-fit rounded-lg p-8"
          >
            <section className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex gap-4 justify-start items-center">
                <h1 className="font-bold text-xl">{convocatory.description}</h1>
              </div>
              <ExternalLinkButton
                href={`/admin/convocatorias/${convocatory.uuid}/editar`}
              />
            </section>
            <hr />
            <section className="flex flex-col gap-y-4">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4 w-full">
                <section className="flex flex-col justify-start items-start gap-4">
                  <div>
                    Convocatoria
                    <p className="text-sm text-gray-500">
                      {convocatory.description}
                    </p>
                  </div>
                  <div>
                    Vigencia del proceso
                    <p className="text-sm text-gray-500">
                      Desde {convocatory.start_date.toString()} al{' '}
                      {convocatory.end_date.toString()}
                    </p>
                  </div>
                </section>
                <section className="flex flex-col justify-start items-start gap-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor={`is_active-${convocatory.uuid}`}>
                        {convocatory.is_active ? 'Activo' : 'Inactivo'}
                      </Label>
                      <Switch
                        id={`is_active-${convocatory.id}`}
                        checked={convocatory.is_active}
                        onCheckedChange={(checked) =>
                          handleToggle(
                            convocatory.id,
                            'is_active',
                            checked,
                            convocatory.is_public
                          )
                        }
                        disabled={isPending || convocatory.is_public}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor={`is_public-${convocatory.uuid}`}>
                        {convocatory.is_public ? 'Público' : 'Privado'}
                      </Label>
                      <Switch
                        id={`is_public-${convocatory.id}`}
                        checked={convocatory.is_public}
                        onCheckedChange={(checked) =>
                          handleToggle(
                            convocatory.id,
                            'is_public',
                            checked,
                            convocatory.is_public
                          )
                        }
                        disabled={isPending}
                      />
                    </div>
                  </div>
                </section>
              </div>
            </section>
          </Card>
        ))}

        <section className="flex flex-col xl:flex-row justify-between items-start gap-4 w-full">
          <Card className="w-full">
            <CardHeader className="flex flex-col md:flex-row items-center justify-between border-b-1 pb-4">
              <CardTitle>Cronograma de la convocatoria</CardTitle>
              <ExternalLinkButton
                href={`/admin/convocatorias/${convocatoriesData[0].uuid}/cronograma`}
              />
            </CardHeader>
            <CardContent>
              <div className="space-y-4 pt-5">
                {timelineData.length > 0
                  ? timelineData.map((timeline: IEventCall) => (
                      <TimelineCard
                        key={timeline.id}
                        event={timeline}
                      />
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
