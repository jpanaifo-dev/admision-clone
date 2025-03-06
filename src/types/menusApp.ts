import {
  BookUser,
  House,
  LayoutPanelTop,
  LucideIcon,
  Settings,
  Table,
  Table2,
  TextCursorInput,
  TriangleAlert,
  User,
  Users,
  ChartBarBig,
  Boxes,
  NotebookPen,
  IdCard,
  ArrowRightLeft,
  HandCoins,
  LayoutGrid,
} from 'lucide-react'

type Submenu = {
  href: string
  label: string
  active?: boolean
}

type Menu = {
  href: string
  label: string
  active?: boolean
  icon: LucideIcon
  submenus?: Submenu[]
}

type Group = {
  groupLabel: string
  menus: Menu[]
}

import { urlDataAdmisionAdmin } from '@/modules/admision'

export const menuAdminData: Group[] = [
  {
    groupLabel: '',
    menus: [
      {
        href: '/admin',
        label: 'Inicio',
        icon: House,
        submenus: [],
        active: false,
      },
    ],
  },
  {
    groupLabel: 'Usuarios',
    menus: [
      {
        href: '',
        label: 'Usuarios',
        icon: User,
        submenus: [
          {
            href: '/admin/usuarios',
            label: 'Lista de usuarios',
            active: false,
          },
          {
            href: '/admin/usuarios/inactivos',
            label: 'Usuarios sin acceso',
            active: false,
          },
        ],
      },
      {
        href: '',
        label: 'Roles',
        icon: Users,
        submenus: [
          {
            href: '/roles',
            label: 'Aplicaciones',
            active: false,
          },
          {
            href: '/roles/new',
            label: 'Roles',
            active: false,
          },
          {
            href: '/units',
            label: 'Unidades organizativas',
            active: false,
          },
        ],
      },
    ],
  },
  {
    groupLabel: 'Personal',
    menus: [
      {
        href: '',
        label: 'Gestión de personal',
        icon: BookUser,
        submenus: [
          {
            href: '/autoridades',
            label: 'Autoridades',
            active: false,
          },
        ],
      },
    ],
  },
  {
    groupLabel: 'Configuración',
    menus: [
      {
        href: '',
        label: 'Generales',
        icon: Settings,
        active: false,
        submenus: [
          {
            href: '/generales',
            label: 'Configuración general',
            active: false,
          },
          {
            href: '/institucional-year',
            label: 'Año institucional',
            active: false,
          },
        ],
      },
    ],
  },
]

export const menuAcademicosData: Group[] = [
  {
    groupLabel: '',
    menus: [
      {
        href: '/academic',
        label: 'Inicio',
        icon: House,
        submenus: [],
        active: false,
      },
    ],
  },
  {
    groupLabel: 'Matriculas',
    menus: [
      {
        href: '/academic/etapas-matriculas',
        label: 'Etapas de matriculas',
        icon: ChartBarBig,
      },
      {
        href: '/academic/grupos',
        label: 'Grupos',
        icon: Boxes,
      },
      {
        href: '/matriculas',
        label: 'Matriculas',
        icon: NotebookPen,
        submenus: [
          {
            label: 'Matriculas realizadas',
            href: '/academic/matriculas',
          },
          {
            label: 'Matricular estudiante',
            href: '/academic/matriculas/agregar',
          },
        ],
      },
    ],
  },
  {
    groupLabel: 'Expedientes',
    menus: [
      {
        href: '',
        label: 'Registros académicos',
        icon: IdCard,
        submenus: [
          {
            href: '/academic/estudiantes',
            label: 'Estudiante',
          },
        ],
      },
      {
        href: '',
        label: 'Traslado',
        icon: ArrowRightLeft,
      },
    ],
  },
]

export const menuDocsData: Group[] = [
  {
    groupLabel: '',
    menus: [
      {
        href: '/docs',
        label: 'Bienvenido',
        icon: House,
        submenus: [],
        active: false,
      },
    ],
  },
  {
    groupLabel: 'Componentes',
    menus: [
      {
        href: '',
        label: 'Alertas',
        icon: TriangleAlert,
        submenus: [
          {
            href: '/docs/alert-custom',
            label: 'Alerta personalizada',
            active: false,
          },
          {
            href: '/docs/alert-dialog-custom',
            label: 'Alerta de diálogo',
            active: false,
          },
          {
            href: '/docs/alert-messages',
            label: 'Mensajes de alerta',
            active: false,
          },
          {
            href: '/docs/toast-custom',
            label: 'Toast Custom',
            active: false,
          },
        ],
      },
      {
        href: '',
        label: 'Inputs',
        icon: TextCursorInput,
        submenus: [
          {
            href: '/docs/input',
            label: 'Inputs',
            active: false,
          },
          {
            href: '/docs/checkbox',
            label: 'Checkbox',
            active: false,
          },
          {
            href: '/docs/switch',
            label: 'Switch',
            active: false,
          },
          {
            href: '/docs/radio-group',
            label: 'Radio Group',
            active: false,
          },
          {
            href: '/docs/label-input',
            label: 'Layout Inputs',
            active: false,
          },
          {
            href: '/docs/multi-step-timeline',
            label: 'Multi Step Timeline',
            active: false,
          },
        ],
      },
      {
        href: '',
        label: 'Tablas',
        icon: Table,
        submenus: [],
      },
    ],
  },
  {
    groupLabel: 'Formularios',
    menus: [
      {
        href: '',
        label: 'Layouts',
        icon: Table2,
        submenus: [
          {
            href: '/docs/layout-form',
            label: 'Layout Form',
            active: false,
          },
        ],
      },
    ],
  },
  {
    groupLabel: 'Layouts',
    menus: [
      {
        href: '',
        label: 'Cabeceras',
        icon: LayoutPanelTop,
        submenus: [
          {
            href: '/docs/header-section',
            label: 'Header Section',
            active: false,
          },
          {
            href: '/docs/layout-section-page',
            label: 'Layout Section Page',
            active: false,
          },
        ],
      },
      {
        href: '',
        label: 'Footers',
        icon: LayoutPanelTop,
        submenus: [
          {
            href: '/docs/footer',
            label: 'Footer',
            active: false,
          },
        ],
      },
    ],
  },
]

export const menuEconomicData: Group[] = [
  {
    groupLabel: '',
    menus: [
      {
        href: '/economic',
        label: 'Inicio',
        icon: House,
        submenus: [],
        active: false,
      },
    ],
  },
  {
    groupLabel: 'Gestión de pagos',
    menus: [
      {
        href: '/economic/pagos',
        label: 'Pagos',
        icon: HandCoins,
        submenus: [
          {
            href: '/economic/pagos',
            label: 'Lista de pagos',
          },
          {
            href: '/economic/pagos/conciliar',
            label: 'Conciliar pagos',
          },
          {
            href: '/economic/pagos/importar',
            label: 'Importar pagos',
          },
        ],
      },
    ],
  },
  {
    groupLabel: 'Gestión de conceptos',
    menus: [
      {
        href: '/economic/conceptos',
        label: 'Conceptos',
        icon: LayoutGrid,
        submenus: [
          {
            href: '/economic/conceptos',
            label: 'Conceptos de pago',
          },
          {
            href: '/economic/conceptos/descuentos',
            label: 'Descuentos',
          },
        ],
      },
    ],
  },
  {
    groupLabel: 'Reportes',
    menus: [
      {
        href: '/economic/reportes',
        label: 'Reportes',
        icon: Table,
        submenus: [
          {
            href: '/economic/reportes',
            label: 'Reporte de pagos',
          },
          {
            href: '/economic/reportes/estudiantes',
            label: 'Reporte de estudiantes',
          },
          {
            href: '/economic/reportes/pensiones',
            label: 'Reporte pensiones',
          },
          {
            href: '/economic/reportes/programas',
            label: 'Reporte programas',
          },
        ],
      },
    ],
  },
]

export const menuTeacherData: Group[] = []

export const menuStudentData: Group[] = []

export const menuAdmisionAdminData: Group[] = [
  {
    groupLabel: '',
    menus: [
      {
        href: `${urlDataAdmisionAdmin.home.urls.base}`,
        label: 'Inicio',
        icon: House,
        submenus: [],
        active: false,
      },
    ],
  },
  {
    groupLabel: 'Gestión',
    menus: [
      {
        label: 'Convocatorias',
        href: `${urlDataAdmisionAdmin.convocation.urls.base}`,
        icon: Users,
        active: false,
        submenus: [
          {
            label: 'Convocatorias Activas',
            href: `${urlDataAdmisionAdmin.convocation.urls.base}`,
          },
          {
            label: 'Historial',
            href: `${urlDataAdmisionAdmin.convocation.urls.history}`,
          },
        ],
      },
      {
        label: 'Evaluaciones',
        href: `${urlDataAdmisionAdmin.admision.urls.base}`,
        icon: Table,
        active: false,
        submenus: [
          {
            label: 'Evaluaciones Activas',
            href: `${urlDataAdmisionAdmin.admision.urls.base}`,
          },
          {
            label: 'Historial',
            href: `${urlDataAdmisionAdmin.admision.urls.history}`,
          },
        ],
      },
    ],
  },
  {
    groupLabel: 'Reportes',
    menus: [
      {
        label: 'Reportes',
        href: `${urlDataAdmisionAdmin.reports.urls.base}`,
        icon: Table,
        active: false,
        submenus: [
          {
            label: 'Reportes',
            href: `${urlDataAdmisionAdmin.reports.urls.base}`,
          },
        ],
      },
    ],
  },
]
