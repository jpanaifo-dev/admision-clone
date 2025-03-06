import { HeaderSection, TabSection } from '@/components/app'
import { ContentInput } from '@/components/layouts'
import { Input } from '@/components/ui/input'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Layout Inputs',
  description: 'Componente de layout de inputs',
}

// const variants = ['sm', 'md', 'lg']

export default function Page() {
  return (
    <div>
      <HeaderSection
        title="Header Section"
        description="Componente de cabecera de sección, con título y descripción."
        showAddButton={false}
        showRefreshButton={false}
        showExportButton={false}
      />

      <TabSection
        code={`
import { ContentInput } from '@/components/layouts'
  export default function Page() {
    return (
      <div>
      <section className="w-full p-6 rounded-md flex flex-col gap-4">
          <ContentInput
            id="content-input"
            label="Prueba de input"
            description="Descripción de la prueba de input. Orientacion horizontal."
          >
            <Input placeholder="Prueba de input" />
          </ContentInput>
          <ContentInput
            id="content-input"
            label="Prueba de input"
            description="Descripción de la prueba de input. Orientacion vertical."
            orientation="vertical"
          >
            <Input placeholder="Prueba de input" />
          </ContentInput>
        </section>
      </div>
        )}
        `}
      >
        <section className="w-full p-6 rounded-md flex flex-col gap-6">
          <ContentInput
            id="content-input"
            label="Prueba de input"
            description="Descripción de la prueba de input. Orientacion horizontal."
          >
            <Input placeholder="Prueba de input" />
          </ContentInput>
          <ContentInput
            id="content-input"
            label="Prueba de input"
            description="Descripción de la prueba de input. Orientacion vertical."
            orientation="vertical"
          >
            <Input placeholder="Prueba de input" />
          </ContentInput>
        </section>
      </TabSection>
    </div>
  )
}
