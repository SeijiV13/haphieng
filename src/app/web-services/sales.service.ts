import { Injectable } from '@angular/core';
import { HttpClient } from '../generic/httpClient.config';
import {Observable} from 'rxjs/Rx';
@Injectable()
export class SalesService {

  constructor (private httpClient: HttpClient){ }
   
  getSales(){
    return this.httpClient.getBase(`/api/v1/haphieng/sales`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }

  getFilteredSales(refNo, customer, page){
    return this.httpClient.getBase(`/api/v1/haphieng/sales?page=${page}&filters%5Breference_number=${refNo}&filters%5Bcustomer_code=${customer}`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
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

  getSalesHistory(customer, product){
    return this.httpClient.getBase(`/api/v1/haphieng/product_sales?filters%5Bcustomer_id=${customer}`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }

 //SALES RETURN
  getSalesReturn(){
    return this.httpClient.getBase(`/api/v1/haphieng/sales_returns`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }

  getFilteredSalesReturn(refNo, customer, page){
    return this.httpClient.getBase(`/api/v1/haphieng/sales_returns?page=${page}&filters%5Breference_number=${refNo}&filters%5Bcustomer_code=${customer}`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }
  
  getSuspendedSalesReturn(){
    return this.httpClient.getBase(`/api/v1/haphieng/sales_returns?filters%5Bstatus=suspend`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }

  getPostedSalesReturn(){
    return this.httpClient.getBase(`/api/v1/haphieng/sales_returns?filters%5Bstatus=posted`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }

  getSaleReturn(id){
    return this.httpClient.getBase(`/api/v1/haphieng/sales_returns/${id}`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }

  createSaleReturn(body){
    return this.httpClient.postBase(`/api/v1/haphieng/sales_returns`, body).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }


  editSaleReturn(id, body){
    return this.httpClient.putBase(`/api/v1/haphieng/sales_returns/${id}`, body).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }

  
}
