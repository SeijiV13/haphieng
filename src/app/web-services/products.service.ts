import { Injectable } from '@angular/core';
import { HttpClient } from '../generic/httpClient.config';
import {Observable} from 'rxjs/Rx';
@Injectable()
export class ProductsService {

  constructor(private httpClient: HttpClient) { }
 
  filterProducts(code, category): Observable<any>{
    return this.httpClient.getBase(`/api/v1/haphieng/products?filters%5Bcategory=${category}&filters%5Bcode=${code}`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }
  getProducts(): Observable<any>{
    return this.httpClient.getBase(`/api/v1/haphieng/products`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
 }

 getProduct(id){
   return this.httpClient.getBase(`/api/v1/haphieng/products/${id}`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
 }

 createProduct(agent){
    return this.httpClient.postBase(`/api/v1/haphieng/products`, agent).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
 }

 editProduct(agent, id){
   return this.httpClient.putBase(`/api/v1/haphieng/products/${id}`, agent).map(this.httpClient.handleMap).catch(this.httpClient.handleError)
 }

 deleteProduct(id){
   return this.httpClient.deleteBase(`/api/v1/haphieng/products/${id}`).map(this.httpClient.handleMap);
 }


}
