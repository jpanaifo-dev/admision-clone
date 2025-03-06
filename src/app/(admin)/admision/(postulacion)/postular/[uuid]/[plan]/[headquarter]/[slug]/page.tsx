import { Metadata } from 'next'
import { ApplicationDetailsView, Steps } from '@/modules/admision'
import {
  fetchProgramRequirements,
  fetchProgramsCallBanner,
} from '@/api/convocatory'
import { getUserAuth } from '@/lib/session'
import { IProgramBanner, IUserAuth } from '@/types'
import { ADMISSION_URLS_APP } from '@/config/urls-data/admission.urls.config'
import { TO_APPLY_METADATA } from '@/config/metadata'

export const metadata: Metadata = TO_APPLY_METADATA.PAGES.UPLOAD_DOCUMENTS
interface Props {
  params: { uuid: string; plan: string; headquarter: string; slug: string }
}

export default async function Page(props: Props) {
  const { uuid, plan, headquarter, slug } = props.params

  const filters = {
    convocatory_token: uuid,
    study_plan_token: plan,
    headquarter_token: headquarter,
  }

  const sessionData = await getUserAuth()
  const data: IUserAuth = sessionData as unknown as IUserAuth

  const requirements = await fetchProgramRequirements(slug)
  const programBanner = await fetchProgramsCallBanner(filters)

  if (!requirements.data) {
    return (
      <main>
        <div>Error al cargar los requisitos del programa</div>
      </main>
    )
  }

  return (
    <main>
      <section className="container mx-auto py-14 flex flex-col gap-10 justify-center items-center min-h-screen">
        <header className="w-max-2xl">
          <Steps
            currentStep={4}
            steps={[
              { title: 'Validar pago' },
              { title: 'Validar email' },
              { title: 'Confirmación' },
              { title: 'Subir documentos' },
            ]}
          />
        </header>
        <ApplicationDetailsView
          programBanner={programBanner?.data || ({} as IProgramBanner)}
          requirements={requirements?.data}
          userAuth={data}
          application_id={slug?.toString() || ''}
          convocatory_token={uuid}
          url_redirect={`${ADMISSION_URLS_APP.APPY_TO_PROGRAM.SUCCESS(
            uuid,
            plan,
            headquarter,
            slug
          )}`}
          hiddenBackButton
        />
      </section>
    </main>
  )
}
