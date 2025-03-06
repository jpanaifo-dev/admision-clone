import { IPeriod } from '../core/IPeriod'
import { IProm_Convocatory } from '../admission/IProm_Convocatory'

export interface IEnrollment_stage {
    id: number;
    description: string;
    id_period: IPeriod;
    id_promo_convocatory: IProm_Convocatory;
    start_date: Date;
    end_date: Date;
    extemp_start_date: Date;
    extemp_end_date: Date;
    is_active: boolean;
}