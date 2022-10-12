import { DeliveryDate } from "./delivery-date.model";
import { InternalTask } from "./internal-task.model";
import { NotificationConfiguration } from "./notification-configuration.model";
import { User } from "./user.model";

export class Task {
    constructor(
        public id?: string,
        public title?: string,
        public description?: string,
        public position?: number,
        public memberList?: Array<User>,
        public internalTasks?: Array<InternalTask>,
        public deliveryDate?: DeliveryDate,
        public notificationConfiguration?: NotificationConfiguration) { }
}