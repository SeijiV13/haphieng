import { AddCustomerComponent } from './../../transaction-modals/add-customer/add-customer.component';
import { DataPasserService } from './../../../generic/services/data-passer.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { SupplierService } from '../../../web-services/supplier.service';
import { GenericTableComponent } from '../../../generic/generic-table/generic-table.component';
import { PurchaseService } from '../../../web-services/purchase.service';
import { ViewItemsComponent } from '../../transaction-modals/view-items/view-items.component';

@Component({
  selector: 'app-supplier-transactions',
  templateUrl: './supplier-transactions.component.html',
  styleUrls: ['./supplier-transactions.component.scss']
})
export class SupplierTransactionsComponent implements OnInit {
  @ViewChild('viewItemsModal') viewItemsModal: ViewItemsComponent;
 formGroup :FormGroup;
  browseForm: FormGroup;
  pagination = 1;
  resultsHeaders = ['Row No.', 'Ref No.', 'Date', 'Supplier',  'Terms', 'Total Peso Amount', 'Total Yuan Amount']
  resultsResults = []
  resultsKeys = [
    {name: 'rowNo'},  
    {name: 'reference_number', objectname: 'attributes', behavior: 'clickable'} ,
    {name : 'date', objectname: 'attributes'},
    {name : 'supplier_id', filter: 'supplier', objectname: 'attributes', "returnvalue": "code"},
    {name: 'terms', objectname: 'attributes'},
    {name: 'total_peso', objectname: 'attributes'},
    {name: 'total_yuan', objectname: 'attributes'}
 
   ];
  suppliers: any;
  @ViewChild('resultsTable') resultsTable: GenericTableComponent;
  constructor(private fb: FormBuilder, 
             private dataPasserService: DataPasserService,
            private supplierService: SupplierService,
            private purchaseService: PurchaseService) { }
 
  ngOnInit() {
    this.dataPasserService.sendPageTitle("SUPPLIER TRANSACTIONS");
    this.formGroup = this.fb.group({
      supplier: [''],
    });
    this.getDropdownValues();
  }
  getDropdownValues(){
    this.supplierService.getSuppliers().subscribe((data)=>{
      this.suppliers = data;
    })
  }

  filter(){
    let supplier = this.formGroup.controls['supplier'].value;
    this.resultsTable.showLoader();
    this.purchaseService.getFilteredPurchase("", supplier, 1, 'posted').subscribe((data)=>{
      if(data.collection){
        this.resultsResults = (data.collection).data
      }else if(data.data){
        this.resultsResults = data.data;
      }
     this.resultsTable.setPagination(data.pagination);
     this.resultsTable.hideLoader();
    }, error => {
      this.resultsTable.hideLoader();
      this.dataPasserService.sendError(error.errors[0])}
    )
  }
 
  filterOnPagination(page){
    let supplier = this.formGroup.controls['supplier'].value;
    this.resultsTable.showLoader();
    this.purchaseService.getFilteredPurchase("", supplier, page, 'posted').subscribe((data)=>{
      if(data.collection){
        this.resultsResults = (data.collection).data
      }else if(data.data){
        this.resultsResults = data.data;
      }
     this.resultsTable.setPagination(data.pagination);
     this.resultsTable.hideLoader();
    }, error => {
      this.resultsTable.hideLoader();
      this.dataPasserService.sendError(error.errors[0])}
    )
  }

  viewItems(result){
    this.viewItemsModal.show('purchase', result.id);
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
