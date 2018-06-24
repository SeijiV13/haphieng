import { ModalDirective } from 'ngx-bootstrap';
import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { SalesService } from '../../../web-services/sales.service';
import { Data } from '@angular/router';
import { DataPasserService } from '../../../generic/services/data-passer.service';
import { PurchaseService } from '../../../web-services/purchase.service';

@Component({
  selector: 'app-suspended-sales',
  templateUrl: './suspended-sales.component.html',
  styleUrls: ['./suspended-sales.component.scss']
})
export class SuspendedSalesComponent implements OnInit {
  @ViewChild("suspendedSalesModal") suspendedModal: ModalDirective;
  @Input() type: string;
  @Output('emitSale') emitSale = new EventEmitter();
  suspendedHeaders = [
    "Row No.",
    "Ref No.",
    "terms",
    "Total",
    "Sale Type"
  ]
  suspendedResults = [];
  suspendedKeys = [
    {"name": "rowNo"},
    {"name": "reference_number"},
    {"name":"terms"},
    {"name": "total"},
    {"name": "sale_type"},

  ];

  constructor(private salesService: SalesService,
               private dataPasserService: DataPasserService,
               private purchaseService: PurchaseService) { }

  ngOnInit() {
  }
  show(){
    if(this.type == 'sales'){
      this.suspendedKeys = [
        {"name": "rowNo"},
        {"name": "reference_number"},
        {"name":"terms"},
        {"name": "total"},
        {"name": "sale_type"},
      ]
      this.salesService.getSuspendedSales().subscribe((data)=>{
        this.suspendedResults = data;
      })
    }
    else if(this.type == 'purchase'){
      this.suspendedKeys = [
        {"name": "rowNo"},
        {"name": "reference_number"},
        {"name":"terms"},
        {"name": "total_peso"},
        {"name": "terms"},
      ]
      this.purchaseService.getSuspendedPurchases().subscribe((data)=>{
        this.suspendedResults = data;
      })
    }
    this.suspendedModal.show();
  }
  hide(){
    this.suspendedModal.hide();
  }


  resume(){
    if(this.type == 'sales'){
      let id = this.dataPasserService.selectedData['suspendedSales'].id
      this.salesService.getSale(id).subscribe((data)=>{
        this.emitSale.emit(data);
        this.hide();
      })
    }else if(this.type == 'purchase'){
      let id = this.dataPasserService.selectedData['suspendedSales'].id
      this.purchaseService.getPurchase(id).subscribe((data)=>{
        this.emitSale.emit(data);
        this.hide();
      })
    }
 }

}
