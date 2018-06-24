import { AddCustomerComponent } from './../../transaction-modals/add-customer/add-customer.component';
import { DataPasserService } from './../../../generic/services/data-passer.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { CustomerService } from '../../../web-services/customer.service';
import { SalesService } from '../../../web-services/sales.service';

@Component({
  selector: 'app-view-edit-sales',
  templateUrl: './view-edit-sales.component.html',
  styleUrls: ['./view-edit-sales.component.scss']
})
export class ViewEditSalesComponent implements OnInit {
  formGroup :FormGroup
  browseForm: FormGroup;
  customers: any
  resultsHeaders = ['Row No.', 'Ref No.', 'Date', 'Customer', 'Terms', 'Total Amount']
  resultsResults = []
  resultsKeys = [ 
   {name: 'rowNo'},
   {name: 'reference_number'},
   {name: 'date'},
   {name: 'terms'},
   {name: 'total'} 
  ]

  constructor(private fb: FormBuilder, 
              private dataPasserService: DataPasserService,
              private customerService: CustomerService,
              private salesService: SalesService) { }
 
  ngOnInit() {
    this.dataPasserService.sendPageTitle("VIEW/EDIT SALES");
    this.formGroup = this.fb.group({
      customer: [''],
      refNo: [''],

    });
    this.getDropdownValues();
  }

  filter(){
    let customer = this.formGroup.controls['customer'].value;
    let refNo = this.formGroup.controls['refNo'].value;
    this.salesService.getFilteredSales(refNo, customer).subscribe((data)=>{
      this.resultsResults = data;
    })

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

  editDetails(){

  }

}
