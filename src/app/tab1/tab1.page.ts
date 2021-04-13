import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { UserService } from '../user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router' ;
import firebase from 'firebase/app';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { FileOpener } from '@ionic-native/file-opener/ngx';
import {Plugins,  Capacitor, FilesystemDirectory, FilesystemEncoding} from '@capacitor/core';
const { Filesystem } = Plugins;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

      IncomeItems: any
      IncomeTotal: number

      IncomePersonalItems: any
      IncomePersonalTotal: number

      IncomeAcademicItems: any
      IncomeAcademicTotal: number
      
      ExpenseTotal: number
      ExpenseItems: any
      
      ExpenseMealsItems: any
      ExpenseMealsTotal: number

      ExpenseRentItems: any
      ExpenseRentTotal: number
      
      FinanceItems: any

      mainuser: AngularFirestoreDocument
      Income: string;
      SubscriptionTotal: number;
      fullName: string;
      email: string;
      monthlyBudgetCap: string;

      pdfObj = null;
      pdfBase64: string;


      constructor(
        private afs: AngularFirestore,
        private user: UserService,
        private itemService: ItemService,
        private afAuth: AngularFireAuth,
        private fileOpener: FileOpener,
        public router: Router,
        private plt: Platform
      ) {}

      ngOnInit() {

        this.mainuser = this.afs.doc(`users/${this.user.getUID()}`)      
        this.mainuser.valueChanges().subscribe(data => {
          this.fullName = data.fullName
          this.email = data.email
          this.monthlyBudgetCap = data.monthlyBudgetCap
          this.Income = data.Income
          this.SubscriptionTotal = data.SubscriptionTotal
          console.log(data)
        }) 

        this.itemService.read_FinanceIncomeItem().subscribe(data => {

          this.IncomeItems = data.map(e => {
            return {
              id: e.payload.doc.id,
              isEdit: false,
              financeType: e.payload.doc.data()['financeType'],
              financeTitle: e.payload.doc.data()['financeTitle'],
              financeAmount: e.payload.doc.data()['financeAmount'],
              financeDate: e.payload.doc.data()['financeDate'],
              financeCategory: e.payload.doc.data()['financeCategory'],
            }; 
          })
          console.log(this.IncomeItems);
          this.IncomeTotal = this.IncomeItems.reduce((n, {financeAmount}) => n + financeAmount, 0);
          console.log(this.IncomeTotal)

          let record = {};
          record['IncomeTotal'] = this.IncomeTotal;
          this.user.update_User(record);

        });

        this.itemService.read_FinanceIncomeAcademic().subscribe(data => {

          this.IncomeAcademicItems = data.map(e => {
            return {
              id: e.payload.doc.id,
              isEdit: false,
              financeType: e.payload.doc.data()['financeType'],
              financeTitle: e.payload.doc.data()['financeTitle'],
              financeAmount: e.payload.doc.data()['financeAmount'],
              financeDate: e.payload.doc.data()['financeDate'],
              financeCategory: e.payload.doc.data()['financeCategory'],
            }; 
          })
          console.log(this.IncomeAcademicItems);
          this.IncomeAcademicTotal = this.IncomeAcademicItems.reduce((n, {financeAmount}) => n + financeAmount, 0);
          console.log(this.IncomeAcademicTotal)

          let record = {};
          record['IncomeAcademicTotal'] = this.IncomeAcademicTotal;
          this.user.update_User(record);

        });
        
        this.itemService.read_FinanceIncomePersonal().subscribe(data => {

          this.IncomePersonalItems = data.map(e => {
            return {
              id: e.payload.doc.id,
              isEdit: false,
              financeType: e.payload.doc.data()['financeType'],
              financeTitle: e.payload.doc.data()['financeTitle'],
              financeAmount: e.payload.doc.data()['financeAmount'],
              financeDate: e.payload.doc.data()['financeDate'],
              financeCategory: e.payload.doc.data()['financeCategory'],
            }; 
          })
          console.log(this.IncomePersonalItems);
          this.IncomePersonalTotal = this.IncomePersonalItems.reduce((n, {financeAmount}) => n + financeAmount, 0);
          console.log(this.IncomePersonalTotal)

          let record = {};
          record['IncomePersonalTotal'] = this.IncomePersonalTotal;
          this.user.update_User(record);

        });
  
  
        this.itemService.read_FinanceExpenseItem().subscribe(data => {

            this.ExpenseItems = data.map(e => {
              return {
                id: e.payload.doc.id,
                isEdit: false,
                financeType: e.payload.doc.data()['financeType'],
                financeTitle: e.payload.doc.data()['financeTitle'],
                financeAmount: e.payload.doc.data()['financeAmount'],
                financeDate: e.payload.doc.data()['financeDate'],
                financeCategory: e.payload.doc.data()['financeCategory'],
              }; 
            })
            console.log(this.ExpenseItems);
            this.ExpenseTotal = this.ExpenseItems.reduce((n, {financeAmount}) => n + financeAmount, 0);
            console.log(this.ExpenseTotal)

            let record = {};
            record['ExpenseTotal'] = this.ExpenseTotal;
            this.user.update_User(record);

          });


        this.itemService.read_FinanceExpenseMeals().subscribe(data => {

          this.ExpenseMealsItems = data.map(e => {
            return {
              id: e.payload.doc.id,
              isEdit: false,
              financeType: e.payload.doc.data()['financeType'],
              financeTitle: e.payload.doc.data()['financeTitle'],
              financeAmount: e.payload.doc.data()['financeAmount'],
              financeDate: e.payload.doc.data()['financeDate'],
              financeCategory: e.payload.doc.data()['financeCategory'],
            }; 
          })
          console.log(this.ExpenseMealsItems);
          this.ExpenseMealsTotal = this.ExpenseMealsItems.reduce((n, {financeAmount}) => n + financeAmount, 0);
          console.log(this.ExpenseMealsTotal)

          let record = {};
          record['ExpenseMealsTotal'] = this.ExpenseMealsTotal;
          this.user.update_User(record);

        });

        this.itemService.read_FinanceExpenseRent().subscribe(data => {

          this.ExpenseRentItems = data.map(e => {
            return {
              id: e.payload.doc.id,
              isEdit: false,
              financeType: e.payload.doc.data()['financeType'],
              financeTitle: e.payload.doc.data()['financeTitle'],
              financeAmount: e.payload.doc.data()['financeAmount'],
              financeDate: e.payload.doc.data()['financeDate'],
              financeCategory: e.payload.doc.data()['financeCategory'],
            }; 
          })
          console.log(this.ExpenseRentItems);
          this.ExpenseRentTotal = this.ExpenseRentItems.reduce((n, {financeAmount}) => n + financeAmount, 0);
          console.log(this.ExpenseRentTotal)

          let record = {};
          record['ExpenseRentTotal'] = this.ExpenseRentTotal;
          this.user.update_User(record);

        });


        this.itemService.read_FinanceItem().subscribe(data => {

            this.FinanceItems = data.map(e => {
              return {
                id: e.payload.doc.id,
                isEdit: false,
                financeType: e.payload.doc.data()['financeType'],
                financeTitle: e.payload.doc.data()['financeTitle'],
                financeAmount: e.payload.doc.data()['financeAmount'],
                financeDate: e.payload.doc.data()['financeDate'],
                financeCategory: e.payload.doc.data()['financeCategory'],
              }; 
            })
            console.log(this.FinanceItems);
          });
  
      }

      createPdf() {
        let rows = [];
        rows.push(['financeType', 'financeTitle', 'financeAmount', 'financeCategory', 'financeDate']);
        for (let i = 0; i < this.FinanceItems.length; i++) {
          const row = this.FinanceItems[i];
          rows.push([
            row.financeType,
            row.financeTitle, 
            row.financeAmount,
            row.financeCategory,
            row.financeDate
          ])
        }
      
        var docDefinition = {
        pageOrientation: 'landscape',
        content: [
          { text: 'Business Sheet', style: 'header' },
          { text: ' Name: ' + this.fullName, alignment: 'left' },
          { text: new Date().toLocaleString(), alignment: 'right' },
  
          { table: {
              body: rows
            }
          },
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
          },
          subheader: {
            fontSize: 14,
            bold: true,
            margin: [0, 15, 0, 0]
          },
          story: {
            italic: true,
            alignment: 'center',
            width: '50%',
          }
        }
      }
      this.pdfObj = pdfMake.createPdf(docDefinition);
  
      if (this.plt.is('cordova')) {
        this.pdfObj.getBase64((data) => {
          this.pdfBase64 = data;
          console.log(this.pdfBase64);
        });
      }
    }
  


    downloadPdf() {
        if (this.plt.is('cordova')) {
          // Save the PDF to the device
          const fileName = 'BusinessSheet.pdf';
          try {
            Filesystem.writeFile({
              path: fileName,
              data: this.pdfBase64,
              directory: FilesystemDirectory.Documents
              // encoding: FilesystemEncoding.UTF8
            }).then((writeFileResult) => {
              Filesystem.getUri({
                  directory: FilesystemDirectory.Documents,
                  path: fileName
              }).then((getUriResult) => {
                  const path = getUriResult.uri;
                  console.log(path)
                  this.fileOpener.open(path, 'application/pdf')
                  .then(() => console.log('File is opened'))
                  .catch(error => console.log('Error openening file', error));
              }, (error) => {
                  console.log(error);
              });
            });
          } catch (error) {
            console.error('Unable to write file', error);
          }
        } else {
        // On a browser simply use download
          this.pdfObj.download();
        }
    }

    goToSubscriptionPage(){
      this.router.navigate(['/subscription'])
    }

}

