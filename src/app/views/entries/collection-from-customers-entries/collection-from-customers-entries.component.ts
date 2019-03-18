import { Component, OnInit, ViewChild } from '@angular/core';
import { GenericModalComponent } from '../../../generic/generic-modal/generic-modal.component';
import { DataPasserService } from '../../../generic/services/data-passer.service';
import { AddPaymentComponent } from '../../transaction-modals/add-payment/add-payment.component';
import { CustomerService } from '../../../web-services/customer.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GenericTableComponent } from '../../../generic/generic-table/generic-table.component';

@Component({
  selector: 'collection-from-customers-entries',
  templateUrl: './collection-from-customers-entries.component.html',
  styleUrls: ['./collection-from-customers-entries.component.scss']
})
export class CollectionFromCustomersEntriesComponent implements OnInit {
  @ViewChild('errorModal') errorModal: GenericModalComponent;
  @ViewChild('addPaymentModal') addPaymentModal: AddPaymentComponent;
  @ViewChild('resultsTable') resultsTable: GenericTableComponent;
  formGroup:FormGroup;
  customer: any = {};
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
    private customerService: CustomerService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      customer: [''],
      description: [''],
      agent: [''],
    });
    this.dataPasserService.sendPageTitle("COLLECTION FROM CUSTOMERS ENTRY");
    this.filter();
  }

  doAction(type){
    if(type === 'post'){
      if(this.customer.id)
       this.addPaymentModal.show(this.customer);
      else
      this.errorModal.showWithCustomMessage('Please select a customer');
    }
  }

  removeRow(index){
    this.resultsResults.splice(index, 1);
  }


  filter(){
    let code = this.formGroup.controls['customer'].value;
    let description = this.formGroup.controls['description'].value;
    let agent = this.formGroup.controls['agent'].value;
    this.resultsTable.showLoader();
    this.customerService.filterCustomers(description, code, agent, 1).subscribe((data)=>{
      this.resultsResults = data.collection.filter((data) => data.initial_balance== 0);
      this.resultsTable.setPagination(data.pagination);
      this.resultsTable.hideLoader();
    }, error => {
     this.resultsTable.hideLoader();
     this.dataPasserService.sendError(error.errors[0])}
   )
 } 

 filterOnPagination(page){
   let code = this.formGroup.controls['customer'].value;
   let description = this.formGroup.controls['description'].value;
   let agent = this.formGroup.controls['agent'].value;
   this.resultsTable.showLoader();
   this.customerService.filterCustomers(description, code, agent, page).subscribe((data)=>{
     this.resultsResults = data.collection;
     this.resultsTable.setPagination(data.pagination);
     this.resultsTable.hideLoader();
   }, error => {
     this.resultsTable.hideLoader();
     this.dataPasserService.sendError(error.errors[0])}
   )
  } 

  getSelectedCustomer(){
     this.customer = this.dataPasserService.selectedData['customer'];
  }
}
