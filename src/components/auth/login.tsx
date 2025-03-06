'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { EyeIcon, EyeOffIcon, Loader } from 'lucide-react'
import { AuthLayout } from '@/modules/auth'
import { fetchLogin } from '@/api/auth'
import { toast } from 'react-toastify'
import { ToastCustom } from '../app'
import { useRouter } from 'next/navigation'
import { ADMISSION_URLS_APP } from '@/config/urls-data/admission.urls.config'
import { ADMIN_URLS_APP } from '@/config/urls-data/admin.urls.config'
import { AUTH_URLS_APP } from '@/config/urls-data/auth.urls.config'
import { LoginFormValues, LoginProps, loginSchema } from './auth.interface'
import { LoginAuth } from './login-auth'
import { SessionProvider } from 'next-auth/react'

export const Login = (props: LoginProps) => {
  const { path } = props
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorsList, setErrorsList] = useState<Array<string>>([])

  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true)
    setErrorsList([])

    const response = await fetchLogin(data, path)
    if (response.status === 200 && response.data) {
      toast.success(
        <ToastCustom
          title="Inicio de sesión exitoso"
          description={`Bienvenido, ${response?.data?.first_name} ${response?.data?.last_name}.`}
        />
      )
      if (path === 'admin') {
        router.push(ADMIN_URLS_APP.HOME.URL_BASE)
      } else {
        router.push(ADMISSION_URLS_APP.HOME.URL_BASE)
      }
    } else {
      setErrorsList(response.errors || ['Error desconocido.'])
    }

    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  return (
    <AuthLayout>
      <div className="text-center lg:text-left">
        <h2 className="text-2xl font-bold mb-2">Bienvenido de vuelta</h2>
        <p className="text-sm text-muted-foreground">
          No tienes una cuenta?{' '}
          <Link
            href={AUTH_URLS_APP.CREATE_ACCOUNT.URL_BASE}
            className="text-blue-600 hover:underline"
          >
            Crear cuenta
          </Link>
        </p>
      </div>
      {errorsList?.length > 0 && (
        <section className="bg-danger-50 border border-danger-200 text-danger-800 px-4 py-3 rounded relative dark:bg-danger-500 dark:border-danger-400 dark:text-danger-100">
          <ul className="flex flex-col gap-1">
            {errorsList?.map((error, index) => (
              <li
                key={index}
                className="text-red-500 text-sm list-disc list-inside"
              >
                {error}
              </li>
            ))}
          </ul>
        </section>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="space-y-4">
          {/* Campo de email */}
          <div>
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  placeholder="Usuario"
                  className="w-full"
                />
              )}
            />
            {errors?.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors?.username?.message}
              </p>
            )}
          </div>

          {/* Campo de contraseña */}
          <div className="relative">
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  className="w-full pr-10"
                />
              )}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? (
                <EyeOffIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
            {errors?.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors?.password?.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end">
          <Link
            href={AUTH_URLS_APP.FORGOT_PASSWORD.URL_BASE}
            className="text-sm text-blue-600 hover:underline"
          >
            Recuperar contraseña
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#001529] hover:bg-[#002140]"
          disabled={loading}
        >
          {loading && <Loader className="w-6 h-6 mr-2 animate-spin" />}
          Iniciar sesión
        </Button>
        <div className="flex items-center justify-center gap-2">
          <hr className="flex-grow" />
          <span>o</span>
          <hr className="flex-grow" />
        </div>
        <SessionProvider>
          <LoginAuth path={path} />
        </SessionProvider>
      </form>
    </AuthLayout>
  )
}
