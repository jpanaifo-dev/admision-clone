import { fetchModalities } from '@/api/admission/modality'
import { fetchConvocatory } from '@/api/convocatory'
import { fetchKnowledgeArea } from '@/api/convocatory/knowledge_area'
import { fecthProgramType } from '@/api/convocatory/program-type'
import { fetchProgramStudyPlan } from '@/api/convocatory/programs-study-plan'
import { fetchHeadquarter } from '@/api/core-service/headquarter'
import { AddProgramStep } from '@/modules/admin/pages/new-admissions/steps'

export default async function page({
  params,
  searchParams,
}: {
  params: Promise<{ uuid: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  // const uuid = (await params).uuid
  // const convocatory = await fetchConvocatory({ uuid: uuid })
  // const timeline = await fetchTimeline({ convocatory__uuid: uuid })
  const uuid = (await params).uuid
  const { program_type = '', area = '', search = '' } = await searchParams

  const programType = Array.isArray(program_type)
    ? program_type.join(' ')
    : program_type
  const knowArea = Array.isArray(area) ? area.join(' ') : area
  const searchQuery = Array.isArray(search) ? search.join(' ') : search

  const headquarters = await fetchHeadquarter()
  const programsTypes = await fecthProgramType()
  const knowledgeArea = await fetchKnowledgeArea()
  const modalities = await fetchModalities()
  const plants = await fetchProgramStudyPlan({
    is_active: true,
    program_type: programType,
    area__id: knowArea,
    search: searchQuery,
  })
  const convocatory = await fetchConvocatory({ uuid })

  return (
    <>
      <AddProgramStep
        data={plants.data}
        uuid={uuid}
        headquarters={headquarters.data}
        programsTypes={programsTypes.data}
        knowledgeArea={knowledgeArea.data}
        modalities={modalities.data}
        convocatory={convocatory.data}
      />
    </>
  )
}
