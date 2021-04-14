import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  
  chartData: ChartDataSets[] = [{ data: [], label: 'Income Items' }]
  chartLabels: Label[];
  
  pieData: ChartDataSets[] = [{ data: [] }]
  pieLabels: Label[] = ['Academic', 'Personal'];

  chartData2: ChartDataSets[] = [{ data: [], label: 'Income Items' }]
  chartLabels2: Label[];

  pieData2: ChartDataSets[] = [{ data: [] }]
  pieLabels2: Label[] = ['Meals', 'Rent'];


  item: any;

  amount:any;
  amountArray = [];

  dates: any;
  datesArray = [];
  
  item2: any;
  IncomeAcademicTotal: any;
  IncomePersonalTotal: any;
  IncomeArray = [];

  item3: any;
  amount2:any;
  amountArray2 = [];

  dates2: any;
  datesArray2 = [];

  item4: any;
  ExpenseMealsTotal: any;
  ExpenseRentTotal: any;
  ExpenseArray = [];


  //IncomeBar
  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: true,
      text: 'Income Items'
    },
    pan: {
      enabled: true,
      mode: 'xy'
    },
  };
  chartColors: Color[] = [
    {
      borderColor: '#000000',
      backgroundColor: ["#e84351", "#434a54", "#3ebf9b", "#4d86dc", "#f3af37"]
    }
  ];
  chartType = 'bar';
  showLegend = false;
  

  //IncomePie
  chartOptions2 = {
    responsive: true,
    title: {
      display: true,
      text: 'Income Breakdown'
    },
    pan: {
      enabled: true,
      mode: 'xy'
    },
  };
  public pieChartColors: Color[] = [
    {
      borderColor: '#000000',
      backgroundColor: ["#e84351", "#434a54", "#3ebf9b", "#4d86dc", "#f3af37"]
    }
  ];
  chartType2 = 'pie';
  showLegend2 = true;
  

  //ExpenseBar
  chartOptions3 = {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: true,
      text: 'Expense Items'
    },
    pan: {
      enabled: true,
      mode: 'xy'
    },
  };
  chartColors3: Color[] = [
    {
      borderColor: '#000000',
      backgroundColor: ["#e84351", "#434a54", "#3ebf9b", "#4d86dc", "#f3af37"]
    }
  ];
  chartType3 = 'bar';
  showLegend3 = false;


  //ExpensePie
  chartOptions4 = {
    responsive: true,
    title: {
      display: true,
      text: 'Expense Breakdown'
    },
    pan: {
      enabled: true,
      mode: 'xy'
    },
  };
  chartColors4: Color[] = [
    {
      borderColor: '#000000',
      backgroundColor: ["#e84351", "#434a54", "#3ebf9b", "#4d86dc", "#f3af37"]
    }
  ];
  chartType4 = 'pie';
  showLegend4 = true;



  constructor(
    private firestore: AngularFirestore,
    private user: UserService
  ) {}

  ngOnInit(){
    
    this.firestore.collection('users').doc(this.user.getUID()).collection('BalanceSheet', ref => ref.where('financeType', '==', 'Income')).get().toPromise().then((snapshot) => {
      snapshot.docs.forEach(doc => {
        
        this.item = doc.data();

        this.amount = this.item.financeAmount
        this.amountArray.push(this.amount)

        this.dates = this.item.financeDate
        this.datesArray.push(this.dates)

        this.chartData[0] = {
          data: []
        };
        this.chartLabels = [];

        for (let i = 0; i < this.amountArray.length; i++) {
            this.chartData[0].data.push(this.amountArray[i])
            this.chartColors[0].backgroundColor
        }
        
        for (let i = 0; i < this.datesArray.length; i++) {
            this.chartLabels.push(this.datesArray[i])
        }
      });
      console.log(this.chartData)
      console.log(this.chartLabels)
    });

    this.firestore.collection('users').doc(this.user.getUID()).get().toPromise().then((snapshot) => {

        this.item2 = snapshot.data();

        this.IncomeAcademicTotal = this.item2.IncomeAcademicTotal 
        this.IncomeArray.push(this.IncomeAcademicTotal)

        this.IncomePersonalTotal = this.item2.IncomePersonalTotal
        this.IncomeArray.push(this.IncomePersonalTotal)

        this.pieData[0] = {
          data: []
        };
        for (let i = 0; i < this.IncomeArray.length; i++) {
          this.pieData[0].data.push(this.IncomeArray[i])
        }

        console.log(this.pieData)
        console.log(this.pieLabels)
    });

     
    this.firestore.collection('users').doc(this.user.getUID()).collection('BalanceSheet', ref => ref.where('financeType', '==', 'Expense')).get().toPromise().then((snapshot) => {
      snapshot.docs.forEach(doc => {
        
        this.item3 = doc.data();

        this.amount2 = this.item3.financeAmount
        this.amountArray2.push(this.amount2)

        this.dates2 = this.item3.financeDate
        this.datesArray2.push(this.dates2)

        this.chartData2[0] = {
          data: []
        };
        this.chartLabels2 = [];

        for (let i = 0; i < this.amountArray2.length; i++) {
            this.chartData2[0].data.push(this.amountArray2[i])
        }
        
        for (let i = 0; i < this.datesArray2.length; i++) {
            this.chartLabels2.push(this.datesArray2[i])
        }
      });
      console.log(this.chartData2)
      console.log(this.chartLabels2)
    });

    this.firestore.collection('users').doc(this.user.getUID()).get().toPromise().then((snapshot) => {

      this.item4 = snapshot.data();

      this.ExpenseMealsTotal = this.item4.ExpenseMealsTotal 
      this.ExpenseArray.push(this.ExpenseMealsTotal)

      this.ExpenseRentTotal = this.item4.ExpenseRentTotal
      this.ExpenseArray.push(this.ExpenseRentTotal)

      this.pieData2[0] = {
        data: []
      };
      for (let i = 0; i < this.ExpenseArray.length; i++) {
        this.pieData2[0].data.push(this.ExpenseArray[i])
      }

      console.log(this.pieData2)
      console.log(this.pieLabels2)
  });

    
  }

}