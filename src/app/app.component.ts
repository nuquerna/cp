import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Contract } from './models/contract';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  contractForm: FormGroup;
  contractCollection: AngularFirestoreCollection<Contract>;
  contractList: Observable<Contract[]>;

  title = 'Credit Plan';

  constructor(
    private formBuilder: FormBuilder,
    private af: AngularFirestore) {
      this.contractCollection = af.collection('contracts');
      this.contractList = this.contractCollection.valueChanges();
    }

  ngOnInit() {
    this.contractForm = this.formBuilder.group({
      name: null,
      months: 1,
      rangeDt: null
    });
  }

  private isDisabled(): boolean {
    return this.contractForm.controls['rangeDt'].value === null;
  }

  private addContract(): void {
    const newContract = new Contract(
      this.contractForm.controls['name'].value,
      this.contractForm.controls['months'].value,
      this.contractForm.controls['rangeDt'].value);

    this.contractCollection.add({
        name: newContract.name,
        months: newContract.months,
        rangeDt: newContract.rangeDt
      }
    );

    this.contractForm.controls['rangeDt'].setValue(null);
    this.contractForm.controls['name'].setValue(null);
    this.contractForm.controls['months'].setValue(1);
  }
}
