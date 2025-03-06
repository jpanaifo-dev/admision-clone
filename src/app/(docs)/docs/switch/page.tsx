import { HeaderSection, SwitchCustom, TabSection } from '@/components/app'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Switch',
  description: 'Componente de switch',
}

export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      <section>
        <HeaderSection
          title="Switch"
          description="A control that allows the user to toggle between checked and not checked."
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
      <section>
        <HeaderSection
          title="Switch Custom"
          description="A control that allows the user to toggle between checked and not checked."
          showAddButton={false}
          showRefreshButton={false}
          showExportButton={false}
        />

        <TabSection
          code={`
import { SwitchCustom } from '@/components/app'
 
export function InputDemo() {
        return <SwitchCustom />
}
        `}
        >
          <section className="w-full p-6 rounded-md">
            <SwitchCustom />
          </section>
        </TabSection>
      </section>
    </div>
  )
}
