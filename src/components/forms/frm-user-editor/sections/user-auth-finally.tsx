import { ContentInput, HeaderFormSection } from '@/components/layouts'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'

export const UserAuthFinally = () => {
  return (
    <section
      id="user-info-basic"
      className="w-full p-4"
    >
      <HeaderFormSection
        title="Crear usuario y finalizar"
        description="Revisa las configuraciones finales para el usuario y guarda los cambios"
      />
      <ContentInput
        id="username"
        label="Nombre de usuario"
        description="Ingrese el nombre de usuario para el acceso al sistema"
      >
        <Input placeholder="Nombre de usuario: juanperez" />
      </ContentInput>
      <hr className="my-4 border-t border-gray-300" />
      <ContentInput
        id="password"
        label="Contraseña"
        description="Ingrese la contraseña para el acceso al sistema"
      >
        <section className="flex flex-col gap-4">
          <PasswordInput
            placeholder="Contraseña: ********"
            value={'hola'}
          />
          <div className="flex items-center space-x-2">
            <Checkbox id="show-password" />
            <section>
              <label
                htmlFor=""
                className=""
              >
                Crear contraseña por defecto
              </label>
              <p className="text-xs text-gray-500">
                Si selecciona esta opción la contraseña sera el número de
                documento ingresado
              </p>
            </section>
          </div>
        </section>
      </ContentInput>
    </section>
  )
}
