import { ViewItemsComponent } from './../../transaction-modals/view-items/view-items.component';
import { AdjustmentsService } from './../../../web-services/adjustments.service';
import { AddCustomerComponent } from './../../transaction-modals/add-customer/add-customer.component';
import { DataPasserService } from './../../../generic/services/data-passer.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { CustomerService } from '../../../web-services/customer.service';
import { DamageService } from '../../../web-services/damage.service';
import { GenericTableComponent } from '../../../generic/generic-table/generic-table.component';

@Component({
  selector: 'app-view-edit-inv-adj',
  templateUrl: './view-edit-inv-adj.component.html',
  styleUrls: ['./view-edit-inv-adj.component.scss']
})
export class ViewEditInvAdjComponent implements OnInit {
  @ViewChild('resultsTable') resultsTable: GenericTableComponent;
  @ViewChild('viewItemsModal') viewItemsModal: ViewItemsComponent;
  formGroup :FormGroup;
  pagination = 1;
  browseForm: FormGroup;
  resultsHeaders = ['Row No','Ref No.', 'Date'];
  resultsResults = [ ]
  resultsKeys = [
    {name: 'rowNo'}, 
    {name: 'reference_number', objectname: 'attributes', behavior: 'clickable'},
    {name: 'date', objectname: 'attributes'},

  ];
  customers: any;

  constructor(private fb: FormBuilder, private dataPasserService: DataPasserService,
              private customerService: CustomerService,
              private adjustmentService: AdjustmentsService) { }
 
  ngOnInit() {
    this.dataPasserService.sendPageTitle("VIEW QUANTITY STOCK ADJUSTMENTS");
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
    this.adjustmentService.getFilteredAdjustments(refNo, 1, "posted").subscribe((data)=>{
      if(data.collection){
        this.resultsResults = (data.collection).data
      }else if(data.data){
        this.resultsResults = data.data;
      }
      this.resultsTable.hideLoader();
      this.resultsTable.setPagination(data.pagination);
    }, error => {
          this.resultsTable.hideLoader();
      this.dataPasserService.sendError(error.errors[0])}
    )

  }

  filterOnPagination(page){
    let customer = this.formGroup.controls['customer'].value;
    let refNo = this.formGroup.controls['refNo'].value;
    this.resultsTable.showLoader();
    this.adjustmentService.getFilteredAdjustments(refNo,  1, "posted").subscribe((data)=>{
      if(data.collection){
        this.resultsResults = (data.collection).data
      }else if(data.data){
        this.resultsResults = data.data;
      }
      this.resultsTable.setPagination(data.pagination);
          this.resultsTable.hideLoader();  
    }, error => {
    this.resultsTable.hideLoader();  
    this.dataPasserService.sendError(error.errors[0])
    } )
  }

  viewItems(result){
    this.viewItemsModal.show('adjustments', result.id);
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
