import { Injectable } from '@angular/core';
import { HttpClient } from '../generic/httpClient.config';
import {Observable} from 'rxjs/Rx';
@Injectable()
export class DamageService {

  constructor (private httpClient: HttpClient){ }
  getDamageItems(){
    return this.httpClient.getBase(`/api/v1/haphieng/inventory_damages`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }

  getFilteredDamageItems(refNo, customer, page, status){
    return this.httpClient.getBase(`/api/v1/haphieng/inventory_damages?page=${page}&filters%5Breference_number=${refNo}&filters%5Bcustomer_id=${customer}&filters%5Bstatus=${status}`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }

  getFilteredItemsWoutPage(refNo){
    return this.httpClient.getBase(`/api/v1/haphieng/inventory_damages?filters%5Breference_number=${refNo}`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }
  
  getSuspendedDamageItems(){
    return this.httpClient.getBase(`/api/v1/haphieng/inventory_damages?filters%5Bstatus=suspend`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }

  getPostedDamageItems(){
    return this.httpClient.getBase(`/api/v1/haphieng/inventory_damages?filters%5Bstatus=posted`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }

  getDamageItem(id){
    return this.httpClient.getBase(`/api/v1/haphieng/inventory_damages/${id}`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }

  createDamageItem(body){
    return this.httpClient.postBase(`/api/v1/haphieng/inventory_damages`, body).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }


  editDamageItem(id, body){
    return this.httpClient.putBase(`/api/v1/haphieng/inventory_damages/${id}`, body).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }
}
