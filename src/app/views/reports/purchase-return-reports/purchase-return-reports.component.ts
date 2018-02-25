import { DataPasserService } from './../../../generic/services/data-passer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase-return-reports',
  templateUrl: './purchase-return-reports.component.html',
  styleUrls: ['./purchase-return-reports.component.scss']
})
export class PurchaseReturnReportsComponent implements OnInit {

    constructor(private dataPasserService: DataPasserService) { }

   ngOnInit() {
    this.dataPasserService.sendPageTitle("PURCHASE RETURN REPORTS");
  }

  showPanel(id){
    $(".collapse").not(id).slideUp();
    $(id).toggle('slow');
  }

}
