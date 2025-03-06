import { AdmissionDetails } from "@/modules/admision/pages/convocatory/details-admission-components/admission-details";
import { ProgramsDetail } from "@/modules/admision/pages/convocatory/details-admission-components/programs-details";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { getConvocatories } from "@/api/admission/fetch-convocatory";
import { getTimeline } from "@/api/admission/fetch_timeline";

export default async function page({
    params,
}: {
    params: Promise<{ details: string }>;
}) {
    const response = await getConvocatories();
    const timeline = await getTimeline();

    const encodedDetails = (await params).details;
    const details = decodeURIComponent(encodedDetails);

    const filteredConvocatories =
        response.data && Array.isArray(response.data)
            ? response.data.filter(
                (convocatory) => convocatory.description === details
            )
            : [];

    const filteredTimeline =
        timeline?.data && Array.isArray(timeline.data)
            ? timeline.data.filter((t) =>
                filteredConvocatories.some(
                    (convocatory) => convocatory.id === t.convocatory
                )
            )
            : [];

    return (
        <>
            <Tabs defaultValue="admission" className="w-full py-4">
                <TabsList className="grid grid-cols-2 w-96">
                    <TabsTrigger value="admission">Detalles de convocatoria</TabsTrigger>
                    <TabsTrigger value="program">Programas asignados</TabsTrigger>
                </TabsList>
                <TabsContent value="admission" className="w-full">
                    <AdmissionDetails
                        convocatoriesData={filteredConvocatories}
                        timelineData={filteredTimeline}
                    />
                </TabsContent>
                <TabsContent value="program" className="w-full">
                    <ProgramsDetail />
                </TabsContent>
            </Tabs>
        </>
    );
}
