import { Component, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { DataPasserService } from './../../../generic/services/data-passer.service';
import { ModalDirective } from 'ngx-bootstrap';
import { ProductsService } from '../../../web-services/products.service';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  browseForm: FormGroup;
  categories = [{ code: "wheel", description: "dgood year"}];
  productLines = [];
  @ViewChild('addProductModal') addProductModal: ModalDirective;
 constructor(private dataPasserService: DataPasserService, private fb: FormBuilder, private productService: ProductsService) { }

  ngOnInit() {
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
         product_line: [''],
      
       })
  }

  addProduct(){
     this.productService.createProduct(this.browseForm.getRawValue()).subscribe((data)=>{
        this.addProductModal.hide();
     }, error => this.dataPasserService.sendError(error.errors[0]));
  } 

  show(){
    this.addProductModal.show();
  }

  hide(){
    this.addProductModal.hide();
  }

  computeLess(){
   let grossPrice =  parseInt(this.browseForm.controls['gross_price'].value);
   this.browseForm.controls['less_15'].setValue((grossPrice * .15).toString());
   this.browseForm.controls['less_35'].setValue((grossPrice * .35).toString());
  }

}
