import { NotificationType } from "../enums/notification-type";

export class NotificationConfiguration {
    constructor(
        public id?: string, 
        public notificationType?: NotificationType, 
        public title?: string, 
        public message?: string) {

    }
}
