import { DataTable } from "@/components/tables"
import FiltersSection from "../evaluations-history/components/filters-section"
import { requirementsColumns } from "./requirements-columns"
import { IRequirement } from "@/types/admission/IRequirement";

interface IRequirementTable {
    data?: IRequirement[] | null
}

export const RequirementsTable = (
    { data }: IRequirementTable
) => {

    return (
        <>
            <main>
                <FiltersSection filters={['status']} />
                <DataTable
                    columns={requirementsColumns}
                    data={data || []}
                    hasPagination={true}
                />
            </main>
        </>
    )
}
