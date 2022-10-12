export class DeliveryDate {
    constructor(
        public id?: string,
        public date?: Date,
        public time?: string,
        public active?: boolean,
        public accomplished?: boolean 
    ){}
}
