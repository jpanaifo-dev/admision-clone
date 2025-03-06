'use client'
import { BottomActions } from '@/components/app/bottom-actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect } from 'react'
// import DualListBox from 'react-dual-listbox'
import 'react-dual-listbox/lib/react-dual-listbox.css'
// import { customIcons, lang } from './config-list-box'
import { Label } from '@/components/ui/label'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { IHeadquarter, IProgramPlanStudy } from '@/types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const formSchema = z.object({
  promotion: z
    .string()
    .min(5, 'La promoción debe tener al menos 5 caracteres.'),
  selectedPrograms: z
    .array(
      z.object({
        plan: z.string(),
        program: z.string(),
      })
    )
    .min(1, 'Debe seleccionar al menos un programa.'),
  headquarter_uuid: z.string().min(1, 'Debe seleccionar una sede.'),
})

type FormData = z.infer<typeof formSchema>

interface DualListBoxSelectorProps {
  initialData?: {
    promotion: string
    selectedPrograms: { plan: string; program: string }[]
  }
  uuid?: string
  data?: IProgramPlanStudy[] | null
  headquarters?: IHeadquarter[] | null
}

export default function DualListBoxSelector({
  initialData,
  headquarters,
}: DualListBoxSelectorProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      promotion: '',
      selectedPrograms: [],
      headquarter_uuid: '',
    },
  })

  // const [selectedPrograms, setSelectedPrograms] = useState<
  //   { plan: string; program: string }[]
  // >(initialData?.selectedPrograms || [])

  useEffect(() => {
    if (initialData) {
      reset({
        promotion: initialData.promotion,
        selectedPrograms: initialData.selectedPrograms,
      })
      // setSelectedPrograms(initialData.selectedPrograms)
    }
  }, [initialData, reset])

  const onSubmit = (data: FormData) => {
    alert(`Promoción: ${data.promotion}`)
  }

  // const dualListData = data?.map((program) => ({
  //   label: `${program.code} - ${program.name}`,
  //   options: program.study_plan.map((plan) => ({
  //     value: plan.id.toString(),
  //     label: plan.description,
  //   })),
  // }))

  // const handleSelectionChange = (selected: string[]) => {
  //   const selectedWithPlan = selected.map((programId) => {
  //     // Buscar el plan y programa correspondiente
  //     for (const plan of dualListData || []) {
  //       const program = plan.options.find(
  //         (option) => option.value === programId
  //       )
  //       if (program) {
  //         return { plan: plan.label, program: programId }
  //       }
  //     }
  //     return { plan: '', program: programId }
  //   })

  //   setSelectedPrograms(selectedWithPlan)
  // }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <main className="space-y-4 overflow-y-auto h-[calc(100vh)]">
          <section className="w-full flex flex-col gap-2 justify-start items-start bg-white dark:bg-gray-800 p-4">
            <Label>Promoción:</Label>
            <Controller
              name="promotion"
              control={control}
              render={({ field }) => (
                <div className="w-full space-y-2">
                  <Input
                    {...field}
                    placeholder="Convocatoria de ejemplo..."
                    className="w-full h-9 rounded"
                  />
                  {errors.promotion && (
                    <span className="text-red-500 text-sm">
                      {errors.promotion.message}
                    </span>
                  )}
                </div>
              )}
            />
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 items-start bg-white dark:bg-gray-800 gap-4">
            <div className="w-full flex flex-col gap-2 justify-start items-start p-4">
              <Label>Sede:</Label>
              <Controller
                name="headquarter_uuid"
                control={control}
                render={({ field }) => (
                  <div className="w-full space-y-2">
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona una sede" />
                      </SelectTrigger>
                      <SelectContent>
                        {headquarters?.map((item) => (
                          <SelectItem
                            key={item.id}
                            value={item.uuid}
                          >
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.promotion && (
                      <span className="text-red-500 text-sm">
                        {errors.promotion.message}
                      </span>
                    )}
                  </div>
                )}
              />
            </div>
          </section>

          <div className="w-full bg-white dark:bg-gray-800 p-4 shadow">
            {/* <Controller
              name="selectedPrograms"
              control={control}
              render={({ field }) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { ref, ...rest } = field

                return (
                  <div className="w-full space-y-2">
                    <DualListBox
                      {...rest}
                      icons={customIcons}
                      options={dualListData || []}
                      selected={selectedPrograms.map((item) => item.program)}
                      onChange={(selected) => {
                        handleSelectionChange(selected)
                        field.onChange(
                          selected.map((programId) => {
                            const plan = dualListData?.find((plan) =>
                              plan.options.some(
                                (option) => option.value === programId
                              )
                            )?.label
                            return { plan: plan || '', program: programId }
                          })
                        )
                      }}
                      canFilter
                      className="h-[450px] text-sm"
                      lang={lang}
                      showHeaderLabels
                    />
                    {errors.selectedPrograms && (
                      <p className="text-red-500 text-sm">
                        {errors.selectedPrograms.message}
                      </p>
                    )}
                  </div>
                )
              }}
            /> */}
          </div>

          <BottomActions
            content={
              <>
                <Button
                  variant="outline"
                  type="button"
                  // onClick={() => setSelectedPrograms([])}
                >
                  Cancelar
                </Button>
                <Button type="submit">Guardar</Button>
              </>
            }
          />
        </main>
      </form>
    </>
  )
}
