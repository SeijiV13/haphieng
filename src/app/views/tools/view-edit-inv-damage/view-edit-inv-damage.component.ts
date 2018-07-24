import { AddCustomerComponent } from './../../transaction-modals/add-customer/add-customer.component';
import { DataPasserService } from './../../../generic/services/data-passer.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { CustomerService } from '../../../web-services/customer.service';
import { DamageService } from '../../../web-services/damage.service';
import { GenericTableComponent } from '../../../generic/generic-table/generic-table.component';

@Component({
  selector: 'app-view-edit-inv-damage',
  templateUrl: './view-edit-inv-damage.component.html',
  styleUrls: ['./view-edit-inv-damage.component.scss']
})
export class ViewEditInvDamageComponent implements OnInit {
  @ViewChild('resultsTable') resultsTable: GenericTableComponent;
  formGroup :FormGroup;
  pagination = 1;
  browseForm: FormGroup;
  resultsHeaders = ['Ref No.', 'Date', 'Customer',  'Amount', 'Balance']
  resultsResults = []
  resultsKeys = [ 
   {name: 'requestNo', behavior: 'clickable'} 
  ]
  customers: any;

  constructor(private fb: FormBuilder, private dataPasserService: DataPasserService,
              private customerService: CustomerService,
              private damageService: DamageService) { }
 
  ngOnInit() {
    this.dataPasserService.sendPageTitle("VIEW INVENTORY DAMAGES");
    this.formGroup = this.fb.group({
      customer: [''],
      refNo: [''],

    });
   this.getDropdownValues();
  }

  getDropdownValues(){
    this.customerService.getCustomers().subscribe((data)=>{
      this.customers = data;
    })
  }

  filter(){
    let customer = this.formGroup.controls['customer'].value;
    let refNo = this.formGroup.controls['refNo'].value;
    this.damageService.getFilteredDamageItems(refNo, customer).subscribe((data)=>{
      this.resultsResults = data.collection;
      this.resultsTable.setPagination(data.pagination);
    }, error => this.dataPasserService.sendError(error.errors[0]))

  }
  filterOnPagination(page){
    let customer = this.formGroup.controls['customer'].value;
    let refNo = this.formGroup.controls['refNo'].value;
    this.damageService.getFilteredDamageItems(refNo, customer).subscribe((data)=>{
      this.resultsResults = data.collection;
      this.resultsTable.setPagination(data.pagination);
    }, error => this.dataPasserService.sendError(error.errors[0]))
  }
  print(type){
    if(type === 'old'){

    }else if (type === 'new'){

    }
     
  }
  editDetails(){}
  getSelectedProduct(){}
}
