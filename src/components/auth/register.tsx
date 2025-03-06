'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Eye, EyeOff, Loader, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { AuthLayout } from '@/modules/auth'
import { useRouter } from 'next/navigation'
import { IUserCreate } from '@/types'
import { createAccount } from '@/api/auth'
import { AlertCustom, ToastCustom } from '../app'
import { toast } from 'react-toastify'
import { useSearchParams } from 'next/navigation'
import { useDocumentTypes } from '@/modules/admision'
import { fetchDocument } from '@/api/consults'
import { getUserPerson } from '@/api/persons'

import { registerSchema, RegisterFormValues } from '@/modules/auth'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'
import { InputPassword } from './input-password'

export const Register = () => {
  const { documentTypes } = useDocumentTypes()
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [accepted, setAccepted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [inputsDisabled, setInputsDisabled] = useState(false)
  const [loadingDocument, setLoadingDocument] = useState(false)
  const [userExists, setUserExists] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()
  const searchEmail = searchParams.get('email') || ''

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      documentType: documentTypes[0]?.id || 1,
      documentNumber: '',
      nombres: '',
      primerApellido: '',
      segundoApellido: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: RegisterFormValues) => {
    setLoading(true)
    const userData: IUserCreate = {
      document_number: data.documentNumber,
      document_type: data.documentType,
      email: searchEmail,
      last_name1: data.primerApellido,
      last_name2: data.segundoApellido,
      names: data.nombres,
      password: data.password,
      confirmPassword: data.confirmPassword,
    }

    try {
      const response = await createAccount(userData)
      if (response.status === 201) {
        toast.success(
          <ToastCustom
            title="Registro exitoso"
            description={`${response.data?.email} ha sido registrado correctamente.`}
          />
        )
        router.push('/login')
      } else {
        toast.error(
          <ToastCustom
            title="Error al registrar"
            description={`Error: ${response.errors?.join(', ')}`}
          />
        )
      }
    } catch (error) {
      const errorResponse = (await error) as unknown as { errors: string[] }
      toast.error(
        <ToastCustom
          title="Error al registrar"
          description={`Error: ${errorResponse.errors.join(', ')}`}
        />
      )
    }
    setLoading(false)
  }

  async function getPersonInfoByDocument(document: string) {
    setLoadingDocument(true)
    if (!document) return
    if (document.length < 8) {
      toast.error(
        <ToastCustom
          title="Error"
          description="El número de documento debe tener al menos 8 dígitos."
        />
      )
      return
    }

    await getUserPerson({
      document_number: document,
    }).then(async (data) => {
      if (data?.status === 200) {
        if (data?.data && data.data.length > 0) {
          form.setValue('nombres', data?.data?.[0].person.names)
          form.setValue('primerApellido', data.data[0].person.last_name1)
          form.setValue('segundoApellido', data.data[0].person.last_name2)
          if (data.data[0].user !== null && data.data[0].user !== undefined) {
            toast.error(
              <ToastCustom
                title="Error"
                description={`Ya existe una cuenta registrada de ${data.data[0].person?.full_name}.`}
              />
            )
            setUserExists(true)
          } else {
            toast.success(
              <ToastCustom
                title="Persona encontrada"
                description={`Se ha encontrado a ${data.data[0].person?.full_name}.`}
              />
            )
          }
          setInputsDisabled(true)
        } else {
          await fetchDocument(document).then((data) => {
            if (data?.estado === true) {
              form.setValue('nombres', data.resultado.nombres)
              form.setValue('primerApellido', data.resultado.apellido_paterno)
              form.setValue('segundoApellido', data.resultado.apellido_materno)
              toast.success(
                <ToastCustom
                  title="Persona encontrada"
                  description={`Se ha encontrado a ${data.resultado.nombre_completo}.`}
                />
              )
              setInputsDisabled(true)
            } else {
              toast.error(
                <ToastCustom
                  title="Error"
                  description="Persona no encontrada, por favor ingrese sus datos requeridos."
                />
              )
            }
          })
        }
      } else {
        await fetchDocument(document).then((data) => {
          if (data?.estado === true) {
            form.setValue('nombres', data.resultado.nombres)
            form.setValue('primerApellido', data.resultado.apellido_paterno)
            form.setValue('segundoApellido', data.resultado.apellido_materno)
            toast.success(
              <ToastCustom
                title="Persona encontrada"
                description={`Se ha encontrado a ${data.resultado.nombre_completo}.`}
              />
            )
            setInputsDisabled(true)
          } else {
            toast.error(
              <ToastCustom
                title="Error"
                description="Persona no encontrada, por favor ingrese sus datos requeridos."
              />
            )
          }
        })
      }
    })
    setTimeout(() => {
      setLoadingDocument(false)
    }, 1000)
  }

  return (
    <AuthLayout>
      <header className="space-y-2">
        <h2 className="text-2xl font-bold">Crear cuenta</h2>
        <p className="text-sm text-gray-600">
          ¿Ya tienes cuenta?{' '}
          <Link
            href="/login"
            className="text-blue-600 hover:underline"
          >
            Iniciar sesión
          </Link>
        </p>
      </header>

      {userExists && (
        <AlertCustom
          type="error"
          title="Usuario ya existente"
          showIcon
        >
          <p>
            Ya existe una cuenta registrada con los datos ingresados. Por favor
            inicia sesión.
          </p>
        </AlertCustom>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="documentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de documento</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar tipo de documento" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {documentTypes.map((type) => (
                        <SelectItem
                          key={type.id}
                          value={type.id.toString()}
                        >
                          {type.abbreviation}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <section className="flex items-end space-x-2">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="documentNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>N° de documento</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="search"
                          onChange={(e) => {
                            field.onChange(e.target.value)
                            setInputsDisabled(false)
                            if (e.target.value === '') {
                              form.setValue('nombres', '')
                              form.setValue('primerApellido', '')
                              form.setValue('segundoApellido', '')
                              setUserExists(false)
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {form.watch('documentType') === 1 && (
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="secondary"
                        size="icon"
                        type="button"
                        onClick={() =>
                          getPersonInfoByDocument(form.watch('documentNumber'))
                        }
                        disabled={loadingDocument}
                      >
                        {loadingDocument ? (
                          <Loader
                            size={16}
                            className="animate-spin"
                          />
                        ) : (
                          <Search size={16} />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="dark">
                      <p>Consultar tu número de DNI desde la RENIEC </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </section>

            <FormField
              control={form.control}
              name="nombres"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombres</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={inputsDisabled}
                      readOnly={inputsDisabled}
                      onChange={(e) => {
                        if (!inputsDisabled) {
                          field.onChange(e.target.value)
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="primerApellido"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primer apellido</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={inputsDisabled}
                        readOnly={inputsDisabled}
                        onChange={(e) => {
                          if (!inputsDisabled) {
                            field.onChange(e.target.value)
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="segundoApellido"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Segundo apellido</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={inputsDisabled}
                        readOnly={inputsDisabled}
                        onChange={(e) => {
                          if (!inputsDisabled) {
                            field.onChange(e.target.value)
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {!userExists && (
            <>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña con indicador de fortaleza</FormLabel>
                    <FormControl>
                      <InputPassword {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar contraseña</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="Confirmar contraseña"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={accepted}
                  onCheckedChange={(checked) => setAccepted(checked as boolean)}
                  required
                />
                <Label
                  htmlFor="terms"
                  className="text-sm leading-none"
                >
                  Acepto las{' '}
                  <Link
                    href="/terms"
                    className="text-blue-600 hover:underline"
                  >
                    Condiciones de servicio
                  </Link>{' '}
                  y la{' '}
                  <Link
                    href="/privacy"
                    className="text-blue-600 hover:underline"
                  >
                    política de privacidad
                  </Link>{' '}
                  de EPG - UNAP
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#001B3D]"
                disabled={!accepted || loading}
              >
                Crear cuenta
                {loading && <Loader className="ml-2 animate-spin" />}
              </Button>
            </>
          )}
        </form>
      </Form>
      {userExists && (
        <footer className="w-full">
          <Button
            type="button"
            onClick={() => {
              form.setValue('documentNumber', '')
              form.setValue('nombres', '')
              form.setValue('primerApellido', '')
              form.setValue('segundoApellido', '')
              setUserExists(false)
              setInputsDisabled(false)
            }}
            variant="ghost"
            className="w-full border"
          >
            Consultar otro documento
          </Button>
        </footer>
      )}
    </AuthLayout>
  )
}
