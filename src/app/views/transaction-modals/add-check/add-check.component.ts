import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'add-check',
  templateUrl: './add-check.component.html',
  styleUrls: ['./add-check.component.scss']
})
export class AddCheckComponent implements OnInit {
  @ViewChild('addCheckModal') addCheckModal: ModalDirective;
  checkForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.checkForm = this.initializeForm();
  }

  initializeForm(){
    return this.formBuilder.group({
      checkDate: [''],
      type: [''],
      accountNo: [''],
      branch: [''],
      bank: [''],
      checkNo: [''],
      amount: [''],
      days: ['']
      
    })
  }

  show(){
    this.addCheckModal.show();
  }

  hide(){
    this.addCheckModal.hide();
  }

  addCheck(){
    
  }


}
