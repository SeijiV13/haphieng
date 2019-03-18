import { ViewCounterReceiptsModalComponent } from './view-counter-receipts-modal/view-counter-receipts-modal.component';
import { DataPasserService } from './../../../generic/services/data-passer.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from '../../../web-services/customer.service';
import { SalesService } from '../../../web-services/sales.service';
import { GenericTableComponent } from '../../../generic/generic-table/generic-table.component';
import { GeneratedReceiptsService } from '../../../web-services/generated-receipts.service';
const REFERENCE_NUMBER_LENGTH = 11;
@Component({
  selector: 'app-generate-counter-receipts',
  templateUrl: './generate-counter-receipts.component.html',
  styleUrls: ['./generate-counter-receipts.component.scss']
})
export class GenerateCounterReceiptsComponent implements OnInit {
  @ViewChild('viewReceiptsModal') viewReceiptsModal: ViewCounterReceiptsModalComponent;
  @ViewChild('resultsTable') resultsTable: GenericTableComponent;
  form: FormGroup;
  resultsHeaders = [
    "Ref No.",
    "Customer",
    "Terms"
  ]
  resultsResults = [
  ];
  resultsKeys = [
  {name: 'reference_number', behavior: 'clickable', objectname: 'attributes'},
  {name: 'customer_id', filter: 'customer', objectname: 'attributes', "returnvalue": "code"},
  {name: "terms", objectname: 'attributes'}
  ]
    buttons = [
  ]
  customers: Array<any>;
  constructor(private formBuilder: FormBuilder, 
            private dataPasser: DataPasserService,
            private customerService: CustomerService,
            private salesService: SalesService,
            private dataPasserService: DataPasserService,
            private generatedReceiptsService: GeneratedReceiptsService) { }

  ngOnInit() {
    this.dataPasser.sendPageTitle("GENERATE SALES COUNTER RECEIPTS")
    this.form = this.formBuilder.group({
        counterReceiptNo: [''],
        counterDate: [''],
        dateFrom: [''],
        dateTo: [''],
        customer: ['']
    });
    this.getDropdownValues();
  }

  getDropdownValues(){
    this.customerService.getCustomers().subscribe((data)=>{
      this.customers = data;
    })
  }
  filter(){
    let code = this.form.controls['customer'].value;
    this.resultsTable.showLoader();
    this.salesService.getFilteredSales('', code, 1, 'posted').subscribe((data)=>{
      if(data.collection){
        this.resultsResults = (data.collection).data
      }else if(data.data){
        this.resultsResults = data.data;
      }
      this.resultsTable.setPagination(data.pagination);
      this.resultsTable.hideLoader();
    }, error => {
     this.resultsTable.hideLoader();
     this.dataPasserService.sendError(error.errors[0])}
   )
 } 

 filterOnPagination(page){
  let code = this.form.controls['customer'].value;
  this.resultsTable.showLoader();
  this.salesService.getFilteredSales('', code, page, 'posted').subscribe((data)=>{
    if(data.collection){
      this.resultsResults = (data.collection).data
    }else if(data.data){
      this.resultsResults = data.data;
    }
    this.resultsTable.setPagination(data.pagination);
    this.resultsTable.hideLoader();
  }, error => {
    this.resultsTable.hideLoader();
    this.dataPasserService.sendError(error.errors[0])}
  )
} 

  viewCounterReceipts(result){
   this.viewReceiptsModal.show(result.id);
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
    this.form.controls['counterReceiptNo'].disable();
    this.generatedReceiptsService.getGeneratedSales().subscribe((data)=>{
      if(data.length != 0){
          let finalref = "";
          let latestrefno = this.latestRefNoChecker(data.data)
          let nextindex = latestrefno + 1;

          let zerolength =  REFERENCE_NUMBER_LENGTH - nextindex.toString().length;
          for(let i = 0; i < zerolength; i ++){
            finalref = finalref + "0";
          }

          finalref = event.target.value + finalref + nextindex.toString();
          this.form.controls['counterReceiptNo'].setValue(finalref);

      }else{
        if(event.target.value && event.target.value.length == 1){
          this.form.controls['counterReceiptNo'].setValue(event.target.value + "00000000001");
        }
  
      }
    })
  
  }

  resetRefNo(){
    this.form.controls['counterReceiptNo'].enable();
    this.form.controls['counterReceiptNo'].reset();
  }

  

}
