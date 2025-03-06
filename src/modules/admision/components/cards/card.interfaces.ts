export interface ProfileInfoCardProps {
  id?: number
  title: string
  subtitle?: string
  company: string
  country?: string
  modality?: string
  start_date?: string
  end_date?: string | null
  variant?: 'academic' | 'job' | 'language'
  hrefEdit?: string
  isFileUrl?: string
}

export interface ConvocationCardProps {
  id: string
  status: 'active' | 'inactive'
  title: string
  description: string
  isActive?: boolean
}

export interface ProgramTypeCardProps {
  title: string
  url: string
  quantity: number
  color?: 'primary' | 'secondary' | 'success' | 'danger'
}

export interface ApplicationCardProps {
  title: string
  postulatedAt: string
  program_name: string
  documents: string[]
  observations: string
  status: string
  isOpen?: boolean
  variant?: 'default' | 'warning' | 'danger'
  url_link?: string
}

export interface ActionCardProps {
  icon: JSX.Element
  title: string
  description: string
  link: string
  isDisabled?: boolean
}

export interface AdmissionCardProps {
  title: string
  subtitle: string
  dateRange: string
  programCount: number
  requirementCount: number
  hasRequirements: boolean
  isActive?: boolean
  onEdit?: () => void
  onDetails?: string
}

export interface ProgramDetailCardProps {
  title: string
  plan: string
  deadline: string
  startDate: string
  modality: string
  areas: string
  headquarter?: string
  adress_headquarter?: string
}
