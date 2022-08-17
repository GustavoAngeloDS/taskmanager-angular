import { Stack } from "./stack.model";
import { User } from "./user.model";

export class Board {
    constructor(
        public id?: string,
        public name?: string,
        public description?: string,
        public stackList?: Array<Stack>,
        public memberList?: Array<User>,
        public owner?: User) { }
}