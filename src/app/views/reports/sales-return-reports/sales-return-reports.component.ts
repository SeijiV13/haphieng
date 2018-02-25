import { DataPasserService } from './../../../generic/services/data-passer.service';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-sales-return-reports',
  templateUrl: './sales-return-reports.component.html',
  styleUrls: ['./sales-return-reports.component.scss']
})
export class SalesReturnReportsComponent implements OnInit {

  constructor(private dataPasserService: DataPasserService) { }

  ngOnInit() {
    this.dataPasserService.sendPageTitle("SALES RETURN REPORTS");
  }

  showPanel(id){
    $(".collapse").not(id).slideUp();
    $(id).toggle('slow');
  }

  generateReport(parameters){

  }

}
