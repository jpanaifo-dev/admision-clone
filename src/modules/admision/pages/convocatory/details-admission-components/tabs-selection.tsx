"use client";

import { ProgramsDetail } from "@/modules/admision/pages/convocatory/details-admission-components/programs-details";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdmissionDetails } from "@/modules/admision/pages/convocatory/details-admission-components/admission-details";
import { useRouter } from "next/navigation";
import { IConvocatory, IEventCall } from "@/types";

interface IProps {
    timelineData: IEventCall[];
    convocatoriesData: IConvocatory[]
    params: { uuid: string }
    querySection: string
}

export const TabsSelection = (props: IProps) => {
  const { timelineData, convocatoriesData, params, querySection } = props;
  const router = useRouter();
  const uuid = params.uuid;

  if (!uuid) {
    console.error("Details are undefined");
    return null;
  }

  const handleTabChange = (tab: string) => {
    const newUrl = `?section=${tab}`;
    router.push(newUrl, { scroll: false }); 
  };

  return (
    <>
      <Tabs
        defaultValue={
          querySection ? querySection : "admission"
        }
        className="w-full py-4"
      >
        <TabsList className="grid grid-cols-2 w-96">
          <TabsTrigger value="admission" onClick={() => handleTabChange("admission")}>
                Detalles de convocatoria
            </TabsTrigger>
          <TabsTrigger value="program" onClick={() => handleTabChange("program")}>
            Detalles de programas
            </TabsTrigger>
        </TabsList>
        <TabsContent value="admission" className="w-full">
          <AdmissionDetails
            convocatoriesData={convocatoriesData}
            timelineData={timelineData}
          />
        </TabsContent>
        <TabsContent value="program" className="w-full">
          <ProgramsDetail uuid={uuid} />
        </TabsContent>
      </Tabs>
    </>
  );
};
