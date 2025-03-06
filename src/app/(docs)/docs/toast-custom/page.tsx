import { Metadata } from 'next'
import { ToastCustom } from '@/components/app'

export const metadata: Metadata = {
  title: 'Toast Custom',
  description: 'Componente de toast custom',
}

export default function Page() {
  return (
    <div>
      <ToastCustom
        title="Successfully sent email to"
        description="john@example.com"
      />
    </div>
  )
}
