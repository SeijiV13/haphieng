import { DataPasserService } from './../../../generic/services/data-passer.service';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-sales-reports',
  templateUrl: './sales-reports.component.html',
  styleUrls: ['./sales-reports.component.scss']
})
export class SalesReportsComponent implements OnInit {

  constructor(private dataPasserService: DataPasserService) { }

  ngOnInit() {
    this.dataPasserService.sendPageTitle("SALES REPORTS");
  }

  showPanel(id){
    $(".collapse").not(id).slideUp();
    $(id).toggle('slow');
  }


  generateReport(parameters){
    
  }

}
