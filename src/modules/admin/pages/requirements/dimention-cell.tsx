'use client'

import { fetchAdmissionDimensionRequirementsById } from "@/api/convocatory/dimention-requirement";
import { Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";

export const DimensionCell = (
    { dimensionId }: { dimensionId: number }
) => {
    const [dimensionName, setDimensionName] = useState<string>('');


    useEffect(() => {
        const fetchDimension = async () => {
            const result = await fetchAdmissionDimensionRequirementsById(dimensionId);
            setDimensionName(result.data?.name || '');
        };
        fetchDimension();
    }, [dimensionId]);

    return (
        <>
            {
                dimensionName === '' &&
                <span>
                    <Spinner color="primary" size="sm" />
                </span>
            }
            <span className="text-xs font-semibold rounded-full text-primary-600">
                {dimensionName}
            </span>
        </>
    );
}
