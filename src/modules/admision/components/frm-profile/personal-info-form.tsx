/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import {
  PersonInfoSchemaType,
  PersonSchema,
  useMaritalStatus,
} from '@/modules/admision'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { IPerson } from '@/types'
import { updatePerson } from '@/api/persons'
import { ToastCustom } from '@/components/app'
import { toast } from 'react-toastify'

import { Button } from '@/components/ui/button'
import { useFormPersonStore } from '@/modules/admision'
import { GeneralInformation } from './person-info/general-information'
import { OriginBirthDay } from './person-info/origin-birth-day'
import { DemographicInformation } from './person-info/demographic-information'
interface IPersonalInfoFormProps {
  defaultData?: IPerson
}

// Natural person
const PERSON_TYPES = 1

export function PersonalInfoForm(props: IPersonalInfoFormProps) {
  const { defaultData } = props

  const { maritalStatus } = useMaritalStatus()
  const [loading, setLoading] = useState<boolean>(false)
  const { setIsDirty } = useFormPersonStore()

  const form = useForm<PersonInfoSchemaType>({
    resolver: zodResolver(PersonSchema),
    defaultValues: {
      document_number: defaultData?.document_number || '',
      document_type: Number(defaultData?.document_type) || undefined,
      last_name1: defaultData?.last_name1 || '',
      last_name2: defaultData?.last_name2 || '',
      names: defaultData?.names || '',
      person_type: PERSON_TYPES,
      gender: defaultData?.gender || '',
      birthdate: defaultData?.birthdate || '',
      marital_status: defaultData?.marital_status || 1,
      ubigeo_birth_uuid: defaultData?.ubigeo_birth_uuid || '',
      comunity_indigenous: defaultData?.comunity_indigenous || '',
      country_uuid: defaultData?.country_uuid || '',
      disability: defaultData?.disability || '',
      native_language: defaultData?.native_language || '',
      photo: [],
    },
  })

  const isDirty = form.formState.isDirty

  useEffect(() => {
    setIsDirty(isDirty)
  }, [isDirty])

  async function onSubmit(data: PersonInfoSchemaType) {
    setLoading(true)
    const response = await updatePerson(String(defaultData?.uuid), {
      person_type: 1,
      photo: data.photo.length > 0 ? data.photo[0] : undefined,
      document_number: data.document_number,
      document_type: data.document_type,
      last_name1: data.last_name1,
      last_name2: data.last_name2,
      names: data.names,
      comunity_indigenous: data.comunity_indigenous,
      birthdate: data.birthdate || '',
      gender: data?.gender || '',
      marital_status: data?.marital_status || maritalStatus?.[0]?.id || 1,
      ubigeo_birth_uuid: data?.ubigeo_birth_uuid || '',
      country_uuid: data?.country_uuid || '',
      disability: data?.disability || '',
      native_language: data?.native_language || '',
    })
    if (response.errors && response.errors.length > 0) {
      toast.error(
        <ToastCustom
          title="Error al actualizar los datos"
          description={response.errors?.join(', ')}
        />
      )
    } else {
      toast.success(
        <ToastCustom
          title="Datos actualizados"
          description="Los datos se actualizaron correctamente"
        />
      )
      window.scrollTo(0, 0)
      setTimeout(() => {
        window.location.reload()
      }, 3000)
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        className="space-y-8"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-12">
          <GeneralInformation defaultData={defaultData} />
          <hr className="border-gray-300" />
          <OriginBirthDay defaultData={defaultData} />
          <hr className="border-gray-300" />
          <DemographicInformation defaultData={defaultData} />
        </div>
        <div className="flex justify-end gap-4">
          <Button
            type="submit"
            disabled={!isDirty || loading}
          >
            Actualizar datos
          </Button>
        </div>
      </form>
    </Form>
  )
}