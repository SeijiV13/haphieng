import { ItemInOutModalComponent } from './../../transaction-modals/item-in-out-modal/item-in-out-modal.component';
import { AddProductComponent } from './../../transaction-modals/add-product/add-product.component';
import { DataPasserService } from './../../../generic/services/data-passer.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-inventory-file',
  templateUrl: './inventory-file.component.html',
  styleUrls: ['./inventory-file.component.scss']
})
export class InventoryFileComponent implements OnInit {
  @ViewChild('pricingTable') pricingTable; 
  @ViewChild('resultsTable') resultsTable; 
  @ViewChild('addProduct') addProduct: AddProductComponent;
  @ViewChild('itemInOutModal') itemInOutModal: ItemInOutModalComponent;
  formGroup: FormGroup;
  browseForm: FormGroup;
  constructor(private dataPasserService: DataPasserService, private fb: FormBuilder) { }
  resultsHeaders = ['Row No.', 'Item Code','Category','Description','Gross Price','Less 15%','Less 35%','Total','W1','W2','Qty Pack Big', 'Qty Pack Small','Image','Location','Remarks 1', 'Remarks 2'
  ];
  resultsResults = []
  resultsKeys = [ 
   {name: 'requestNo', behavior: 'clickable'} 
  ]

  pricingHeaders = [''];
  pricingResults = [];
  pricingKeys = []
  ngOnInit() {
       this.dataPasserService.sendPageTitle("INVENTORY FILE");
       this.formGroup = this.fb.group({
         product: [''],
         category: [''],
         total: [{value:"",  disabled: true}]
       });

       this.browseForm = this.fb.group({
         importedItem: [{value:'', disabled: true}],
         itemCode: [{value:'', disabled: true}],
         category: [{value:'', disabled: true}],
         description: [{value:'', disabled: true}],
         grossPrice: [{value:'', disabled: true}],
         less35:[{value:'', disabled: true}],
         less15: [{value:'', disabled: true}],
         warehouseOne: [{value:'', disabled: true}],
         warehouseTwo:[{value:'', disabled: true}],
         packQtyBig: [{value:'', disabled: true}],
         packQtySmall: [{value:'', disabled: true}],
         remarksOne:[{value:'', disabled: true}],
         remarksTwo: [{value:'', disabled: true}],
         total: [{value:'', disabled: true}],
         location: [{value:'', disabled: true}],
         unit: [{value:'', disabled: true}],
         minimumQuantity: [{value:'', disabled: true}],
       })
  }

  filter(){

  }

  addNewProduct(){
    this.addProduct.show();
  }
 
  print(){

 }

 itemTransactions(){
   this.itemInOutModal.show();
 }
}
