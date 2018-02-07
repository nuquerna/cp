import { Currency } from './currency.enum';

export class Contract {
    constructor(
        public name: String,
        public months: Number,
        public rangeDt: Array<Date>,
        public accountNo: String,
        public amount: Number,
        public currency: Currency
    ) {
        this.name = name;
        this.months = months;
        this.rangeDt = rangeDt;
        this.accountNo = accountNo;
        this.amount = amount;
        this.currency = currency;
    }
}
