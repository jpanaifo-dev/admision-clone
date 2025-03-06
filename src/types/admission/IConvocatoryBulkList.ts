export interface IConvocatoryBulkList {
    id:               number;
    uuid:             string;
    promotion:        string;
    cost_quota:       string;
    cost_total:       string;
    quotas:           number;
    months_duration:  number;
    vacancies:        number;
    is_active:        boolean;
    study_plan_uuid:  string;
    headquarter_uuid: string;
    start_date:       Date;
    convocatory:      number;
    modality:         number;
}

// export interface IConvocatoryBulkListCreate {
//     id?:              number;
//     uuid?:             string;
//     promotion:        string;
//     study_plan_uuid?:  string | string[];
//     headquarter_uuid?: string | string[];
//     convocatory:      string;
//     modality?:         string | string[];
// }

export interface IConvocatoryBulkListCreate {
    promotion: string;
    study_plan_uuid: string;
    headquarter_uuid: string;
    convocatory: string;
    modality: string;
  }