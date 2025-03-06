import React from 'react'
import { LayoutAplicationAside, LayoutAplicationPreview } from '../../layouts'
import { IProgramBanner, IRequirementProgram, IUserAuth } from '@/types'
import { ProgramViewSection } from './program-view-section'
import { PaymentViewSection } from './payment-view-section'
import { RequirementsViewSection } from './requirements-view-section'
interface IProps {
  programBanner: IProgramBanner
  requirements: IRequirementProgram[]
  userAuth: IUserAuth
  application_id: string
  url_redirect: string
  hiddenBackButton?: boolean
  convocatory_token: string
}

export const ApplicationDetailsView = ({
  programBanner,
  requirements,
  application_id,
  userAuth,
  url_redirect,
  hiddenBackButton,
  convocatory_token,
}: IProps) => {
  return (
    <LayoutAplicationPreview>
      <main className="w-full flex flex-col gap-4 lg:gap-6">
        <ProgramViewSection
          url_redirect={url_redirect}
          programData={programBanner}
          hiddenBackButton={hiddenBackButton}
        />
        <RequirementsViewSection
          programRequirement={requirements}
          application_id={application_id}
          userAuth={userAuth}
          url_redirect={url_redirect}
          convocatory_token={convocatory_token}
          inCall={programBanner?.is_active}
        />
      </main>
      <LayoutAplicationAside>
        <PaymentViewSection programBanner={programBanner} />
      </LayoutAplicationAside>
    </LayoutAplicationPreview>
  )
}
