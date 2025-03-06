import { fetchConvocatory, fetchTimelineByConvocatory } from '@/api/convocatory';
import { ITimeline, IConvocatory } from '@/types/admission';

export async function getConvocatoryData(etapa?: string) {
  try {
    // Fetch convocatorias
    const convocatoryResponse = await fetchConvocatory({ is_active: true });
    const convocatorias: IConvocatory[] = convocatoryResponse.data || [];
    const isEmpty = convocatorias.length === 0;

    // Fetch schedule if `etapa` is provided
    let scheduleList: ITimeline | null = null;
    if (etapa) {
      const timelineResponse = await fetchTimelineByConvocatory(etapa.toString());
      scheduleList = timelineResponse?.data || null;
    }

    const convocatoriaSelected = convocatorias.find((conv) => conv?.uuid === etapa);

    return { convocatorias, isEmpty, scheduleList, convocatoriaSelected };
  } catch (error) {
    console.error('Error fetching convocatory data:', error);
    throw new Error('Failed to fetch convocatory data');
  }
}
