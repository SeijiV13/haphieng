import { AddCustomerComponent } from './../../transaction-modals/add-customer/add-customer.component';
import { DataPasserService } from './../../../generic/services/data-passer.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { CustomerService } from '../../../web-services/customer.service';
import { DamageService } from '../../../web-services/damage.service';
import { GenericTableComponent } from '../../../generic/generic-table/generic-table.component';
import { ViewItemsComponent } from '../../transaction-modals/view-items/view-items.component';

@Component({
  selector: 'app-view-edit-inv-damage',
  templateUrl: './view-edit-inv-damage.component.html',
  styleUrls: ['./view-edit-inv-damage.component.scss']
})
export class ViewEditInvDamageComponent implements OnInit {
  @ViewChild('resultsTable') resultsTable: GenericTableComponent;
  @ViewChild('viewItemsModal') viewItemsModal: ViewItemsComponent;
  formGroup :FormGroup;
  pagination = 1;
  browseForm: FormGroup;
  resultsHeaders = ['Row No.', 'Ref No.', 'Customer',  'Date',  'Terms', 'Total']
  resultsResults = []
  resultsKeys = [ 
    {name: 'rowNo'},
    {name: 'reference_number', objectname: 'attributes', behavior: 'clickable'},
    {name: 'customer_id', filter: 'customer' , objectname: 'attributes', "returnvalue": "code"},
    {name: 'date', objectname: 'attributes'},
    {name: 'terms', objectname: 'attributes'},
    {name: 'total', objectname: 'attributes'} 
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
    this.resultsTable.showLoader();
    this.damageService.getFilteredDamageItems(refNo, customer, 1, 'posted').subscribe((data)=>{
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
    let customer = this.formGroup.controls['customer'].value;
    let refNo = this.formGroup.controls['refNo'].value;
    this.resultsTable.showLoader();
    this.damageService.getFilteredDamageItems(refNo, customer, page, 'posted').subscribe((data)=>{
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
    this.viewItemsModal.show('damage', result.id);
  }

  print(type){
    if(type === 'old'){

    }else if (type === 'new'){

    }
     
  }
  editDetails(){}
  getSelectedProduct(){}
}
