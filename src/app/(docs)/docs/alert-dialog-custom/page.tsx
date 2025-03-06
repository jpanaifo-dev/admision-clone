import { HeaderSection, TabSection, ConfirmationModal } from '@/components/app'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Alert Dialog Custom',
  description: 'Componente de alerta personalizado',
}

export default function Page() {
  return (
    <div>
      <HeaderSection
        title="Dialogo de alerta personalizado"
        description="Dialogo de alerta personalizado con botones de acción y cancelación."
        showAddButton={false}
        showRefreshButton={false}
        showExportButton={false}
      />

      <TabSection
        code={`import { ConfirmationModal } from '@/components/app'

            export const SomeComponent = () => {

                return (
                    <ConfirmationModal 
                    title="¿Estás seguro de que deseas eliminar este elemento?">
                        Este es una prueba de alerta personalizada
                    </ConfirmationModal>
                )
            }

        `}
      >
        <section className="max-w-lg shadow-lg p-6 rounded-md w-full flex flex-col">
          <ConfirmationModal
            title="¿Estás seguro de que deseas eliminar este elemento?"
            description="Este es una prueba de alerta personalizada"
          />
        </section>
      </TabSection>
    </div>
  )
}
