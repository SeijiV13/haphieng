import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
  constructor(private fb: FormBuilder) { }

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
