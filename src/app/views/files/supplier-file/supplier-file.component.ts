import { AddSupplierComponent } from './../../transaction-modals/add-supplier/add-supplier.component';
import { DataPasserService } from './../../../generic/services/data-passer.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SupplierService } from '../../../web-services/supplier.service';
import { GenericTableComponent } from '../../../generic/generic-table/generic-table.component';

@Component({
  selector: 'app-supplier-file',
  templateUrl: './supplier-file.component.html',
  styleUrls: ['./supplier-file.component.scss']
})
export class SupplierFileComponent implements OnInit {
  @ViewChild('addSupplierModal') addSupplierModal: AddSupplierComponent;
  @ViewChild('resultsTable') resultsTable: GenericTableComponent;
  pagination = 1;
  formGroup: FormGroup;
  browseForm: FormGroup;
  resultsHeaders = ['Row No.', 'Supplier Code', 'Description', 'Telephone', 'Address', 'Address2']
  resultsResults = []
  resultsKeys = [
   {name: 'rowNo'}, 
   {name: 'code', behavior: 'clickable'},
   {name: 'description'},
   {name: 'telephone'},
   {name: 'address_1'},
   {name: 'address_2'}
  ]
  pricingHeaders = ['Item Code', 'Cost', 'New Date', 'New Cost'];
  pricingResults = [];
  pricingKeys = []

  constructor(private fb: FormBuilder, private dataPasserService: DataPasserService, private supplierService: SupplierService) { }

  ngOnInit() {
    this.dataPasserService.sendPageTitle('SUPPLIER FILE');
    this.formGroup = this.fb.group({
      description:[''],
      supplierCode: ['']
    });
    this.browseForm = this.fb.group({
      code: [''],
      description:[''],
      telephone: [''],
      fax: [''],
      initial_balance: [''],
      address_1: [''],
      address_2: [''],
      email: [''],
      terms: [''],
      remaining: ['']
    })
  }
  editDetails(){
    this.supplierService.editSupplier(this.browseForm.value, this.dataPasserService.selectedData['supplier'].id).subscribe((data)=>{

    }, error  => this.dataPasserService.sendError(error.errors[0]));

  }
  filter(){
    let code = this.formGroup.controls['supplierCode'].value;
    let description = this.formGroup.controls['description'].value;
    this.resultsTable.showLoader();
    this.supplierService.filterSuppliers(code, description, 1).subscribe((data)=>{
      this.resultsResults = data.collection;
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
    this.supplierService.filterSuppliers(code, description, page).subscribe((data)=>{
      this.resultsResults = data.collection;
      this.resultsTable.setPagination(data.pagination);
      this.resultsTable.hideLoader();
    }, error => {
      this.resultsTable.hideLoader();
      this.dataPasserService.sendError(error.errors[0])}
    )

  }

  getSelectedSupplier(){
    this.browseForm.patchValue(this.dataPasserService.selectedData['supplier'])
  }
  addNewSupplier(){
    this.addSupplierModal.show();
  }
}
