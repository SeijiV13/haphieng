import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TableFunctionsService} from '../services/table-functions.service';
import { MessageConfig } from '../../generic/message.config';
import { DataPasserService} from '../services/data-passer.service';
@Component({
  selector: 'generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})
export class GenericTableComponent implements OnInit {
  @Input() headers: any;
  @Input() results: any = [];
  @Input() type: string = "single";
  @Input() keys: any;
  @Input() primaryKey: string;
  //JSON Contains BUTTON NAME, ID, , LOGO, TYPE, BEHAVIOR, 
  @Input() buttons: any;
  @Input() colspan: string;
  @Output() emitType = new EventEmitter();
  @Output() emitColumnClicked = new EventEmitter();
  searchUrl: string = "";
  removeLoad: boolean = true;
  tableResultMessage: string = "";
  constructor(private tableFunctions: TableFunctionsService,
              private messageConfig: MessageConfig,
              private dataPasserService: DataPasserService) { }

  ngOnInit() {
    if (this.results.length === 0) {
      this.tableResultMessage = this.messageConfig.getErrorMessage("noResults");
   }
  
  }
  
  doSearch(searchUrl) {
    this.dataPasserService.selectedData = null;
    this.dataPasserService.multipleSelectedData = [];
    this.searchUrl = searchUrl;
  }

 map2Tables(data) {
    this.results = data.value;
    if (this.results.length === 0) {
        this.tableResultMessage = this.messageConfig.getErrorMessage("noResults");
    }
  }

 showLoader(event) {
    this.removeLoad = !event.data;
  }

  onButtonClick(type: string){
     this.emitType.emit(type);
  }

  processButtonId(){
    let buttonIds = Array<String>();
    for(let button of this.buttons){
     if(button.behavior === 'single'){
       buttonIds.push(button.id);
     }
    }
    return buttonIds;
  }
  processButtonIdMultiple(){
    let buttonIds = Array<String>();
    for(let button of this.buttons){
     if(button.behavior === 'multiple'){
       buttonIds.push(button.id);
     }
    }
    return buttonIds;
  }

  onClickColumn(){
    this.emitColumnClicked.emit();
  }
}
