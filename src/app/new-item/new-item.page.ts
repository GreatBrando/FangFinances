import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { UserService } from '../user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.page.html',
  styleUrls: ['./new-item.page.scss'],
})
export class NewItemPage implements OnInit {

  Finances: any
  financeType: string = ""
  financeTitle: string = ""
  financeAmount: number
  financeCategory: string = ""
  financeDate: string = ""
  hasCompleted: string = "true"



  constructor(
    private user: UserService,
    private itemService: ItemService,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit() {

    this.itemService.read_FinanceItem().subscribe(data => {

      this.Finances = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          financeTitle: e.payload.doc.data()['financeTitle'],
          financeType: e.payload.doc.data()['financeType'],
          financeDate: e.payload.doc.data()['financeDate'],
          financeAmount: e.payload.doc.data()['financeAmount'],
          financeCategory: e.payload.doc.data()['financeCategory']
        }; 
      })
      console.log(this.Finances);

    });

  }

  CreateRecord() {
    let record = {};
    record['created'] = firebase.firestore.FieldValue.serverTimestamp();
    record['financeType'] = this.financeType;
    record['financeTitle'] = this.financeTitle;
    record['financeAmount'] = this.financeAmount;
    record['financeCategory'] = this.financeCategory;
    record['hasCompleted'] = this.hasCompleted;
    record['financeDate'] = this.financeDate;
    
    
    this.itemService.create_NewFinanceItem(record).then(resp => {
      this.financeType = "";
      this.financeTitle = "";
      this.financeAmount;
      this.financeCategory = "";
      this.financeDate = "";
      this.hasCompleted = "";
      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
  }

  RemoveRecord(rowID) {
    this.itemService.delete_FinanceItem(rowID);
  }
 
  EditRecord(record) {
    record.isEdit = true;
    record.EditfinanceType = record.financeType;
    record.EditfinanceTitle = record.financeTitle;
    record.EditfinanceDate = record.financeDate;
    record.EditfinanceAmount = record.financeAmount;
    record.EditfinanceCategory = record.financeCategory;
  }
 
  UpdateRecord(recordRow) {
    let record = {};
    record['financeType'] = recordRow.EditfinanceType;
    record['financeTitle'] = recordRow.EditfinanceTitle;
    record['financeDate'] = recordRow.EditfinanceDate;
    record['financeAmount'] = recordRow.EditfinanceAmount;
    record['financeCategory'] = recordRow.EditfinanceCategory;
    this.itemService.update_FinanceItem(recordRow.id, record);
    recordRow.isEdit = false;
  }


}
