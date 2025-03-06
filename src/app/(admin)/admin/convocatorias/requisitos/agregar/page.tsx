import CreateRequirementForm from '@/modules/admin/pages/requirements/create-requirement-form'
import { Suspense } from 'react'

export default function Page() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <CreateRequirementForm />
      </Suspense>
    </>
  )
}
