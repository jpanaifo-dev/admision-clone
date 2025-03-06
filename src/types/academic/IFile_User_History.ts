import { IPerson } from "../person";
import { IResolution_Directoral } from "../core";
import { IResolution_Rectoral } from "../core";
import { IFileUser } from "./IFile_User";
import { IActionType } from "./IAction_Type";

export interface IFileUserHistory {
    id: number;
    id_file_user: IFileUser;
    id_person: IPerson;
    id_action_type: IActionType;
    id_directoral_resolution: IResolution_Directoral;
    id_retoral_resolution: IResolution_Rectoral;
    observation: string;
}