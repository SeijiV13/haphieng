import { Injectable } from '@angular/core';
import { HttpClient } from '../generic/httpClient.config';
import {Observable} from 'rxjs/Rx';
@Injectable()
export class SalesService {

  constructor (private httpClient: HttpClient){ }
   
  getSales(){
    return this.httpClient.getBase(`/api/v1/haphieng/sales`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }

  getFilteredSales(refNo, customer){
    return this.httpClient.getBase(`/api/v1/haphieng/sales?filters%5Breference_number=${refNo}&filters%5Bcustomer_id=${customer}`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }
  
  getSuspendedSales(){
    return this.httpClient.getBase(`/api/v1/haphieng/sales?filters%5Bstatus=suspend`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }

  getPostedSales(){
    return this.httpClient.getBase(`/api/v1/haphieng/sales?filters%5Bstatus=posted`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }

  getSale(id){
    return this.httpClient.getBase(`/api/v1/haphieng/sales/${id}`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }

  createSale(body){
    return this.httpClient.postBase(`/api/v1/haphieng/sales`, body).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }


  editSale(id, body){
    return this.httpClient.putBase(`/api/v1/haphieng/sales/${id}`, body).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }
}
