import { Task } from "./task.model";
export class Stack {
    constructor(
        public id?: number,
        public name?: string,
        public taskList?: Array<Task>) { }
}
