import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { UserService } from '../user.service';


@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.page.html',
  styleUrls: ['./subscription.page.scss'],
})
export class SubscriptionPage implements OnInit {

  constructor(
    private user: UserService,
    private itemService: ItemService,
  ) { }

  SubscriptionItems: any
  SubscriptionCurrentItems: any
  SubscriptionTotal: number

  subscriptionID: string = ""
  hasCompleted:  string = "";


  ngOnInit() {

    this.itemService.read_Subscriptions().subscribe(data => {

      this.SubscriptionItems = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          financeType: e.payload.doc.data()['financeType'],
          financeTitle: e.payload.doc.data()['financeTitle'],
          financeAmount: e.payload.doc.data()['financeAmount'],
          hasCompleted: e.payload.doc.data()['hasCompleted'],
          financeDate: e.payload.doc.data()['financeDate'],
          financeCategory: e.payload.doc.data()['financeCategory'],
        }; 
      })

    });

    this.itemService.read_SubscriptionsCurrent().subscribe(data => {

      this.SubscriptionCurrentItems = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          financeType: e.payload.doc.data()['financeType'],
          financeTitle: e.payload.doc.data()['financeTitle'],
          financeAmount: e.payload.doc.data()['financeAmount'],
          hasCompleted: e.payload.doc.data()['hasCompleted'],
          financeDate: e.payload.doc.data()['financeDate'],
          financeCategory: e.payload.doc.data()['financeCategory'],
        }; 
      })
      console.log(this.SubscriptionCurrentItems);
      this.SubscriptionTotal = this.SubscriptionCurrentItems.reduce((n, {financeAmount}) => n + financeAmount, 0);
      console.log(this.SubscriptionTotal)

      let record = {};
      record['SubscriptionTotal'] = this.SubscriptionTotal;
      this.user.update_User(record);

    });

  }

  hasCompletedChange(itemid){
    
    this.subscriptionID = itemid
    this.hasCompleted = "true"
    let record = {};

    record['hasCompleted'] = this.hasCompleted;
    this.itemService.update_FinanceItem(itemid, record);
    console.log(this.subscriptionID + " " + this.hasCompleted);
  }

  hasNotCompletedChange(itemid){
    
    this.subscriptionID = itemid
    this.hasCompleted = "false"
    let record = {};

    record['hasCompleted'] = this.hasCompleted;
    this.itemService.update_FinanceItem(itemid, record);
    console.log(this.subscriptionID + " " + this.hasCompleted);
  }


}
