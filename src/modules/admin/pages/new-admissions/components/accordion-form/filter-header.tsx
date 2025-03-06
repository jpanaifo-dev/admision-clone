"use client";

import { SearchFilter } from "@/components/app/filters";
import { SimpleComboBox } from "@/components/app/filters/default-comand-filter";
import { useFilterFromUrl } from "@/lib/filter-url";
import { IKnowledgeArea } from "@/types/program/IKnowledgeArea";
import { IProgramType } from "@/types/program/IProgramType";

interface IProps {
  programsTypes: IProgramType[] | null | undefined;
  knowledgeArea: IKnowledgeArea[] | null | undefined;
}

export const FilterHeader = (props: IProps) => {
  const { programsTypes, knowledgeArea } = props;

  const { getParams } = useFilterFromUrl();

  const newProgramType = getParams({ key: "program_type", value: "" });
  const newKnowledgeArea = getParams({ key: "area", value: "" });

  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 items-start justify-start">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de programa
          </label>
          <SimpleComboBox
            filterKey="program_type"
            data={programsTypes?.map((item) => ({
              value: item.id.toString(),
              label: item.name,
            }))}
            searchParam={{ initialStatus: newProgramType }}
            popclassName="w-80"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Área
          </label>
          <SimpleComboBox
            filterKey="area"
            data={knowledgeArea?.map((item) => ({
              value: item.id.toString(),
              label: item.name,
            }))}
            searchParam={{ initialStatus: newKnowledgeArea }}
            popclassName="w-80"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Buscar programa
          </label>
          <div className="relative">
            <SearchFilter placeholder="Buscar" icon />
          </div>
        </div>
      </section>
    </>
  );
};
