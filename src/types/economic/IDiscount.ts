import { IFileUser } from "../academic/IFile_User";
import { IResolution_Directoral } from "../core";
import { IDiscountType } from "./IDiscount_Type";

export interface IDiscount {
    id: number;
    discount_type_id: IDiscountType;
    discount: number;
    id_file_user: IFileUser;
    id_directoral_resolution: IResolution_Directoral;
    quota_discount: number;
    is_active: boolean;
}