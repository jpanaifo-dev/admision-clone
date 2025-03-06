import { Calendar, Bell } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export const EventsAndNotifications = () => {
  const events = [
    {
      title: 'Entrega de documentos - Maestría en Gestión Pública',
      startDate: '15 Marzo 2024',
      endDate: '15 Marzo 2024',
    },
    {
      title: 'Inicio de clases - Diplomado en Gobernabilidad',
      startDate: '15 Marzo 2024',
      endDate: '15 Marzo 2024',
    },
  ]

  const notifications = [
    {
      title: 'Documentos pendientes',
      message: 'Tienes documentos pendientes por subir para tu postulación.',
    },
    {
      title: 'Documentos pendientes',
      message: 'Tu pago para el Diplomado ha sido confirmado exitosamente.',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Events Section */}
      <div className="space-y-4">
        <h2 className="font-semibold text-lg">Próximos eventos</h2>
        <div className="space-y-4">
          {events.map((event, index) => (
            <Card
              key={index}
              className="bg-gray-50 border-gray-100"
            >
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{event.title}</p>
                    <div className="flex gap-2 text-sm text-gray-600">
                      <span>{event.startDate}</span>
                      <span>{event.endDate}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Notifications Section */}
      <div className="space-y-4">
        <h2 className="font-semibold text-lg">Notificaciones</h2>
        <div className="space-y-4">
          {notifications.map((notification, index) => (
            <Card
              key={index}
              className="bg-gray-50 border-gray-100"
            >
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <Bell className="w-5 h-5 text-blue-600" />
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{notification.title}</p>
                    <p className="text-sm text-gray-600">
                      {notification.message}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
