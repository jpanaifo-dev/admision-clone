export interface IProgramPlanStudy {
    id:               number;
    uuid:             string;
    unit_uuid:        null;
    name:             string;
    code:             string;
    description:      string;
    objetive:         string;
    aplicant_profile: string;
    graduate_profile: string;
    background:       null | string;
    is_active:        boolean;
    program_type:     IProgramPlanStudyType;
    area:             IProgramPlanStudyArea[];
    study_plan:       IStudyPlan[];
}

export interface IProgramPlanStudyFilter {
    uuid?: string;
    program_type?: string;
    area__name?: number;
    area__name__icontains?: string;
    area__id?: string;
    is_active?: boolean;
    search?: string;
}

export interface IProgramPlanStudyType {
    id:  number;
    name: string;
    abbreviation: string;
}

export interface IProgramPlanStudyArea {
    id:   number;
    name: string;
    is_active: boolean;
}

export interface IStudyPlan {
    id:              number;
    uuid:            string;
    description:     string;
    academic_cycles: number;
    is_active:       boolean;
    file:            null | string;
    program:         number;
}