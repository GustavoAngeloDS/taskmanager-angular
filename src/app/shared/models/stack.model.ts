import { Task } from "./task.model";
export class Stack {
    constructor(
        public id?: string,
        public name?: string,
        public createdOn?: Date,
        public taskList?: Array<Task>) { }
}
