import { HeaderSection } from "@/components/app";
import { IConvocatory, IHeadquarter, IProgramPlanStudy } from "@/types";
import { ProgramaFormSelector } from "../components/accordion-form/select-program-form";
import { IProgramType } from "@/types/program/IProgramType";
import { IKnowledgeArea } from "@/types/program/IKnowledgeArea";
import { IModality } from "@/types/admission/IModality";

interface AddProgramStepProps {
  uuid?: string | string[] | undefined
  data?: IProgramPlanStudy[] | null;
  headquarters?: IHeadquarter[] | null;
  programsTypes?: IProgramType[] | null
  knowledgeArea?: IKnowledgeArea[] | null
  modalities?: IModality[] | null
  convocatory?:  IConvocatory[]
}

export default function AddProgramStep(props: AddProgramStepProps) {
  const { uuid, data, headquarters, programsTypes, knowledgeArea, modalities, convocatory } = props;

  return (
    <>
      <HeaderSection
        title="Seleccionar programas"
        description="Selecciona los programas que se asignarán a la convocatoria"
        disabledActions
      />
      <section>
        <ProgramaFormSelector 
          uuid={uuid} 
          planStudy={data} 
          headquarters={headquarters}
          programsTypes={programsTypes}
          knowledgeArea={knowledgeArea}
          modalities={modalities}
          convocatory={convocatory}
        />
      </section>
    </>
  );
}
