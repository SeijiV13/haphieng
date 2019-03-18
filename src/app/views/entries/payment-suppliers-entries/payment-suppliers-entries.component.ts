import { Component, OnInit, ViewChild } from '@angular/core';
import { GenericModalComponent } from '../../../generic/generic-modal/generic-modal.component';
import { DataPasserService } from '../../../generic/services/data-passer.service';
import { AddPaymentComponent } from '../../transaction-modals/add-payment/add-payment.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GenericTableComponent } from '../../../generic/generic-table/generic-table.component';
import { SupplierService } from '../../../web-services/supplier.service';

@Component({
  selector: 'app-payment-suppliers-entries',
  templateUrl: './payment-suppliers-entries.component.html',
  styleUrls: ['./payment-suppliers-entries.component.scss']
})
export class PaymentSuppliersEntriesComponent implements OnInit {
  supplier: any ={};
  formGroup: FormGroup;
  pagination = 1;
  @ViewChild('errorModal') errorModal: GenericModalComponent;
  @ViewChild('addPaymentModal') addPaymentModal: AddPaymentComponent;
  @ViewChild('resultsTable') resultsTable: GenericTableComponent;
  resultsHeaders = [
    "Row No.",
    "Customer",
    "Balance",
  ];
  resultsResults = [];
  resultsKeys = [
     {name: "rowNo"},
     {name: "description"},
     {name: "initial_balance"}

     
  ];
    buttons = [
    {'name': "Create Payment", 'id': "post-button", 'logo': 'glyphicon glyphicon-file', 'type': 'post', 'behavior':'single'},
  ]
  constructor(private dataPasserService: DataPasserService,
              private fb: FormBuilder,
              private supplierService: SupplierService) { }

  ngOnInit() {
    this.dataPasserService.sendPageTitle("PAYMENT TO SUPPLIERS ENTRY");
    this.formGroup = this.fb.group({
      description:[''],
      supplierCode: ['']
    });
    this.filter();
  }

  doAction(type){
    if(type === 'post'){
       this.addPaymentModal.show(this.supplier);
    }
  }

  removeRow(index){
    this.resultsResults.splice(index, 1);
  }

  filter(){
    let code = this.formGroup.controls['supplierCode'].value;
    let description = this.formGroup.controls['description'].value;
    this.resultsTable.showLoader();
    this.supplierService.filterSuppliers(code, description,  1).subscribe((data)=>{
      this.resultsResults = data.collection.filter((data) => data.initial_balance== 0);
      this.resultsTable.setPagination(data.pagination);
      this.resultsTable.hideLoader();
    }, error => {
     this.resultsTable.hideLoader();
     this.dataPasserService.sendError(error.errors[0])}
   )
 } 

 filterOnPagination(page){
   let code = this.formGroup.controls['supplierCode'].value;
   let description = this.formGroup.controls['description'].value;
   this.resultsTable.showLoader();
   this.supplierService.filterSuppliers(code, description,  1).subscribe((data)=>{
     this.resultsResults = data.collection;
     this.resultsTable.setPagination(data.pagination);
     this.resultsTable.hideLoader();
   }, error => {
     this.resultsTable.hideLoader();
     this.dataPasserService.sendError(error.errors[0])}
   )
  } 

  getSelectedSupplier(){
     this.supplier = this.dataPasserService.selectedData['supplier'];
  }

}
