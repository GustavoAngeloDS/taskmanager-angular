import { Stack } from "./stack.model";

export class Board {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public stackList?: Array<Stack>) { }
}