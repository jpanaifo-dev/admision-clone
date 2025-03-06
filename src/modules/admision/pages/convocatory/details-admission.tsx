import { AdmissionDetails } from './details-admission-components/admission-details'
import { ProgramsDetail } from './details-admission-components/programs-details'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const DetailsAdmission = () => {
  return (
    <main className="p-4">
      <Tabs
        defaultValue="account"
        className="w-full"
      >
        <TabsList className="w-auto">
          <TabsTrigger value="details">Detalles de convocatoria</TabsTrigger>
          <TabsTrigger value="programs">Programas asignados</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <AdmissionDetails
            convocatoriesData={[]}
            timelineData={[]}
          />
        </TabsContent>
        <TabsContent value="programs">
          <ProgramsDetail />
        </TabsContent>
      </Tabs>
    </main>
  )
}
