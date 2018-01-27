import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'characters-remaining',
  template: `
  <h6 style="font-size:10px; text-align:right">Characters left: {{lengthLimit - inputField.value.length}}</h6>`,

})
export class CharactersRemainingComponent implements OnInit {
  //fetch input field
  @Input() inputField: HTMLInputElement;
  @Input() lengthLimit: number;

  constructor() { }

  ngOnInit() {
  }

}
