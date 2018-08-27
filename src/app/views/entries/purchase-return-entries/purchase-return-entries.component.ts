import { ItemInOutModalComponent } from './../../transaction-modals/item-in-out-modal/item-in-out-modal.component';
import { AddSupplierComponent } from './../../transaction-modals/add-supplier/add-supplier.component';
import { SuspendedSalesComponent } from './../../transaction-modals/suspended-sales/suspended-sales.component';
import { AddSalesEntryComponent } from './../../transaction-modals/add-sales-entry/add-sales-entry.component';
import { AddCustomerComponent } from './../../transaction-modals/add-customer/add-customer.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataPasserService } from './../../../generic/services/data-passer.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SupplierService } from '../../../web-services/supplier.service';
import { PurchaseService } from '../../../web-services/purchase.service';
import { GenericModalComponent } from '../../../generic/generic-modal/generic-modal.component';
import { FormErrorHandlerService } from '../../../generic/services/form-error-handler.service';
import { ProductsService } from '../../../web-services/products.service';
const REFERENCE_NUMBER_LENGTH = 11;
@Component({
  selector: 'app-purchase-return-entries',
  templateUrl: './purchase-return-entries.component.html',
  styleUrls: ['./purchase-return-entries.component.scss']
})
export class PurchaseReturnEntriesComponent implements OnInit {
  @ViewChild('itemInOutModal') itemInOutModal: ItemInOutModalComponent;
  @ViewChild('addSupplier') addSupplier: AddSupplierComponent;
  @ViewChild('addSalesEntry') addSalesEntry: AddSalesEntryComponent;
  @ViewChild('suspendedSales') suspendedSales: SuspendedSalesComponent;
  @ViewChild('infoModalSuspend') infoModalSuspend: GenericModalComponent;
  @ViewChild('infoModalPost') infoModalPost: GenericModalComponent;
  @ViewChild('errorModal') errorModal: GenericModalComponent;
  purchaseForm: FormGroup;
  resultsHeaders = [
    "Row No.",
    "Item code",
    "Good",
    "Quantity",
    "Quantity Stock",
    "Description",
    "W1/W1",
    "Price",
    "Amount",
    "Remove"
  ]
  resultsResults = [];
  resultsKeys = [
     {"name": "rowNo"},
     {"name": "itemCode"},
     {"name": "good"},
     {"name": "quantity"},
     {"name": "available"},
     {"name": "description"},
     {"name": "warehouse"},
     {"name": "price"},
     {"name": "amount"},
  ];
    buttons = [
    {'name': "Post", 'id': "post-button", 'logo': 'glyphicon glyphicon-file', 'type': 'post', 'behavior':'single'},
    {'name': "Resume", 'id': "resume-button", 'logo': 'glyphicon glyphicon-pencil', 'type': 'resume', 'behavior':'single'},
    {'name': "Suspend", 'id': "suspend-button", 'logo': 'glyphicon glyphicon-download', 'type': 'suspend', 'behavior':'single'},
    {'name': "Item Transaction", 'id': "trans-button", 'logo': 'glyphicon glyphicon-file', 'type': 'itemtrans', 'behavior':'single'}
  ]
  suppliers: Array<any>;
  retrievedSale:boolean = false;
  constructor(private dataPasserService: DataPasserService, 
              private fb: FormBuilder,
              private supplierService: SupplierService,
              private purchaseService: PurchaseService,
              private formErrorHandler: FormErrorHandlerService,
              private productService: ProductsService) {
                this.getDropdownValues();
               }

  ngOnInit() {
    this.dataPasserService.sendPageTitle("PURCHASE RETURN ENTRY");
    this.purchaseForm = this.fb.group({
      id: [''],
      refNo: ['', Validators.required],
      date: [''],
      currency: ['', Validators.required],
      supplier: ['', Validators.required],
      terms: [''],
      totalpeso: [{value:'', disabled: true}],
      totalyuan: [{value:'', disabled: true}]
    })
  }
  getDropdownValues(){
    this.supplierService.getSuppliers().subscribe((data)=>{
      this.suppliers = data;
    })
  }

  print(type: string){}

  addEntry(){
    if(!this.purchaseForm.controls['supplier'].value){
      this.errorModal.showWithCustomMessage("Please select a customer");
      this.purchaseForm.controls['supplier'].setErrors(Validators.required);
    }else{
      this.addSalesEntry.show(this.purchaseForm.controls['supplier'].value);
    }
  }
  addNewSupplier(){
    this.addSupplier.show();
  }


  pushNewItem(entry){
    //get price 
    let lastprice = parseFloat(entry['lastprice'])
    let originalprice = parseFloat(entry['originalprice']);
    if(lastprice){
      entry['price'] = lastprice;
    }else{
      entry['price'] = originalprice;
    }
    //compute for amount
    entry['amount'] = parseFloat(entry['price']) * parseFloat(entry['quantity']);
    this.resultsResults.push(entry);
    this.computeTotal();
  }

  computeTotal(){
    let total = 0
    for(let result of this.resultsResults){
      total = total + result.amount;
    }
    this.purchaseForm.controls['totalpeso'].setValue(total);
    this.purchaseForm.controls['totalyuan'].setValue(total / 8.13)
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

  postTransaction(){
    if (!this.purchaseForm.valid) {
      this.errorModal.messageKey = 'acceptError';
      this.errorModal.show();
      this.formErrorHandler.markFormDirty(this.purchaseForm);
         
     }else{
      if(this.resultsResults.length == 0){
        this.errorModal.showWithCustomMessage('There are no items selected');

      }else{
        if(!this.retrievedSale){
          let purchase = this.createPurchaseReturnJson('posted');
          this.purchaseService.createPurchaseReturn(purchase).subscribe((data)=>{
            this.purchaseForm.reset();
            this.resultsResults = [];
            this.retrievedSale = false;
            this.infoModalPost.hide();
          }, error => this.dataPasserService.sendError(error.errors[0]));
        }else{
          let purchase = this.createPurchaseReturnJson('posted');
          this.purchaseService.editPurchaseReturn(this.purchaseForm.controls['id'].value,purchase).subscribe((data)=>{
            this.purchaseForm.reset();
            this.resultsResults = [];
            this.retrievedSale = false;
            this.infoModalPost.hide();
          }, error => this.dataPasserService.sendError(error.errors[0]));
        }
        this.purchaseForm.controls['refNo'].enable();
      }
     }
  
  }

  suspendTransaction(){
    if (!this.purchaseForm.valid) {
      this.errorModal.messageKey = 'acceptError';
      this.errorModal.show();
      this.formErrorHandler.markFormDirty(this.purchaseForm);
         
     }else{
      if(this.resultsResults.length == 0){
        this.errorModal.showWithCustomMessage('There are no items selected');

      }else{
        if(!this.retrievedSale){
          let purchase = this.createPurchaseReturnJson('suspended');
          this.purchaseService.createPurchaseReturn(purchase).subscribe((data)=>{
            this.purchaseForm.reset();
            this.resultsResults = [];
            this.retrievedSale = false;
            this.infoModalPost.hide();
          }, error => this.dataPasserService.sendError(error.errors[0]));
        }else{
          let purchase = this.createPurchaseReturnJson('suspended');
          this.purchaseService.editPurchaseReturn(this.purchaseForm.controls['id'].value, purchase).subscribe((data)=>{
            this.purchaseForm.reset();
            this.resultsResults = [];
            this.retrievedSale = false;
            this.infoModalPost.hide();
          }, error => this.dataPasserService.sendError(error.errors[0]));
        }
        this.purchaseForm.controls['refNo'].enable();
       }
     }
    

  }

  retrieveSuspendedPurchase(purchase){
    this.purchaseForm.controls['id'].setValue(purchase.data.id);
    this.purchaseForm.controls['currency'].setValue(purchase.data.attributes.currency);
    this.purchaseForm.controls['date'].setValue(purchase.data.attributes.date);
    this.purchaseForm.controls['refNo'].setValue(purchase.data.attributes.reference_number);
    this.purchaseForm.controls['terms'].setValue(purchase.data.attributes.terms);
    this.purchaseForm.controls['totalpeso'].setValue(purchase.data.attributes.total_peso);
    this.purchaseForm.controls['totalyuan'].setValue(purchase.data.attributes.total_yuan);
    this.purchaseForm.controls['supplier'].setValue(purchase.data.attributes.supplier_id);


    this.retrievedSale = true;
    this.purchaseForm.controls['refNo'].disable();
    this.resultsResults = [];
    this.retrieveItemsOfSuspendedSale(purchase);
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
            warehouse: item.attributes.warehouse_source,
            good: item.attributes.good,
            qtyNew: "",
            adjustmentRemarks: "",

            price: selecteditem[0]['price'],
            amount: selecteditem[0]['amount']
            
          })
          this.computeTotal();

        }
      }
     
    })
 
   
   
  }

  createPurchaseReturnJson(status){
    let json = {
      currency: this.purchaseForm.controls['currency'].value,
      date: this.purchaseForm.controls['date'].value,
      status: status,
      reference_number: this.purchaseForm.controls['refNo'].value,
      terms: this.purchaseForm.controls['terms'].value,
      total_peso: this.purchaseForm.controls['totalpeso'].value,
      total_yuan: this.purchaseForm.controls['totalyuan'].value,
      supplier_id: this.purchaseForm.controls['supplier'].value,
      product_purchase_returns_attributes: [
      ]
    }

    for(let item of this.resultsResults){
      json.product_purchase_returns_attributes.push({
        good: item.good,
        quantity: item.quantity,
        warehouse_source: item.warehouse, //== "W2" ? 'warehouse_2_stock': 'warehouse_1_stock',
        price_override: item.price,
        product_id: item.id
      })
    }



    return json;
  }
  

   removeRow(index){
    this.resultsResults.splice(index, 1);
    this.computeTotal();
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
   this.purchaseForm.controls['refNo'].disable();
   this.purchaseService.getFilteredPurchaseReturnsWithoutPage(event.target.value).subscribe((data)=>{
     if(data.data.length != 0){
         let finalref = "";
         let latestrefno = this.latestRefNoChecker(data.data)
         let nextindex = latestrefno + 1;

         let zerolength =  REFERENCE_NUMBER_LENGTH - nextindex.toString().length;
         for(let i = 0; i < zerolength; i ++){
           finalref = finalref + "0";
         }

         finalref = event.target.value + finalref + nextindex.toString();
         this.purchaseForm.controls['refNo'].setValue(finalref);

     }else{
       if(event.target.value && event.target.value.length == 1){
         this.purchaseForm.controls['refNo'].setValue(event.target.value + "00000000001");
       }
 
     }
   })
 
 }

 resetRefNo(){
   this.purchaseForm.controls['refNo'].enable();
   this.purchaseForm.controls['refNo'].reset();
 }

}
