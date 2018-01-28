import { Component, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { DataPasserService } from './../../../generic/services/data-passer.service';
import { ModalDirective } from 'ngx-bootstrap';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  browseForm: FormGroup;
  @ViewChild('addProductModal') addProductModal: ModalDirective;
 constructor(private dataPasserService: DataPasserService, private fb: FormBuilder) { }

  ngOnInit() {
       this.browseForm = this.fb.group({
         importedItem: [''],
         itemCode: [''],
         category: [''],
         description: [''],
         grossPrice: [''],
         less35:[{value:'', disabled: true}],
         less15: [{value:'', disabled: true}],
         warehouseOne: [''],
         warehouseTwo:[''],
         packQtyBig: [''],
         packQtySmall: [''],
         remarksOne:[''],
         remarksTwo: [''],
         total: [''],
         location: [''],
         unit: [''],
         minimumQuantity: [''],
         productLine: [''],
      
       })
  }

  addProduct(){

  }

  show(){
    this.addProductModal.show();
  }

  hide(){
    this.addProductModal.hide();
  }

  computeLess(){
   let grossPrice =  parseInt(this.browseForm.controls['grossPrice'].value);
   this.browseForm.controls['less15'].setValue(grossPrice * .15);
   this.browseForm.controls['less35'].setValue(grossPrice * .35);
  }

}
