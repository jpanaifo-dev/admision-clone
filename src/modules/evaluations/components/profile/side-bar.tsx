import { Button } from '@/components/ui/button'

interface NavItem {
  title: string
  isActive?: boolean
}

export function SidebarNav() {
  const navItems: NavItem[] = [
    { title: 'Detalles' },
    { title: 'Información General', isActive: true },
    { title: 'Archivos Adjuntos' },
    { title: 'Historial personal' },
  ]

  return (
    <div className="w-64 space-y-1">
      {navItems.map((item) => (
        <Button
          key={item.title}
          variant="ghost"
          className={`w-full justify-start ${
            item.isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
          }`}
        >
          {item.title}
        </Button>
      ))}
    </div>
  )
}
