import { ItemInOutModalComponent } from './../../transaction-modals/item-in-out-modal/item-in-out-modal.component';
import { AddProductComponent } from './../../transaction-modals/add-product/add-product.component';
import { DataPasserService } from './../../../generic/services/data-passer.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { ProductsService } from '../../../web-services/products.service';
import { GenericTableComponent } from '../../../generic/generic-table/generic-table.component';

@Component({
  selector: 'app-inventory-file',
  templateUrl: './inventory-file.component.html',
  styleUrls: ['./inventory-file.component.scss']
})
export class InventoryFileComponent implements OnInit {
  @ViewChild('pricingTable') pricingTable; 
  @ViewChild('resultsTable') resultsTable: GenericTableComponent; 
  @ViewChild('addProduct') addProduct: AddProductComponent;
  @ViewChild('itemInOutModal') itemInOutModal: ItemInOutModalComponent;
  formGroup: FormGroup;
  browseForm: FormGroup;
  constructor(private dataPasserService: DataPasserService, private fb: FormBuilder, private productService: ProductsService) { }
  resultsHeaders = ['Row No.', 'Item Code','Category','Description','Gross Price','Less 15%','Less 35%','Total','W1','W2','Qty Pack Big', 'Qty Pack Small','Location','Remarks 1', 'Remarks 2'
  ];
  resultsResults = []
  resultsKeys = [
   {name: 'rowNo'}, 
   {name: 'code', behavior: 'clickable'},
   {name: 'category'},
   {name: 'description'},
   {name: 'gross_price'},
   {name: 'less_15'},
   {name: 'less_35'},
   {name: 'available_quantity'},
   {name: 'warehouse_1_stock'},
   {name: 'warehouse_2_stock'},
   {name: 'pack_qty_big'},
   {name: 'pack_qty_small'},
   {name: 'location'},
   {name: 'remarks_1'},
   {name: 'remarks_2'}
  ]

  categories = [{ code: "wheel", description: "dgood year"}]
 
  pricingHeaders = [''];
  pricingResults = [];
  pricingKeys = [];
  pagination: any;
  ngOnInit() {
       this.dataPasserService.sendPageTitle("INVENTORY FILE");
       this.formGroup = this.fb.group({
         product: [''],
         category: [''],
         total: [{value:"",  disabled: true}]
       });

       this.browseForm = this.fb.group({
         imported: [''],
         code: [''],
         category: [''],
         description: [''],
         gross_price: [''],
         less_35:[{value:'', disabled: true}],
         less_15: [{value:'', disabled: true}],
         warehouse_1_stock: [''],
         warehouse_2_stock:[''],
         pack_qty_big: [''],
         pack_qty_small: [''],
         remarks_1:[''],
         remarks_2: [''],
         total: [''],
         location: [''],
         unit: [''],
         minimum_quantity: [''],
       })
  }

  filter(){
    let total = 0;
    let code = this.formGroup.controls['product'].value;
    let category = this.formGroup.controls['category'].value;
    this.productService.filterProducts(code, category, 1).subscribe((data)=>{
      this.resultsResults = data.collection;
      this.resultsTable.setPagination(data.pagination);
      for(let result of this.resultsResults){
          total = total + parseInt(result.gross_price);
      }
      this.formGroup.controls['total'].setValue(total.toString());
    }, error=>  this.dataPasserService.sendError(error.errors[0]));

  }

  filterOnPagination(page){
    let total = 0;
    let code = this.formGroup.controls['product'].value;
    let category = this.formGroup.controls['category'].value;
    this.productService.filterProducts(code, category, page).subscribe((data)=>{
      this.resultsResults = data.collection;
      this.resultsTable.setPagination(data.pagination);
      for(let result of this.resultsResults){
          total = total + parseInt(result.gross_price);
      }
      this.formGroup.controls['total'].setValue(total.toString());
    }, error=>  this.dataPasserService.sendError(error.errors[0]));
  }

  editDetails(){
    this.productService.editProduct(this.browseForm.getRawValue(), this.dataPasserService.selectedData['product'].id).subscribe((data)=>{

    }, error => this.dataPasserService.sendError(error.errors[0]));
  }

  getSelectedProduct(){
    this.browseForm.patchValue(this.dataPasserService.selectedData['product']);
  }

  addNewProduct(){
    this.addProduct.show();
  }
 
  print(){

 }

 itemTransactions(){
   this.itemInOutModal.show();
 }

 computeLess(){
  let grossPrice =  parseInt(this.browseForm.controls['gross_price'].value);
  this.browseForm.controls['less_15'].setValue((grossPrice * .15).toString());
  this.browseForm.controls['less_35'].setValue((grossPrice * .35).toString());
 }

}
