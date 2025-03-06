'use client'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { useState } from 'react'
import { HeaderFormSection } from '@/components/layouts'

export const UserRolesData = () => {
  const [accessType, setAccessType] = useState('no-access')

  const isAdminAccessEnabled = accessType === 'admin-access'
  return (
    <section
      id="user-info-basic"
      className="w-full p-4 flex flex-col gap-3"
    >
      <HeaderFormSection
        title="Asignar roles"
        description="Puede elegir el rol que desea asignar a este usuario y rellenar la información de perfil adicional."
      />
      <div className="space-y-6">
        <RadioGroup
          value={accessType}
          onValueChange={setAccessType}
          className="space-y-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="no-access"
              id="no-access"
            />
            <Label htmlFor="no-access">Usuario sin acceso al sistema</Label>
          </div>
          <div className="flex items-start space-x-2">
            <RadioGroupItem
              value="admin-access"
              id="admin-access"
              className="mt-1"
            />
            <div>
              <Label htmlFor="admin-access">
                Dar acceso a módulos de administración
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Los roles de administrador ofrecen permiso a los usuarios para
                ver los datos y completar las tareas en los centros de
                administración. Asigne el rol menos permisivo para que los
                usuarios solo tengan el acceso que necesitan.
              </p>
            </div>
          </div>
        </RadioGroup>

        <div className="space-y-4 ml-6">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="docente"
              disabled={!isAdminAccessEnabled}
            />
            <div>
              <Label
                htmlFor="docente"
                className={!isAdminAccessEnabled ? 'opacity-50' : ''}
              >
                DOCENTE
              </Label>
              <p
                className={`text-sm text-muted-foreground ${
                  !isAdminAccessEnabled ? 'opacity-50' : ''
                }`}
              >
                Gestiona alumnos, asigna calificaciones y supervisa el progreso
                académico.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="estudiante"
              disabled={!isAdminAccessEnabled}
            />
            <div>
              <Label
                htmlFor="estudiante"
                className={!isAdminAccessEnabled ? 'opacity-50' : ''}
              >
                ESTUDIANTE
              </Label>
              <p
                className={`text-sm text-muted-foreground ${
                  !isAdminAccessEnabled ? 'opacity-50' : ''
                }`}
              >
                Accede a calificaciones, materiales de clase, y realiza
                seguimiento académico.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="administrador"
                disabled={!isAdminAccessEnabled}
              />
              <div>
                <Label
                  htmlFor="administrador"
                  className={!isAdminAccessEnabled ? 'opacity-50' : ''}
                >
                  ADMINISTRADOR
                </Label>
                <p
                  className={`text-sm text-muted-foreground ${
                    !isAdminAccessEnabled ? 'opacity-50' : ''
                  }`}
                >
                  Supervisa usuarios, administra configuraciones, y gestiona el
                  sistema educativo.
                </p>
              </div>
            </div>

            <div className="ml-6 space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="panel-academicos"
                  disabled={!isAdminAccessEnabled}
                />
                <Label
                  htmlFor="panel-academicos"
                  className={!isAdminAccessEnabled ? 'opacity-50' : ''}
                >
                  PANEL DE ACADEMICOS
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="panel-economicos"
                  disabled={!isAdminAccessEnabled}
                />
                <Label
                  htmlFor="panel-economicos"
                  className={!isAdminAccessEnabled ? 'opacity-50' : ''}
                >
                  PANEL DE ECONOMICOS
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="panel-otro"
                  disabled={!isAdminAccessEnabled}
                />
                <Label
                  htmlFor="panel-otro"
                  className={!isAdminAccessEnabled ? 'opacity-50' : ''}
                >
                  PANEL OTRO
                </Label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
