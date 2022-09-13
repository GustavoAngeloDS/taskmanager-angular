import { Action } from "../../enums/action";

export class PageBehavior {
    constructor(public isLoadCompleted: boolean = false, public currentAction: Action) {
    }
}
