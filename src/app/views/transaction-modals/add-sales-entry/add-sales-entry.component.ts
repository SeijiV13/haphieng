import { ItemInOutModalComponent } from './../item-in-out-modal/item-in-out-modal.component';
import { GenericModalComponent } from './../../../generic/generic-modal/generic-modal.component';
import { DataPasserService } from './../../../generic/services/data-passer.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { ProductsService } from '../../../web-services/products.service';
import { AgentService } from '../../../web-services/agent.service';
import { GenericTableComponent } from '../../../generic/generic-table/generic-table.component';
import { FormErrorHandlerService } from '../../../generic/services/form-error-handler.service';

@Component({
  selector: 'app-add-sales-entry',
  templateUrl: './add-sales-entry.component.html',
  styleUrls: ['./add-sales-entry.component.scss']
})
export class AddSalesEntryComponent implements OnInit {
  @ViewChild('itemInOutModalEntry') itemInOutModalEntry : ItemInOutModalComponent;
  @ViewChild('historyModal') historyModal: GenericModalComponent;
  @ViewChild('entryTable') entryTable: GenericTableComponent;
  @Input() addTitle: string ="";
  agents: Array<any>;
  entryHeaders = [
    'Item Code',
    'Description',
    'Available Quantity',
    'Pending Quantity',
    'Original Price'
  ];
  entryResults = [];
  pagination: any;
  entryKeys = [
    {name:"code", behavior: 'clickable'},
    {name:"description"},
    {name:"available_quantity"},
    {name:"pending_quantity"},
    {name:"gross_price"},
  ];
  salesEntryGroup: FormGroup;
  @Input("type") type: string;
  @Output("entry") entry = new EventEmitter();
  @ViewChild('addSalesEntryModal') addSalesEntryModal: ModalDirective;
  @ViewChild('errorModal') errorModal: GenericModalComponent;
  constructor(private dataPasserService: DataPasserService,
               private fb: FormBuilder, 
               private productService: ProductsService,
               private agentService: AgentService,
               private formErrorHandler: FormErrorHandlerService) {
                 this.getDropdownValues();
                }

  ngOnInit() {
    this.salesEntryGroup = this.fb.group({
      agent:['', Validators.required],
      itemCode: [''],
      category: [''],
      lastprice: [''],
      quantity: [''],
      qtyNew: [''],
      warehouse: [''],
      good: [''],
      adjustmentRemarks: ['']
    });
    if(this.type == 'sales'){
      this.salesEntryGroup.controls['quantity'].setValidators(Validators.required);
    }
    if(this.type == 'salesReturn'){
       this.salesEntryGroup.controls['warehouse'].setValidators(Validators.required);
       this.salesEntryGroup.controls['good'].setValidators(Validators.required);
       this.salesEntryGroup.controls['quantity'].setValidators(Validators.required);
    }
    if(this.type === 'purchase'){
       this.salesEntryGroup.controls['warehouse'].setValidators(Validators.required);
       this.salesEntryGroup.controls['quantity'].setValidators(Validators.required);
       this.salesEntryGroup.controls['agent'].setValidators(null);
    }
    if(this.type === 'purchaseReturn'){
       this.salesEntryGroup.controls['warehouse'].setValidators(Validators.required);
        this.salesEntryGroup.controls['good'].setValidators(Validators.required);
        this.salesEntryGroup.controls['quantity'].setValidators(Validators.required);
       this.salesEntryGroup.controls['agent'].setValidators(null);
    }
  }

  getDropdownValues(){
    this.agentService.getAgents().subscribe((data)=>{
      this.agents = data;
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
      if(this.dataPasserService.selectedData['product']){
        let entry = {
          itemCode: this.dataPasserService.selectedData['product']['code'],
          description:  this.dataPasserService.selectedData['product']['description'],
          originalprice: this.dataPasserService.selectedData['product']['gross_price'],
          available: this.dataPasserService.selectedData['product']['available_quantity'],
          pending: this.dataPasserService.selectedData['product']['pending_quantity'],
          itemRemarks: this.dataPasserService.selectedData['product']['remarks_1'],
          category: this.dataPasserService.selectedData['product']['category'],
    
          agent: this.salesEntryGroup.controls['agent'].value,
          lastprice: this.salesEntryGroup.controls['lastprice'].value,
          quantity: this.salesEntryGroup.controls['quantity'].value,
          warehouse: this.salesEntryGroup.controls['warehouse'].value,
          good: this.salesEntryGroup.controls['good'].value,
          qtyNew: this.salesEntryGroup.controls['qtyNew'].value,
          adjustmentRemarks: this.salesEntryGroup.controls['adjustmentRemarks'].value
        
        }
        this.addSalesEntryModal.hide();
        this.entry.emit(entry);
      }else{
        this.errorModal.showWithCustomMessage('Please select an item.');
      }
   

    }else{
      this.formErrorHandler.markFormDirty(this.salesEntryGroup);
      this.errorModal.messageKey = "acceptError";
      this.errorModal.show();
     
    }

  }

  itemInOutModal(event){
    this.itemInOutModalEntry.show();
  }

  historyWarning(event){
    let writePrice = event.target.value
    if(writePrice)
    this.historyModal.showWithCustomMessage("Do you want to save the price in the customer history?");
  }

  historyChange(){
  }

  filter(){
    let code = this.salesEntryGroup.controls['itemCode'].value;
    let category = this.salesEntryGroup.controls['category'].value;
    this.productService.filterProducts(code, category, 1).subscribe((data)=>{
      this.entryResults = data.collection;
      this.pagination = data.pagination;
      this.entryTable.setPagination(data.pagination);
    }, error=>  this.dataPasserService.sendError(error.errors[0]));
  }

  filterOnPagination(page){
    let code = this.salesEntryGroup.controls['itemCode'].value;
    let category = this.salesEntryGroup.controls['category'].value;
    this.productService.filterProducts(code, category, page).subscribe((data)=>{
      this.entryResults = data.collection;
      this.pagination = data.pagination;
      this.entryTable.setPagination(data.pagination);
    }, error=>  this.dataPasserService.sendError(error.errors[0]));
  }

}
