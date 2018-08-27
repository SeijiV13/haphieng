import { AddCustomerComponent } from './../../transaction-modals/add-customer/add-customer.component';
import { DataPasserService } from './../../../generic/services/data-passer.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { CustomerService } from '../../../web-services/customer.service';
import { SalesService } from '../../../web-services/sales.service';
import { GenericTableComponent } from '../../../generic/generic-table/generic-table.component';

@Component({
  selector: 'app-view-edit-sales',
  templateUrl: './view-edit-sales.component.html',
  styleUrls: ['./view-edit-sales.component.scss']
})
export class ViewEditSalesComponent implements OnInit {
  @ViewChild('resultsTable') resultsTable: GenericTableComponent;
  formGroup :FormGroup;
  pagination = 1;
  browseForm: FormGroup;
  customers: any
  resultsHeaders = ['Row No.', 'Ref No.', 'Customer', 'Date','Terms', 'Total Amount']
  resultsResults = []
  resultsKeys = [ 
   {name: 'rowNo'},
   {name: 'reference_number', objectname: 'attributes'},
   {name: 'customer_id', filter: 'customer', objectname: 'attributes', "returnvalue": "code"},
   {name: 'date', objectname: 'attributes'},
   {name: 'terms' , objectname: 'attributes'},
   {name: 'total', objectname: 'attributes'},
  ]

  constructor(private fb: FormBuilder, 
              private dataPasserService: DataPasserService,
              private customerService: CustomerService,
              private salesService: SalesService) { }
 
  ngOnInit() {
    this.dataPasserService.sendPageTitle("VIEW SALES");
    this.formGroup = this.fb.group({
      customer: [''],
      refNo: [''],

    });
    this.getDropdownValues();
  }

  filter(){
    let customer = this.formGroup.controls['customer'].value;
    let refNo = this.formGroup.controls['refNo'].value;
    this.salesService.getFilteredSales(refNo, customer, 1, 'posted').subscribe((data)=>{
      if(data.collection){
        this.resultsResults = (data.collection).data
      }else if(data.data){
        this.resultsResults = data.data;
      }
      this.resultsTable.setPagination(data.pagination);
    }, error => this.dataPasserService.sendError(error.errors[0]))

  }

  filterOnPagination(page){
    let customer = this.formGroup.controls['customer'].value;
    let refNo = this.formGroup.controls['refNo'].value;
    this.salesService.getFilteredSales(refNo, customer, page, 'posted').subscribe((data)=>{
      if(data.collection){
        this.resultsResults = (data.collection).data
      }else if(data.data){
        this.resultsResults = data.data;
      }
      this.resultsTable.setPagination(data.pagination);
    }, error => this.dataPasserService.sendError(error.errors[0]))
  }


  print(type){
    if(type === 'old'){

    }else if (type === 'new'){

    }
     
  }

  getDropdownValues(){
     this.customerService.getCustomers().subscribe((data)=>{
       this.customers = data;
     })
  }

  editDetails(){ }

  getSelectedProduct(){}

}
