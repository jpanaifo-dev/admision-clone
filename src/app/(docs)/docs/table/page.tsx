import { HeaderSection, TabSection } from '@/components/app'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Table',
  description: 'Componente de table',
}

export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      <section>
        <HeaderSection
          title="Table"
          description="A table is a collection of data in rows and columns."
          showAddButton={false}
          showRefreshButton={false}
          showExportButton={false}
        />

        <TabSection
          code={`
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
 
export function SwitchDemo() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  )
}
        `}
        >
          <section className="w-full p-6 rounded-md">
            <div className="flex items-center space-x-2">
              <Switch id="airplane-mode" />
              <Label htmlFor="airplane-mode">Airplane Mode</Label>
            </div>
          </section>
        </TabSection>
      </section>
    </div>
  )
}
