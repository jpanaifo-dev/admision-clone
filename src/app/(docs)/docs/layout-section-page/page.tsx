import { HeaderSection, TabSection } from '@/components/app'
import { LayoutSectionPage } from '@/components/layouts'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Layout Section Page',
  description: 'Componente de layout de sección de página',
}

export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      <section>
        <HeaderSection
          title="Layout Section Page"
          description="Displays a layout section page with a header and a main section."
          showAddButton={false}
          showRefreshButton={false}
          showExportButton={false}
        />

        <TabSection
          size="4xl"
          code={`
import { Input } from "@/components/ui/input"
 
export function InputDemo() {
        return <Input type="email" placeholder="Email" />
}
        `}
        >
          <section className="w-full p-6 rounded-md relative">
            <LayoutSectionPage
              title="Titulo de seccion"
              description="Descripcion de la seccion"
            >
              Hola
            </LayoutSectionPage>
          </section>
        </TabSection>
      </section>
    </div>
  )
}
