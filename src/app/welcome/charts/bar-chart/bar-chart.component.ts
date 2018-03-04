import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
   public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['Agent A', 'Agent B', 'Agent C', 'Agent D', 'Agent E', 'Agent F', 'Agent G'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Agent Sales'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Item 1'}
  ];

}
