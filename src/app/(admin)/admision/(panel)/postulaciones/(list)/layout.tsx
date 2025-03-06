import { BannerSection } from '@/components/app'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <BannerSection
        title="Historial de postulaciones"
        description="Registro de todas las postulaciones realizadas, incluyendo detalles de cada aplicación"
      />
      {children}
    </>
  )
}
