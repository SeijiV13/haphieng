import { Component, Input, OnChanges } from '@angular/core';

@Component({
    selector: 'error-header',
    templateUrl: './error-header.component.html'
})
export class ErrorHeaderComponent implements OnChanges{
    @Input('error') error: string;
    @Input('modal') modal: string;
    constructor() { }

    ngOnChanges(){
        if(this.modal == 'true'){
            
        }
    }
}
