import { DataPasserService } from './../../../generic/services/data-passer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase-reports',
  templateUrl: './purchase-reports.component.html',
  styleUrls: ['./purchase-reports.component.scss']
})
export class PurchaseReportsComponent implements OnInit {

  constructor(private dataPasserService: DataPasserService) { }

   ngOnInit() {
    this.dataPasserService.sendPageTitle("PURCHASE REPORTS");
  }

  showPanel(id){
    $(".collapse").not(id).slideUp();
    $(id).toggle('slow');
  }

  generateReport(parameters){

  }

}
