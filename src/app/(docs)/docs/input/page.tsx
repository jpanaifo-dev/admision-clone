import { HeaderSection, InputSearch, TabSection } from '@/components/app'
import { Input } from '@/components/ui/input'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Input',
  description: 'Componente de input',
}

export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      <section>
        <HeaderSection
          title="Input"
          description="Displays a form input field or a component that looks like an input field."
          showAddButton={false}
          showRefreshButton={false}
          showExportButton={false}
        />

        <TabSection
          code={`
import { Input } from "@/components/ui/input"
 
export function InputDemo() {
        return <Input type="email" placeholder="Email" />
}
        `}
        >
          <section className="w-full p-6 rounded-md">
            <Input placeholder="Prueba de input" />
          </section>
        </TabSection>
      </section>
      <section>
        <HeaderSection
          title="Input Search"
          description="Displays a form input field or a component that looks like an input field with a search icon."
          showAddButton={false}
          showRefreshButton={false}
          showExportButton={false}
        />

        <TabSection
          code={`
import { InputSearch } from "@/components/ui/input"
 
export function InputDemo() {
        return <InputSearch placeholder="Buscar ..." />
}
        `}
        >
          <section className="w-full p-6 rounded-md">
            <InputSearch placeholder="Buscar ..." />
          </section>
        </TabSection>
      </section>
    </div>
  )
}
