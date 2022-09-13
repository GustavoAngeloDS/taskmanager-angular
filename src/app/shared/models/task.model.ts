import { InternalTask } from "./internal-task.model";
import { User } from "./user.model";

export class Task {
    constructor(
        public id?: string, 
        public title?: string, 
        public description?: string,
        public memberList?: Array<User>,
        public internalTasks?: Array<InternalTask>) {}
}
