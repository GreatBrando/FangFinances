import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from './user.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
 
@Injectable({
  providedIn: 'root'
})
export class ItemService {
 
  constructor(
    private firestore: AngularFirestore,
    private user: UserService,
    private afAuth: AngularFireAuth
  ) { }
 
 
  create_NewFinanceItem(record) {
    return this.firestore.collection('users').doc(this.user.getUID()).collection('BalanceSheet').add(record);
  }

  read_FinanceItem() {
    return this.firestore.collection('users').doc(this.user.getUID()).collection('BalanceSheet', ref => ref.orderBy('financeDate', 'asc')).snapshotChanges();
  }

  read_FinanceIncomeItem() {
    return this.firestore.collection('users').doc(this.user.getUID()).collection('BalanceSheet', ref => ref.where('financeType', '==', 'Income')).snapshotChanges();
  }

  read_FinanceIncomeAcademic() {
    return this.firestore.collection('users').doc(this.user.getUID()).collection('BalanceSheet', ref => ref.where('financeType', '==', 'Income').where('financeCategory', '==', 'Academic')).snapshotChanges();
  }

  read_FinanceIncomePersonal() {
    return this.firestore.collection('users').doc(this.user.getUID()).collection('BalanceSheet', ref => ref.where('financeType', '==', 'Income').where('financeCategory', '==', 'Personal')).snapshotChanges();
  }

  read_FinanceExpenseItem() {
    return this.firestore.collection('users').doc(this.user.getUID()).collection('BalanceSheet', ref => ref.where('financeType', '==', 'Expense')).snapshotChanges();
  }

  read_FinanceExpenseMeals() {
    return this.firestore.collection('users').doc(this.user.getUID()).collection('BalanceSheet', ref => ref.where('financeType', '==', 'Expense').where('financeCategory', '==', 'Meals')).snapshotChanges();
  }

  read_FinanceExpenseRent() {
    return this.firestore.collection('users').doc(this.user.getUID()).collection('BalanceSheet', ref => ref.where('financeType', '==', 'Expense').where('financeCategory', '==', 'Rent')).snapshotChanges();
  }

  read_Subscriptions() {
    return this.firestore.collection('users').doc(this.user.getUID()).collection('BalanceSheet', ref => ref.where('financeType', '==', 'Subscription')).snapshotChanges();
  }

  read_SubscriptionsCurrent() {
    return this.firestore.collection('users').doc(this.user.getUID()).collection('BalanceSheet', ref => ref.where('financeType', '==', 'Subscription').where('hasCompleted', '==', 'true')).snapshotChanges();
  }
 
  update_FinanceItem(recordID,record){
    return this.firestore.collection('users').doc(this.user.getUID()).collection('BalanceSheet').doc(recordID).update(record);
  }
 
  delete_FinanceItem(record_id) {
    return this.firestore.collection('users').doc(this.user.getUID()).collection('BalanceSheet').doc(record_id).delete();  
  }

}