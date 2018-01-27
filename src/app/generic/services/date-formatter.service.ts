import { Injectable } from '@angular/core';

@Injectable()
export class DateFormatterService {

  constructor() { }

  formatInspectionDate(prefInsDate: string): string {
    if (prefInsDate !== null) {
      let inspectionDate = prefInsDate.split(" ")[0].split("-");
      if (inspectionDate[1] === undefined) {
        if (inspectionDate[0] === '01/01/1900') {
          return '';
        } else {
          return inspectionDate[0];
        }

      } else {
        let date = inspectionDate[1] + "/" + inspectionDate[2] + "/" + inspectionDate[0];
        if (date === '01/01/1900')
          return ''
        else
          return date;
      }
    } else {
      return '';
    }
  }

  formatCompletionDate(prefCompDate): string {
    console.log(prefCompDate);
    if (prefCompDate) {
      let completionDate = prefCompDate.split(" ")[0].split("-");
      if (completionDate[1] === undefined) {
        if (completionDate[0] === '01/01/1900') {
          return '';
        } else {
          return completionDate[0];
        }
      } else {
        let date = completionDate[1] + "/" + completionDate[2] + "/" + completionDate[0];
        if (date === '01/01/1900')
          return ''
        else
          return date;
      }
    } else {
      return '';
    }

  }

  formatBusinessDeadlineDate(businessDate: string): string {
    if (businessDate) {
      let date = businessDate.split(" ")[0];
      let time = businessDate.split(" ")[1];
      let finaldate = date.split("/")[0] + "/" + date.split("/")[1];
      let finaltime = time.split(":")[0] + ":" + time.split(":")[1];
      return finaldate + " " + finaltime;
    }
  }
  formatBusinessDeadlineDate2(businessDate: string): string {
    if (businessDate) {
      let date = businessDate.split(" ")[0];
      let time = businessDate.split(" ")[1];
      let finaldate = date.split("-")[1] + "/" + date.split("-")[2];
      let finaltime = time.split(":")[0] + ":" + time.split(":")[1];
      return finaldate + " " + finaltime;
    }
  }

  
}
