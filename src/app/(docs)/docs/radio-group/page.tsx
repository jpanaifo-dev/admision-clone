import { HeaderSection, RadioGroupDynamic, TabSection } from '@/components/app'
import { RadioGroupDynamicItem } from '@/components/app/radio-group-dynamic'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Radio Group',
  description:
    'A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.',
}

const options = [
  {
    id: 'option-one',
    value: 'option-one',
    label: 'Option One',
    description: 'Description for option one',
  },
  {
    id: 'option-two',
    value: 'option-two',
    label: 'Option Two',
    description: 'Description for option two',
  },
]

export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      <section>
        <HeaderSection
          title="Radio Group"
          description="A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time."
          showAddButton={false}
          showRefreshButton={false}
          showExportButton={false}
        />

        <TabSection
          code={`
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup>
  )
}

        `}
        >
          <section className="w-full p-6 rounded-md">
            <RadioGroup defaultValue="option-one">
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="option-one"
                  id="option-one"
                />
                <Label htmlFor="option-one">Option One</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="option-two"
                  id="option-two"
                />
                <Label htmlFor="option-two">Option Two</Label>
              </div>
            </RadioGroup>
          </section>
        </TabSection>
      </section>
      <section>
        <HeaderSection
          title="Radio Group Dynamic"
          description="A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time."
          showAddButton={false}
          showRefreshButton={false}
          showExportButton={false}
        />

        <TabSection
          code={`
import {  RadioGroupDynamic} from '@/components/app'
import { RadioGroupDynamicItem } from '@/components/app/radio-group-dynamic'

const options = [
  {
    id: 'option-one',
    value: 'option-one',
    label: 'Option One',
    description: 'Description for option one',
  },
  {
    id: 'option-two',
    value: 'option-two',
    label: 'Option Two',
    description: 'Description for option two',
  },
]
 
export function RadioGroupDemo() {
        return (
         <section className="w-full p-6 rounded-md">
            <RadioGroupDynamic>
              {options.map((item) => (
                <RadioGroupDynamicItem
                  key={item.id}
                  id={item.id}
                  value={item.value}
                  description={item.description}
                >
                  {item.label}
                </RadioGroupDynamicItem>
              ))}
            </RadioGroupDynamic>
          </section>
        )
}
        `}
        >
          <section className="w-full p-6 rounded-md">
            <RadioGroupDynamic>
              {options.map((item) => (
                <RadioGroupDynamicItem
                  key={item.id}
                  id={item.id}
                  value={item.value}
                  description={item.description}
                  showWrapper
                >
                  {item.label}
                </RadioGroupDynamicItem>
              ))}
            </RadioGroupDynamic>
          </section>
        </TabSection>
      </section>
    </div>
  )
}
