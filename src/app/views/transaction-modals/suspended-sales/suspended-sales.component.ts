import { ModalDirective } from 'ngx-bootstrap';
import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { SalesService } from '../../../web-services/sales.service';
import { Data } from '@angular/router';
import { DataPasserService } from '../../../generic/services/data-passer.service';
import { PurchaseService } from '../../../web-services/purchase.service';
import { DamageService } from '../../../web-services/damage.service';

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
    {"name": "reference_number", "objectname": "attributes"},
    {"name":"terms", "objectname": "attributes"},
    {"name": "total", "objectname": "attributes"},
    {"name": "sale_type", "objectname": "attributes"},

  ];

  constructor(private salesService: SalesService,
               private dataPasserService: DataPasserService,
               private purchaseService: PurchaseService,
               private damageService: DamageService) { }

  ngOnInit() {
  }
  show(){
    if(this.type == 'sales'){
      this.suspendedHeaders = [
        "Row No.",
        "Ref No.",
        "terms",
        "Total",
        "Sale Type"
      ]
      this.suspendedKeys = [
        {"name": "rowNo"},
        {"name": "reference_number", "objectname": "attributes"},
        {"name":"terms", "objectname": "attributes"},
        {"name": "total", "objectname": "attributes"},
        {"name": "sale_type", "objectname": "attributes"},
      ]
      this.salesService.getSuspendedSales().subscribe((data)=>{
        if(data.collection){
          this.suspendedResults = (data.collection).data
        }else if(data.data){
          this.suspendedResults = data.data;
        }
      
      })
    }
    else if(this.type == 'purchase'){
      this.suspendedHeaders = [
        "Row No.",
        "Ref No.",
        "terms",
        "Total Peso",
        "Total Yuan"
        
      ]
      this.suspendedKeys = [
        {"name": "rowNo", "objectname": "attributes"},
        {"name": "reference_number", "objectname": "attributes"},
        {"name":"terms", "objectname": "attributes"},
        {"name": "total_peso", "objectname": "attributes"},
        {"name": "total_yuan", "objectname": "attributes"},
      ]
      this.purchaseService.getSuspendedPurchases().subscribe((data)=>{
        if(data.collection){
          this.suspendedResults = (data.collection).data
        }else if(data.data){
          this.suspendedResults = data.data;
        }
      })
    }
    else if(this.type == 'salesreturn'){
      this.suspendedHeaders = [
        "Row No.",
        "Ref No.",
        "terms",
        "Total",
      ];
      this.suspendedKeys = [
        {name: "rowNo"},
        {name: "reference_number", "objectname": "attributes"},
        {"name":"terms", "objectname": "attributes"},
        {"name": "total", "objectname": "attributes"},
      ]
      this.salesService.getSuspendedSalesReturn().subscribe((data)=>{
        if(data.collection){
          this.suspendedResults = (data.collection).data
        }else if(data.data){
          this.suspendedResults = data.data;
        }
      })
    }  else if(this.type == 'purchasereturn'){
      this.suspendedHeaders = [
        "Row No.",
        "Ref No.",
        "terms",
        "Total Peso",
        "Total Yuan"
      ];
      this.suspendedKeys = [
        {"name": "rowNo"},
        {"name": "reference_number", "objectname": "attributes"},
        {"name":"terms", "objectname": "attributes"},
        {"name": "total_peso", "objectname": "attributes"},
        {"name": "total_yuan", "objectname": "attributes"},
      ]
      this.purchaseService.getSuspendedPurchasesReturn().subscribe((data)=>{
        if(data.collection){
          this.suspendedResults = (data.collection).data
        }else if(data.data){
          this.suspendedResults = data.data;
        }
      })
    }
    else if(this.type == 'damage'){
      this.suspendedHeaders = [
        "Row No.",
        "Ref No.",
        "terms",
        "Total",
      ];
      this.suspendedKeys = [
        {"name": "rowNo"},
        {"name": "reference_number", "objectname": "attributes"},
        {"name":"terms", "objectname": "attributes"},
        {"name": "total", "objectname": "attributes"},
      ]
      this.damageService.getSuspendedDamageItems().subscribe((data)=>{
        if(data.collection){
          this.suspendedResults = (data.collection).data
        }else if(data.data){
          this.suspendedResults = data.data;
        }
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
    }else if(this.type == 'salesreturn'){
      let id = this.dataPasserService.selectedData['suspendedSales'].id
      this.salesService.getSaleReturn(id).subscribe((data)=>{
        this.emitSale.emit(data);
        this.hide();
      })
    }
    else if(this.type == 'purchasereturn'){
      let id = this.dataPasserService.selectedData['suspendedSales'].id
      this.purchaseService.getPurchaseReturn(id).subscribe((data)=>{
        this.emitSale.emit(data);
        this.hide();
      })
    }
    else if(this.type == 'damage'){
      let id = this.dataPasserService.selectedData['suspendedSales'].id
      this.damageService.getDamageItem(id).subscribe((data)=>{
        this.emitSale.emit(data);
        this.hide();
      })
    }
    
 }

}
