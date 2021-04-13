import { UserService } from '../user.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  mainuser: AngularFirestoreDocument
  fullName: string;
  
  IncomeTotal: number;
  IncomeAcademicTotal: number;
  IncomePersonalTotal: number;

  ExpenseTotal: number;
  ExpenseRentTotal: number;
  ExpenseMealsTotal: number;

  email: string;

  constructor(
    private afs: AngularFirestore,
    private user: UserService,
  ) {}

  ngOnInit(){
    this.mainuser = this.afs.doc(`users/${this.user.getUID()}`)      
    this.mainuser.valueChanges().subscribe(data => {
    this.fullName = data.fullName
    this.email = data.email
    this.IncomeTotal = data.IncomeTotal
    this.IncomeAcademicTotal = data.IncomeAcademicTotal
    this.IncomePersonalTotal = data.IncomePersonalTotal
    this.ExpenseTotal = data.ExpenseTotal
    this.ExpenseRentTotal = data.ExpenseRentTotal
    this.ExpenseMealsTotal = data.ExpenseMealsTotal
    console.log(data)
   }) 
  }
  
}
