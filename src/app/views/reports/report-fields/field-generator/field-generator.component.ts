import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as $ from 'jquery';
import { CustomerService } from '../../../../web-services/customer.service';
import { SupplierService } from '../../../../web-services/supplier.service';
import { ProductsService } from '../../../../web-services/products.service';
import { AgentService } from '../../../../web-services/agent.service';
@Component({
  selector: 'app-field-generator',
  templateUrl: './field-generator.component.html',
  styleUrls: ['./field-generator.component.scss']
})
export class FieldGeneratorComponent implements OnInit {
  @Input('dateFrom') dateFrom: string;
  @Input('dateTo') dateTo: string;
  @Input('date') date: string;
  @Input('fields') fields: Array<any> = [];
  @Output('generateReport') generateReport = new EventEmitter();
  formGroup: FormGroup;
  constructor(private fb: FormBuilder, 
    private customerService: CustomerService, 
    private supplierService: SupplierService,
    private productService: ProductsService,
    private agentService: AgentService) {
      this.getDropdownValues();
     }
  customers: Array<any>;
  suppliers: Array<any>;
  items: Array<any>;
  categories: Array<any> = [];
  agents: Array<any>;
  ngOnInit() {
    this.formGroup = this.fb.group({
      customer: [''],
      category: [''],
      item: [''],
      agent: [''],
      dateFrom: [''],
      dateTo: [''],
      date: [''],
      supplier: ['']
    })
  }

  getDropdownValues(){
    this.customerService.getCustomers().subscribe((data)=>{
      this.customers = data;
    })
    this.productService.getProducts().subscribe((data)=>{
      this.items = data;
    })
    this.supplierService.getSuppliers().subscribe((data)=>{
      this.suppliers = data;
    });
    this.agentService.getAgents().subscribe((data)=>{
      this.agents = data;
    })

  }

  clear(){
    $("#"+ this.dateFrom).val('');
    $("#" + this.dateTo).val('');
    $("#" + this.date).val('');
    this.formGroup.reset();
  }

  generate(){
    this.generateReport.emit(this.formGroup.getRawValue());
  }

}
