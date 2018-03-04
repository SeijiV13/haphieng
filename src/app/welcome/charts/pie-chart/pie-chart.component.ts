import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  // Pie
  public pieChartLabels:string[] = ['Item 1', 'Item 2', 'Item 3'];
  public pieChartData:number[] = [300, 500, 100];
  public pieChartType:string = 'pie';
 
}
