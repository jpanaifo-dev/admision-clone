import { LayoutConvocatoryForm } from '@/modules/admin'

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ uuid: string }>
}) {
  const uuid = (await params).uuid

  return <LayoutConvocatoryForm uuid={uuid}>{children}</LayoutConvocatoryForm>
}
