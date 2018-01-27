import { Injectable } from '@angular/core';

import * as $ from 'jquery';
@Injectable()
export class DeadlineColorService {

  constructor() { }

  defineColor(status: string, element: string) {
    if (status) {
      if (status.trim().toLowerCase() === 'btat') {
        $("#" + element).css("background-color", "#ef4a4a")
      }
      else if (status.trim().toLowerCase() === "ntat") {
        $("#" + element).css("background-color", "#eff230")
      }
    }
  }
}
