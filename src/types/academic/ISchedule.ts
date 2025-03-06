import { ICourseGroup } from './ICourse_Group'
import { IRoom } from './IRoom';

export interface ISchedule {
    id: number;
    start_hour: string;
    end_hour: string;
    day: string;
    id_room: IRoom;
    id_course_group: ICourseGroup;
}