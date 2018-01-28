import { ModalDirective } from 'ngx-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.scss']
})
export class AddSupplierComponent implements OnInit {
  @ViewChild('addSupplierModal') addSupplierModal: ModalDirective;
  browseForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
     this.browseForm = this.fb.group({
      supplierCode: [''],
      description:[''],
      telephone: [''],
      fax: [''],
      initialBalance: [''],
      address: [''],
      addressTwo: [''],
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

  }

}
