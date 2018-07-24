import { AddCustomerComponent } from './../../transaction-modals/add-customer/add-customer.component';
import { DataPasserService } from './../../../generic/services/data-passer.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { CustomerService } from '../../../web-services/customer.service';
import { SalesService } from '../../../web-services/sales.service';
import { GenericTableComponent } from '../../../generic/generic-table/generic-table.component';

@Component({
  selector: 'app-customer-transactions',
  templateUrl: './customer-transactions.component.html',
  styleUrls: ['./customer-transactions.component.scss']
})
export class CustomerTransactionsComponent implements OnInit {
  formGroup :FormGroup;
  pagination = 1;
  browseForm: FormGroup;
  resultsHeaders = ['Row No.', 'Ref No.', 'Customer', 'Date',  'Amount', 'Balance']
  resultsResults = []
  resultsKeys = [ 
    {name: 'rowNo'},
    {name: 'reference_number'},
    {name: 'customer_id', filter: 'customer'},
    {name: 'date'},
    {name: 'terms'},
    {name: 'total'} 
   ]
  customers: any;
  @ViewChild('resultsTable') resultsTable: GenericTableComponent; 
  constructor(private fb: FormBuilder, 
              private dataPasserService: DataPasserService,
              private customerService: CustomerService,
              private salesService: SalesService) { }
 
  ngOnInit() {
    this.dataPasserService.sendPageTitle("CUSTOMER TRANSACTIONS");
    this.formGroup = this.fb.group({
      customer: [''],
    });
    this.getDropdownValues();

  }

  getDropdownValues(){
    this.customerService.getCustomers().subscribe((data)=>{
      this.customers = data;
    });
  }

  filter(){
    let customer = this.formGroup.controls['customer'].value;

    this.salesService.getFilteredSales("", customer, 1).subscribe((data)=>{
      this.resultsResults = data.collection;
      this.resultsTable.setPagination(data.pagination);
    }, error => this.dataPasserService.sendError(error.errors[0]))

  }

  filterOnPagination(page){
    let customer = this.formGroup.controls['customer'].value;
    this.salesService.getFilteredSales("", customer, page).subscribe((data)=>{
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
