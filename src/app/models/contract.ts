export class Contract {
    constructor(
        public name: String,
        public rangeDt: Array<Date>
    ) {
        this.name = name;
        this.rangeDt = rangeDt;
    }
}
