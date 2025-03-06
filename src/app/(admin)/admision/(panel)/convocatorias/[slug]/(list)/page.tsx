import {
  fetchProgramsCall,
  fetchTimelineByConvocatory,
} from '@/api/convocatory'
import { IProgramCallList, IResApi, ITimeline, SearchParams } from '@/types'
import { ProgramListPage } from '@/modules/admision'
import { APPLICATION_METADATA } from '@/config/metadata'
import { Metadata } from 'next'

interface Props {
  params: { slug: string }
  searchParams: SearchParams
}

export const metadata: Metadata =
  APPLICATION_METADATA.PAGES.PROGRAMS_CONVOCATORIES

export default async function Page(props: Props) {
  const { slug } = props.params
  const { searchParams } = props

  let programs: IResApi<IProgramCallList> = {
    count: 0,
    next: null,
    previous: null,
    results: [],
  }
  let sheduleData: ITimeline | null = null

  const typeProgram = searchParams?.type?.toString() || ''
  const upperCaseTypeProgram = typeProgram.toUpperCase()
  const query = searchParams?.query?.toString() || ''

  try {
    const res = await fetchProgramsCall({
      convocatory_token: slug,
      program_type_name: upperCaseTypeProgram,
      query: query,
    })
    programs = res?.data as IResApi<IProgramCallList>
  } catch (error) {
    console.error('Error fetching programs:', error)
  }

  try {
    // Fetch schedule
    const response = await fetchTimelineByConvocatory(slug)
    sheduleData = response?.data ? response.data : null
  } catch (error) {
    console.error('Error fetching shedule:', error)
  }

  return (
    <ProgramListPage
      programs={programs}
      programs_type={sheduleData?.programs || []}
    />
  )
}
