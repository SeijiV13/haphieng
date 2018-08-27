import { Injectable } from '@angular/core';
import { HttpClient } from '../generic/httpClient.config';
import {Observable} from 'rxjs/Rx';
@Injectable()
export class PurchaseService {

  constructor (private httpClient: HttpClient){ }
   
  getPurchases(){
    return this.httpClient.getBase(`/api/v1/haphieng/purchases`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }

  getFilteredPurchase(refNo, supplier, page, status): Observable<any>{
    return this.httpClient.getBase(`/api/v1/haphieng/purchases?page=${page}&filters%5Breference_number=${refNo}&filters%5Bsupplier_code=${supplier}&filters%5Bstatus=${status}`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }

  getFilteredPurchaseWithoutPage(refNo): Observable<any>{
    return this.httpClient.getBase(`/api/v1/haphieng/purchases?filters%5Breference_number=${refNo}`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }

  getSuspendedPurchases(){
    return this.httpClient.getBase(`/api/v1/haphieng/purchases?filters%5Bstatus=suspend`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }

  getPostedPurchases(){
    return this.httpClient.getBase(`/api/v1/haphieng/purchases?filters%5Bstatus=posted`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }

  getPurchase(id){
    return this.httpClient.getBase(`/api/v1/haphieng/purchases/${id}`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }

  createPurchase(body){
    return this.httpClient.postBase(`/api/v1/haphieng/purchases`, body).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }


  editPurchase(id, body){
    return this.httpClient.putBase(`/api/v1/haphieng/purchases/${id}`, body).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }

  //PURCHASE RETURNS
  getPurchasesReturn(){
    return this.httpClient.getBase(`/api/v1/haphieng/purchase_returns`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }

  getFilteredPurchasesReturn(refNo, supplier, page, status): Observable<any>{
    return this.httpClient.getBase(`/api/v1/haphieng/purchase_returns?page=${page}&filters%5Breference_number=${refNo}&filters%5Bsupplier_code=${supplier}&filters%5Bstatus=${status}`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }

  getFilteredPurchaseReturnsWithoutPage(refNo): Observable<any>{
    return this.httpClient.getBase(`/api/v1/haphieng/purchase_returns?filters%5Breference_number=${refNo}`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }

  getSuspendedPurchasesReturn(){
    return this.httpClient.getBase(`/api/v1/haphieng/purchase_returns?filters%5Bstatus=suspend`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }

  getPostedPurchaseReturn(){
    return this.httpClient.getBase(`/api/v1/haphieng/purchase_returns?filters%5Bstatus=posted`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }

  getPurchaseReturn(id){
    return this.httpClient.getBase(`/api/v1/haphieng/purchase_returns/${id}`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }

  createPurchaseReturn(body){
    return this.httpClient.postBase(`/api/v1/haphieng/purchase_returns`, body).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }


  editPurchaseReturn(id, body){
    return this.httpClient.putBase(`/api/v1/haphieng/purchase_returns/${id}`, body).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }
}