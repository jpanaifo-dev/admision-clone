'use client'
import { useSidebar, useStore } from '@/hooks'
import { cn } from '@/lib/utils'
// export const LayoutForm = ({ children,  }: { children: ReactNode }) => {
//   return (
//     <>
//       <HeaderSection
//         title={isEditMode ? UPDATE.title : CREATE.title}
//         description={isEditMode ? UPDATE.description : CREATE.description}
//         disabledActions
//       />
//     </>
//   )
// }

export const FooterForm = ({ children }: { children: React.ReactNode }) => {
  const sidebar = useStore(useSidebar, (x) => x)
  if (!sidebar) return null
  const { getOpenState } = sidebar
  return (
    <footer
      className={cn(
        'fixed bottom-0  w-full flex right-0 justify-center bg-white shadow-lg border-t-1 md:left-[288px]',
        !getOpenState()
          ? 'lg:left-[90px]  max-w-[calc(100%-90px)]'
          : 'lg:left-[288px]  max-w-[calc(100%-288px)]'
      )}
    >
      <div className="flex items-center justify-between w-full max-w-5xl py-2">
        {children}
      </div>
    </footer>
  )
}
