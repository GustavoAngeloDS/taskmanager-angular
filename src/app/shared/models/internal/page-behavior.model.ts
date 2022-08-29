import { Action } from "../../enums/action";
import { AuthenticationService } from "../../services/authentication.service";
import { User } from "../user.model";

export class PageBehavior {
    constructor(public isLoadCompleted: boolean = false, public currentAction: Action) {
    }
}