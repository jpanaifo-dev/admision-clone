import { AlertCustom, HeaderSection, TabSection } from '@/components/app'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Alert Custom',
  description: 'Componente de alerta personalizado',
}

const variants = ['success', 'error', 'warning', 'info']

export default function Page() {
  return (
    <div>
      <HeaderSection
        title="Dialogo de alerta personalizado"
        description="Muestra un aviso para llamar la atención del usuario. Puede ser de tipo success, error, warning o info."
        showAddButton={false}
        showRefreshButton={false}
        showExportButton={false}
      />

      <TabSection
        code={`import { AlertCustom } from '@/components/app'

        export const SomeComponent = () => {

            return (
              <AlertCustom
              key={variant}
              showIcon
              radius='lg'
              type={variant as 'success' | 'error' | 'warning' | 'info'}
              title="Heads up!"
              message="You can add components to your app using the cli."
            />
            )
        }

    `}
      >
        <section className="w-full flex flex-col items-center gap-5">
          {variants.map((variant) => (
            <AlertCustom
              key={variant}
              showIcon
              radius="md"
              variant="step"
              type={variant as 'success' | 'error' | 'warning' | 'info'}
              title="Heads up!"
            >
              You can add components to your app using the cli.
            </AlertCustom>
          ))}
        </section>
      </TabSection>
    </div>
  )
}
