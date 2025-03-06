import { Book, GraduationCap, Coins } from 'lucide-react'
import { ActionCard } from '../../components'
import { ADMISSION_URLS_APP } from '@/config/urls-data/admission.urls.config'

export const ActionCards = () => {
  const cards = [
    {
      icon: <Book className="w-6 h-6 " />,
      title: 'Convocatorias',
      description: 'Explora nuestros programas académicos',
      link: ADMISSION_URLS_APP.CONVOCATION.URL_BASE,
    },
    {
      icon: <GraduationCap className="w-6 h-6 " />,
      title: 'Postulaciones',
      description: 'Revisa el estado de tus postulaciones',
      link: ADMISSION_URLS_APP.APPLICATION.URL_BASE,
    },
    {
      icon: <Coins className="w-6 h-6 " />,
      title: 'Pagos',
      description: 'Realiza tus pagos pendientes',
      link: '#',
      isDisabled: true,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map((card, index) => (
        <ActionCard
          key={index}
          {...card}
        />
      ))}
    </div>
  )
}
