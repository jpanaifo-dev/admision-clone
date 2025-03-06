import { HeaderSection, TabSection } from '@/components/app'
import { LayoutFormContent } from '@/components/layouts'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Layout Form',
  description: 'Componente de formulario',
}

export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      <section>
        <HeaderSection
          title="Layout Form"
          description="Displays a form input field or a component that looks like an input field."
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
            <LayoutFormContent>
              <main className="flex flex-col gap-4 p-8">
                Acá irá el contenido del formulario
              </main>
            </LayoutFormContent>
          </section>
        </TabSection>
      </section>
    </div>
  )
}
