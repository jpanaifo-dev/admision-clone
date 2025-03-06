import { HeaderSection, TabSection, MultiStepTimeline } from '@/components/app'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Multi Step Timeline',
  description: 'Componente de timeline con múltiples pasos',
}

export default function Page() {
  return (
    <div>
      <HeaderSection
        title="Mensajes de alerta"
        description='Son tarjetas con mensajes de alerta, que pueden ser de tipo "success", "info", "warning" o "error".'
        showAddButton={false}
        showRefreshButton={false}
        showExportButton={false}
      />

      <TabSection
        code={`import { MultiStepTimeline } from '@/components/app

             <MultiStepTimeline
            steps={[
              {
                id: '1',
                title: 'Paso 1',
                description: 'Descripción del paso 1',
              },
              {
                id: '2',
                title: 'Paso 2',
                description: 'Descripción del paso 2',
              },
              {
                id: '3',
                title: 'Paso 3',
                description: 'Descripción del paso 3',
              },
              
            ]}
          />

        '`}
      >
        <section className="max-w-lg shadow-lg p-6 rounded-md w-full">
          <MultiStepTimeline
            selectedStep={'1'}
            steps={[
              {
                id: '1',
                title: 'Paso 1',
                description: 'Descripción del paso 1',
              },
              {
                id: '2',
                title: 'Paso 2',
                description: 'Descripción del paso 2',
              },
              {
                id: '3',
                title: 'Paso 3',
                description: 'Descripción del paso 3',
              },
            ]}
          />
        </section>
      </TabSection>
    </div>
  )
}
