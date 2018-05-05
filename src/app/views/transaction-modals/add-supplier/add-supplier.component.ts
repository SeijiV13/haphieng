import { ModalDirective } from 'ngx-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SupplierService } from '../../../web-services/supplier.service';
import { DataPasserService } from '../../../generic/services/data-passer.service';


@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.scss']
})
export class AddSupplierComponent implements OnInit {
  @ViewChild('addSupplierModal') addSupplierModal: ModalDirective;
  browseForm: FormGroup;
  constructor(private fb: FormBuilder, private supplierService: SupplierService, private dataPasserService: DataPasserService) { }

  ngOnInit() {
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
    });
  }
  show(){
    this.addSupplierModal.show();
  }
  hide(){
    this.addSupplierModal.hide();
  }

  addSupplier(){
     this.supplierService.createSupplier(this.browseForm.value).subscribe((data)=>{
           this.addSupplierModal.hide();
     }, error  => this.dataPasserService.sendError(error.errors[0]));
  }

}
