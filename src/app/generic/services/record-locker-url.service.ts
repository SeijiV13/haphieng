import { Injectable } from '@angular/core';

@Injectable()
export class RecordLockerUrlService {

  constructor() { }



  returnUrl(lockid: string, locktask: string, txncode: string) {
    let url = "";
    url += (lockid ? "?lockid=" + lockid : "");
    url += (locktask ? "&locktask=" + locktask : "");
    url += (txncode ? "&txncode=" + txncode : "")

    return url;
  }
}
