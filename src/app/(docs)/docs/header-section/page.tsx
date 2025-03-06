import { HeaderSection, TabSection } from '@/components/app'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Header Section',
  description: 'Componente de cabecera de sección',
}

const variants = ['sm', 'md', 'lg']

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
        code={`import { HeaderSection,} from '@/components/app

            const variants = ['sm', 'md', 'lg']

            export default function Page() {
                return (
           <div>
            {variants.map((size) => (
            <HeaderSection
              key={size}
              title={'Título de la sección'}
              description={'Descripción de la sección'}
              size={size as 'sm' | 'md' | 'lg'}
            />
          ))}
            </div>
        )
          }
        '`}
      >
        <section className="w-full p-6 rounded-md">
          {variants.map((size) => (
            <HeaderSection
              key={size}
              title={`Título de la sección (${size})`}
              description={`Descripción de la sección (${size})`}
              size={size as 'sm' | 'md' | 'lg'}
              disabledActions
            />
          ))}
        </section>
      </TabSection>
    </div>
  )
}
