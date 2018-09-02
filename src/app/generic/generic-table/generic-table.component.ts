import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { TableFunctionsService} from '../services/table-functions.service';
import { MessageConfig } from '../../generic/message.config';
import { DataPasserService} from '../services/data-passer.service';
import { PaginationComponent } from '../pagination/pagination.component';
@Component({
  selector: 'generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})
export class GenericTableComponent implements OnInit {
  @Input() paginationActive = true;
  @Input() fieldContainer: string = '';
  @Input() title: string;
  @Input() headers: any;
  @Input() results: any = [];
  @Input() type: string = "single";
  @Input() keys: any;
  @Input() primaryKey: string;
  @Input() removeRow: boolean;
  @Input() pagination: any;
  @Output() selectedRow = new EventEmitter();
  @Output() emitRemoveRow = new EventEmitter();
  @Output() searchPagination = new EventEmitter();
  //JSON Contains BUTTON NAME, ID, , LOGO, TYPE, BEHAVIOR, 
  @Input() buttons: any;
  @Input() colspan: string;
  @Output() emitType = new EventEmitter();
  @Output() emitColumnClicked = new EventEmitter();
  @ViewChild('paginationSelector') paginationSelector: PaginationComponent;
  searchUrl: string = "";
  removeLoad: boolean = true;
  tableResultMessage: string = "";
  showLoaderIcon = false;
  constructor(private tableFunctions: TableFunctionsService,
              private messageConfig: MessageConfig,
              private dataPasserService: DataPasserService) { }

  ngOnInit() {
    if (this.results.length === 0) {
      this.tableResultMessage  = "No Result/s Found";
   }
  
  }

  showLoader(){
    this.showLoaderIcon = true;
  }

  hideLoader(){
    this.showLoaderIcon = false
  }
  setPagination(pagination){
    this.paginationSelector.setPagination(pagination);
  }
  
  doSearch(searchUrl) {
    this.dataPasserService.selectedData = null;
    this.dataPasserService.multipleSelectedData = [];
    this.searchUrl = searchUrl;
  }

 map2Tables(data) {
    this.results = data.value;
    if (this.results.length === 0) {
        this.tableResultMessage = "No Result/s Found";
    }
  }

  onButtonClick(type: string){
     this.emitType.emit(type);
  }

  processButtonId(){
    let buttonIds = Array<String>();
    if(this.buttons){
    for(let button of this.buttons){
     if(button.behavior === 'single'){
       buttonIds.push(button.id);
     }
    }
    }
    return buttonIds;
  }
  processButtonIdMultiple(){
    let buttonIds = Array<String>();
    if(this.buttons){
    for(let button of this.buttons){
     if(button.behavior === 'multiple'){
       buttonIds.push(button.id);
     }
    }
    }
    return buttonIds;
  }

  onClickColumn(result){
    this.emitColumnClicked.emit(result);
  }

  onRemoveRow(index){
    this.emitRemoveRow.emit(index);
  }

  emitSelectedRow(){
    this.selectedRow.emit();
  }

  retrieveNewValues(pageNo){
    this.searchPagination.emit(pageNo);
  }

  getObject(result, objectname, name){
    return result[objectname][name];
  }

  filter(item, filter, returnvalue){
    let customer = this.dataPasserService.dropdowns[filter].filter(value=> value.id == item);
    return customer[0][returnvalue];
  }
}
