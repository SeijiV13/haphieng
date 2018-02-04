import { GenericModalComponent } from './../../../generic/generic-modal/generic-modal.component';
import { DataPasserService } from './../../../generic/services/data-passer.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-sales-entry',
  templateUrl: './add-sales-entry.component.html',
  styleUrls: ['./add-sales-entry.component.scss']
})
export class AddSalesEntryComponent implements OnInit {
  agents = [
    {"value": "agent1", "label": "Agent 1"}
  ]
  entryHeaders = [
    'Item Code',
    'Description',
    'Available Quantity',
    'Pending Quantity',
    'Original Price'
  ];
  entryResults = [
    {"itemCode": "00001", "description": "descriptions", "available": "12000", "pending": "300", "price":"100"}
  ];
  entryKeys = [
    {name: "itemCode"},
    {name:"description"},
    {name: "available"},
    {name: "pending"},
    {name: "price"},
  ];
  salesEntryGroup: FormGroup;
  @Input("type") type: string;
  @Output("entry") entry = new EventEmitter();
  @ViewChild('addSalesEntryModal') addSalesEntryModal: ModalDirective;
  @ViewChild('errorModal') errorModal: GenericModalComponent;
  constructor(private dataPasserService: DataPasserService, private fb: FormBuilder) { }

  ngOnInit() {
    this.salesEntryGroup = this.fb.group({
      agent:['', Validators.required],
      itemCode: [''],
      description: [''],
      lastprice: [''],
      quantity: ['', Validators.required],
      warehouse: ['', Validators.required],
      good: ['', Validators.required],


    })
  }


  show(){
    this.addSalesEntryModal.show();
  }

  hide(){
    this.addSalesEntryModal.hide();
  }

  addEntry(){
    if(this.salesEntryGroup.valid){
      let entry = {
      itemCode: this.dataPasserService.selectedData['itemCode'],
      description:  this.dataPasserService.selectedData['description'],
      originalprice: this.dataPasserService.selectedData['price'],
      available: this.dataPasserService.selectedData['available'],
      pending: this.dataPasserService.selectedData['pending'],

      agent: this.salesEntryGroup.controls['agent'].value,
      lastprice: this.salesEntryGroup.controls['lastprice'].value,
      quantity: this.salesEntryGroup.controls['quantity'].value,
      warehouse: this.salesEntryGroup.controls['warehouse'].value,
      good: this.salesEntryGroup.controls['good'].value,
    
    }
    this.addSalesEntryModal.hide();
    this.entry.emit(entry);

    }else{
      this.errorModal.messageKey = "acceptError";
      this.errorModal.show();
     
    }

  }

}
