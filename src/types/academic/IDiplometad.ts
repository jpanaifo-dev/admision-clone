import { IResolution_Directoral } from "../core";
import { IFileUser } from "./IFile_User";

export interface IDiplomated {
  id: number;
  code: string;
  id_directoral_resolution: IResolution_Directoral;
  id_file_user: IFileUser;
}