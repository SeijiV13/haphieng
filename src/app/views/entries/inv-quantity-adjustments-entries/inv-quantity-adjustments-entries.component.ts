import { ProductsService } from './../../../web-services/products.service';
import { FormErrorHandlerService } from './../../../generic/services/form-error-handler.service';
import { AdjustmentsService } from './../../../web-services/adjustments.service';
import { ItemInOutModalComponent } from './../../transaction-modals/item-in-out-modal/item-in-out-modal.component';
import { SuspendedSalesComponent } from './../../transaction-modals/suspended-sales/suspended-sales.component';
import { AddSalesEntryComponent } from './../../transaction-modals/add-sales-entry/add-sales-entry.component';
import { AddCustomerComponent } from './../../transaction-modals/add-customer/add-customer.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataPasserService } from './../../../generic/services/data-passer.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GenericModalComponent } from '../../../generic/generic-modal/generic-modal.component';
const REFERENCE_NUMBER_LENGTH = 11;
@Component({
  selector: 'app-inv-quantity-adjustments-entries',
  templateUrl: './inv-quantity-adjustments-entries.component.html',
  styleUrls: ['./inv-quantity-adjustments-entries.component.scss']
})
export class InvQuantityAdjustmentsEntriesComponent implements OnInit {

  @ViewChild('itemInOutModal') itemInOutModal: ItemInOutModalComponent;
  @ViewChild('addCustomer') addCustomer: AddCustomerComponent;
  @ViewChild('addSalesEntry') addSalesEntry: AddSalesEntryComponent;
  @ViewChild('suspendedSales') suspendedSales: SuspendedSalesComponent;
  @ViewChild('errorModal') errorModal: GenericModalComponent;
  @ViewChild('infoModalSuspend') infoModalSuspend: GenericModalComponent;
  @ViewChild('infoModalPost') infoModalPost: GenericModalComponent;
  salesForm: FormGroup;
  retrievedSale: boolean = false;
  resultsHeaders = [
    "Row No.",
    "Category",
    "W1/W2",
    "Item code",
    "Qty New",
    "Qty Old",
    "Adjustment Remarks",
    "Item Remarks",
    "Remove"
  ]
  resultsResults = [];
  resultsKeys = [
     {"name": "rowNo"},
     {"name": "category"},
     {"name": "warehouse"},
     {"name": "itemCode"},
     {"name": "qtyNew"},
     {"name": "qtyOld"},
     {"name": "adjustmentRemarks"},
     {"name": "itemRemarks"}
  ];
    buttons = [
    {'name': "Post", 'id': "post-button", 'logo': 'glyphicon glyphicon-file', 'type': 'post', 'behavior':'single'},
    {'name': "Resume", 'id': "resume-button", 'logo': 'glyphicon glyphicon-pencil', 'type': 'resume', 'behavior':'single'},
    {'name': "Suspend", 'id': "suspend-button", 'logo': 'glyphicon glyphicon-download', 'type': 'suspend', 'behavior':'single'},
    {'name': "Item Transaction", 'id': "trans-button", 'logo': 'glyphicon glyphicon-file', 'type': 'itemtrans', 'behavior':'single'}
  ]
  constructor(private dataPasserService: DataPasserService, 
  private fb: FormBuilder, 
  private adjustmentService: AdjustmentsService,
  private formErrorHandler: FormErrorHandlerService,
  private productService: ProductsService) { }

  ngOnInit() {
    this.dataPasserService.sendPageTitle("IVENTORY QUANTITY ADJUSTMENT ENTRY");
    this.salesForm = this.fb.group({
      id: [''],
      refNo: ['', Validators.required],
      date: [''],
      total: [{value:'', disabled: true}]
    })
  }

  print(type: string){

  }

  addEntry(){
    // if(!this.salesForm.controls['customer'].value){
    //   this.errorModal.showWithCustomMessage("Please select a customer");
    //   this.salesForm.controls['customer'].setErrors(Validators.required);
    // }else{
      this.addSalesEntry.show('');
    // }
  }

  addNewCustomer(){
    this.addCustomer.show();
  }

  pushNewItem(entry){
    //get price 
    let gross_price = entry['originalprice'];
    let newAmount =  parseFloat(gross_price) * parseFloat(entry['qtyNew']);
    //compute for amount
    entry['amount'] = newAmount;
    entry['newAmount'] = newAmount;
    this.resultsResults.push(entry);
    this.computeTotal();
  }

  computeTotal(){
    let total = 0
    for(let result of this.resultsResults){
      total = total + result.amount;
    }
    this.salesForm.controls['total'].setValue(total);

  }

  doAction(type){
    if(type === 'post'){
      this.infoModalPost.showWithCustomMessage('Are you sure you want to post the transaction?');

    }else if(type === 'resume'){
      this.suspendedSales.show();

    }else if(type === 'suspend'){
      this.infoModalSuspend.showWithCustomMessage('Are you sure you want to suspend the transaction?');
    }else if(type === 'itemtrans'){
      this.itemInOutModal.show();
      
    }
  }
  
  removeRow(index){
    this.resultsResults.splice(index, 1);
    this.computeTotal();
  }

    postTransaction(){
    if (!this.salesForm.valid) {
      this.errorModal.messageKey = 'acceptError';
      this.errorModal.show();
      this.formErrorHandler.markFormDirty(this.salesForm);
         
     }else{
      if(this.resultsResults.length == 0){
        this.errorModal.showWithCustomMessage('There are no items selected');

      }else{
        if(!this.retrievedSale){
          let sale = this.createSaleJson('posted');
          this.adjustmentService.createAdjustment(sale).subscribe((data)=>{
            this.salesForm.reset();
            this.resultsResults = [];
            this.retrievedSale = false;
            this.infoModalPost.hide();
          }, error => this.dataPasserService.sendError(error.errors[0]));
        }else{
          let sale = this.createSaleJson('posted');
          this.adjustmentService.editAdjustment(this.salesForm.controls['id'].value,sale).subscribe((data)=>{
            this.salesForm.reset();
            this.resultsResults = [];
            this.retrievedSale = false;
            this.infoModalPost.hide();
          }, error => this.dataPasserService.sendError(error.errors[0]));
        }
        this.salesForm.controls['refNo'].enable();
      }
     }
  
  }

  suspendTransaction(){
    if (!this.salesForm.valid) {
      this.errorModal.messageKey = 'acceptError';
      this.errorModal.show();
      this.formErrorHandler.markFormDirty(this.salesForm);
         
     }else{
      if(this.resultsResults.length == 0){
        this.errorModal.showWithCustomMessage('There are no items selected');

      }else{
        if(!this.retrievedSale){
          let sale = this.createSaleJson('suspended');
          this.adjustmentService.createAdjustment(sale).subscribe((data)=>{
            this.salesForm.reset();
            this.resultsResults = [];
            this.retrievedSale = false;
            this.infoModalPost.hide();
          }, error => this.dataPasserService.sendError(error.errors[0]));
        }else{
          let sale = this.createSaleJson('suspended');
          this.adjustmentService.editAdjustment(this.salesForm.controls['id'].value,sale).subscribe((data)=>{
            this.salesForm.reset();
            this.resultsResults = [];
            this.infoModalPost.hide();
            this.retrievedSale = false;
          }, error => this.dataPasserService.sendError(error.errors[0]));
        }
        this.salesForm.controls['refNo'].enable();
       }
     }
    

  }

    retrieveSuspendedSale(sales){
    this.salesForm.controls['id'].setValue(sales.data.id);
    this.salesForm.controls['date'].setValue(sales.data.attributes.date);
    this.salesForm.controls['refNo'].setValue(sales.data.attributes.reference_number);
    this.salesForm.controls['total'].setValue(sales.data.attributes.total);
    this.retrievedSale = true;
    this.salesForm.controls['refNo'].disable();
    this.resultsResults = [];
    this.retrieveItemsOfSuspendedSale(sales);
  }

  retrieveItemsOfSuspendedSale(sales){
    this.productService.getProducts().subscribe((data)=>{
      for(let item of sales.included){
        let selecteditem = data.filter((items) => items.id == item.attributes.product_id);
        if(selecteditem){
          let originalprice = parseFloat(item.attributes['price_override']);
          selecteditem[0]['price'] = originalprice;
          
          //compute for amount
          selecteditem[0]['amount'] = parseFloat(selecteditem[0]['price']) * parseFloat(item.attributes['quantity']);
          this.resultsResults.push({
            id: selecteditem[0]['id'],
            itemCode: selecteditem[0]['code'],
            description:  selecteditem[0]['description'],
            originalprice: selecteditem[0]['gross_price'],
            available: selecteditem[0]['available_quantity'],
            pending: selecteditem[0]['pending_quantity'],
            itemRemarks: selecteditem[0]['remarks_1'],
            category: selecteditem[0]['category'],

            agent: item.attributes.agent_id,
            lastprice: "",
            quantity: item.attributes.quantity,
            warehouse: item.attributes.warehouse,
            good: "",
            qtyNew: item.attributes.after,
            qtyOld: item.attributes.before,
            adjustmentRemarks: item.attributes.remarks,

            price: selecteditem[0]['price'],
            amount: selecteditem[0]['amount']
            
          })
          this.computeTotal();

        }
      }
     
    })
 
   
   
  }

  createSaleJson(status){
    let json = {
      date: this.salesForm.controls['date'].value,
      reference_number: this.salesForm.controls['refNo'].value,
      status: status,
      product_adjustments_attributes: [
      ]
    }

    for(let item of this.resultsResults){
      json.product_adjustments_attributes.push({
        before: item.available,
        after: item.qtyNew,
        date: this.salesForm.controls['date'].value,
        warehouse: item.warehouse, //== "W2" ? 'warehouse_2_stock': 'warehouse_1_stock',
        remarks: item.adjustmentRemarks,
        product_id: item.id
      })
    }

    return json;
  }
  

  latestRefNoChecker(data){
     let highestrefno  = 0;
     for(let sale of data){
      if(parseInt(sale.attributes.reference_number.substr(1)) > highestrefno){
        highestrefno = parseInt(sale.attributes.reference_number.substr(1));
      }
     }
     return highestrefno
  }

  typeAheadRef(event){
    this.salesForm.controls['refNo'].disable();
    this.adjustmentService.getFilteredAdjustmentsWithoutPage(event.target.value).subscribe((data)=>{
      if(data.data.length != 0){
          let finalref = "";
          let latestrefno = this.latestRefNoChecker(data.data)
          let nextindex = latestrefno + 1;

          let zerolength =  REFERENCE_NUMBER_LENGTH - nextindex.toString().length;
          for(let i = 0; i < zerolength; i ++){
            finalref = finalref + "0";
          }

          finalref = event.target.value + finalref + nextindex.toString();
          this.salesForm.controls['refNo'].setValue(finalref);

      }else{
        if(event.target.value && event.target.value.length == 1){
          this.salesForm.controls['refNo'].setValue(event.target.value + "00000000001");
        }
  
      }
    })
  
  }

  resetRefNo(){
    this.salesForm.controls['refNo'].enable();
    this.salesForm.controls['refNo'].reset();
  }

   changeValueOnEditTable(event) {
    (this.resultsResults[event.index])[event.key.name] = event.value;
  }

}
