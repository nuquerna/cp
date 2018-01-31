export class Contract {
    constructor(
        public name: String,
        public months: Number,
        public rangeDt: Array<Date>
    ) {
        this.name = name;
        this.months = months;
        this.rangeDt = rangeDt;
    }
}
