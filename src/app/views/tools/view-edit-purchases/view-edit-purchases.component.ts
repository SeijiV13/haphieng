import { AddCustomerComponent } from './../../transaction-modals/add-customer/add-customer.component';
import { DataPasserService } from './../../../generic/services/data-passer.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { SupplierService } from '../../../web-services/supplier.service';
import { PurchaseService } from '../../../web-services/purchase.service';
import { GenericTableComponent } from '../../../generic/generic-table/generic-table.component';

@Component({
  selector: 'app-view-edit-purchases',
  templateUrl: './view-edit-purchases.component.html',
  styleUrls: ['./view-edit-purchases.component.scss']
})
export class ViewEditPurchasesComponent implements OnInit {

 
formGroup :FormGroup;
pagination = 1;
  browseForm: FormGroup;
  resultsHeaders = ['Row No.', 'Ref No.', 'Date', 'Supplier',  'Terms', 'Total Peso Amount', 'Total Yuan Amount']
  resultsResults = []
  resultsKeys = [
    {name: 'rowNo'},  
    {name: 'reference_number'} ,
    {name : 'date'},
    {name : 'supplier_id', filter: 'supplier'},
    {name: 'terms'},
    {name: 'total_peso'},
    {name: 'total_yuan'}
 
   ];
  suppliers: any;
  @ViewChild('resultsTable') resultsTable: GenericTableComponent;

  constructor(private fb: FormBuilder, private dataPasserService: DataPasserService,
              private supplierService: SupplierService,
              private purchaseService: PurchaseService) { }
 
  ngOnInit() {
    this.dataPasserService.sendPageTitle("VIEW PURCHASES");
    this.formGroup = this.fb.group({
      supplier: [''],
      refNo: [''],

    });
    this.getDropdownValues();
  }

  getDropdownValues(){
    this.supplierService.getSuppliers().subscribe((data)=>{
      this.suppliers = data;
    })
  }

  filter(){
    let refNo = this.formGroup.controls['refNo'].value;
    let supplier = this.formGroup.controls['supplier'].value;
    this.purchaseService.getFilteredPurchase(refNo, supplier, 1).subscribe((data)=>{
     this.resultsResults = data.collection;
     this.resultsTable.setPagination(data.pagination);
    }, error => this.dataPasserService.sendError(error.errors[0]))
  }
 
  filterOnPagination(page){
    let refNo = this.formGroup.controls['refNo'].value;
    let supplier = this.formGroup.controls['supplier'].value;
    this.purchaseService.getFilteredPurchase(refNo, supplier, page).subscribe((data)=>{
     this.resultsResults = data.collection;
     this.resultsTable.setPagination(data.pagination);
    }, error => this.dataPasserService.sendError(error.errors[0]))
  }

  print(type){
    if(type === 'old'){

    }else if (type === 'new'){

    }
     
  }
  editDetails(){

  }

  getSelectedProduct(){}

}
