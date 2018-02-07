import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Contract } from './models/contract';
import { Currency } from './models/currency.enum';
import { EnumValues } from 'enum-values';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  contractForm: FormGroup;
  contractCollection: AngularFirestoreCollection<Contract>;
  contractList: Observable<Contract[]>;
  listCurrency = EnumValues.getNames(Currency);

  title = 'Credit Plan';

  constructor(
    private formBuilder: FormBuilder,
    private af: AngularFirestore,
    public afAuth: AngularFireAut) {
      this.contractCollection = af.collection('contracts');
      this.contractList = this.contractCollection.valueChanges();
    }

  ngOnInit() {
    this.contractForm = this.formBuilder.group({
      name: null,
      months: 1,
      rangeDt: null,
      accountNo: null,
      amount: null,
      currency: 1
    });
  }

  private isInvalid(): boolean {
    return !this.contractForm.valid;
  }

  private addContract(): void {
    const newContract = new Contract(
      this.contractForm.controls['name'].value,
      this.contractForm.controls['months'].value,
      this.contractForm.controls['rangeDt'].value,
      this.contractForm.controls['accountNo'].value,
      this.contractForm.controls['amount'].value,
      this.contractForm.controls['currency'].value);

    this.contractCollection.add({
        name: newContract.name,
        months: newContract.months,
        rangeDt: newContract.rangeDt,
        accountNo: newContract.accountNo,
        amount: newContract.amount,
        currency: newContract.currency
      }
    );

    this.contractForm.controls['rangeDt'].setValue(null);
    this.contractForm.controls['name'].setValue(null);
    this.contractForm.controls['months'].setValue(1);
    this.contractForm.controls['accountNo'].setValue(null);
    this.contractForm.controls['amount'].setValue(null);
    this.contractForm.controls['currency'].setValue(1);
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}
